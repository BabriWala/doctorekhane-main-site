import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send httpOnly cookies
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// --- Token & Queue ---
let accessToken = null;
let isRefreshing = false;
let failedQueue = [];

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

    // Skip refresh endpoint
    if (originalRequest.url === "/auth/refresh-token") {
      return Promise.reject(error);
    }

    // Network error
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
        console.log("I am here in refresh");

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
        console.log("I am here in refresh error");

        processQueue(refreshError, null);
        accessToken = null;

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

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
