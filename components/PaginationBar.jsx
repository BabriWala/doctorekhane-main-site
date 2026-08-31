"use client";

import { Button } from "@/components/ui/button";

export default function PaginationBar({ pagination = {}, page = 1, onPageChange }) {
  const totalPages = Math.max(Number(pagination.totalPages) || 1, 1);
  if (totalPages <= 1) return null;
  const current = Math.min(Math.max(Number(page) || 1, 1), totalPages);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((value) => value === 1 || value === totalPages || Math.abs(value - current) <= 1);
  return <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
    <Button type="button" variant="outline" size="sm" disabled={current <= 1} onClick={() => onPageChange(current - 1)}>Previous</Button>
    {pages.map((value, index) => <span key={value} className="contents">{index > 0 && value - pages[index - 1] > 1 && <span className="px-1">…</span>}<Button type="button" variant={value === current ? "default" : "outline"} size="sm" onClick={() => onPageChange(value)} aria-current={value === current ? "page" : undefined}>{value}</Button></span>)}
    <Button type="button" variant="outline" size="sm" disabled={current >= totalPages} onClick={() => onPageChange(current + 1)}>Next</Button>
  </nav>;
}
