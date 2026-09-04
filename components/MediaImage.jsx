"use client";
import { useState } from "react";
import { IMAGE_BASE_URL } from "@/lib/api";

export default function MediaImage({ src, alt, fallback = "/images/default-blog.svg", className = "" }) {
  const [failed, setFailed] = useState(null);
  const url = typeof src === "string" && src ? (/^https?:\/\//i.test(src) ? src : `${IMAGE_BASE_URL || ""}${src.startsWith("/") ? "" : "/"}${src}`) : "";
  return <img src={!url || failed === url ? fallback : url} alt={alt || ""} loading="lazy" className={className} onError={() => { if (url && failed !== url) setFailed(url); }} />;
}
