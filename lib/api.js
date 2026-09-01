import axios from "axios";

// Browser traffic stays on the current origin and is proxied by Nginx. This
// avoids intermittent cross-origin/DNS failures between the client and API.
const API_BASE_URL = typeof window !== "undefined"
  ? "/api"
  : (process.env.NEXT_PUBLIC_BACKEND_URL || `${process.env.NEXT_PUBLIC_API_URL}/api`);

export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send httpOnly cookies
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

// --- Token & Queue ---
let accessToken = null;
let isRefreshing = false;
let failedQueue = [];
const PUBLIC_AUTH_ENDPOINTS = ["/auth/login", "/auth/register", "/auth/logout", "/auth/refresh-token"];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// --- Request interceptor (attach access token) ---
api.interceptors.request.use(
  (config) => {
    if (typeof FormData !== "undefined" && config.data instanceof FormData) delete config.headers["Content-Type"];
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response interceptor (refresh token logic) ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const transientStatus = [502, 503, 504].includes(error.response?.status);
    if (originalRequest?.method?.toLowerCase() === "get" && !originalRequest._networkRetry && (!error.response || transientStatus)) {
      originalRequest._networkRetry = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
      return api(originalRequest);
    }

    // Skip refresh endpoint
    if (!originalRequest || PUBLIC_AUTH_ENDPOINTS.some((endpoint) => originalRequest.url?.endsWith(endpoint))) {
      return Promise.reject(error);
    }

    // Preserve a consistent response-shaped message for existing page handlers.
    if (!error.response) {
      return Promise.reject({
        response: { data: { message: "Network error. Try again." } },
      });
    }

    // Handle 401 and attempt refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        if (!data || !data.accessToken) {
          throw new Error("No access token received");
        }

        accessToken = data.accessToken;

        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        accessToken = null;

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// --- Token Helpers ---
export const setAccessToken = (token) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export default api;
