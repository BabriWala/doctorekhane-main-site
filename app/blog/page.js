"use client";
import MediaImage from "@/components/MediaImage";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Eye, Loader2, Search } from "lucide-react";
import api, { IMAGE_BASE_URL } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PaginationBar from "@/components/PaginationBar";

const imageUrl = (path) => path ? (path.startsWith("http") ? path : `${IMAGE_BASE_URL}${path}`) : "";

export default function BlogPage() {
  const [items, setItems] = useState([]); const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(""); const [category, setCategory] = useState(""); const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 }); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { const value = new URLSearchParams(window.location.search).get("category") || ""; if (value) setCategory(value); }, []);
  useEffect(() => { const timer = setTimeout(() => { setLoading(true); api.get("/blogs", { params: { page, limit: 9, search: search || undefined, category: category || undefined } }).then(({ data }) => { setError(""); setItems(data.data || []); setCategories(data.categories || []); setPagination(data.pagination || {}); }).catch(() => setError("আর্টিকেল লোড করা যায়নি।")).finally(() => setLoading(false)); }, 250); return () => clearTimeout(timer); }, [page, search, category]);
  return <main className="min-h-screen bg-sky-50/50 px-4 py-12"><div className="mx-auto max-w-6xl"><div className="text-center"><BookOpen className="mx-auto h-10 w-10 text-sky-600" /><h1 className="mt-3 text-4xl font-bold text-sky-950">স্বাস্থ্য ব্লগ</h1><p className="mt-2 text-slate-600">চিকিৎসা, প্রতিরোধ, পুষ্টি ও সুস্থ জীবনযাপনের হালনাগাদ লেখা</p></div><div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><Input className="pl-9" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="বিষয়, লেখক বা ট্যাগ খুঁজুন" /></div><select className="h-10 rounded-md border bg-white px-3" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}><option value="">সব বিভাগ</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
    <p className="mt-8 text-sm text-slate-600">{pagination.totalItems || 0}টি প্রকাশিত আর্টিকেল</p>{loading ? <div className="flex min-h-64 items-center justify-center"><Loader2 className="h-9 w-9 animate-spin text-sky-600" /></div> : error ? <p className="mt-5 rounded-lg bg-red-50 p-4 text-red-700">{error}</p> : !items.length ? <Card className="mt-5"><CardContent className="py-16 text-center text-slate-500">কোনো প্রকাশিত আর্টিকেল পাওয়া যায়নি।</CardContent></Card> : <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{items.map((post) => <Card key={post._id} className="overflow-hidden"><MediaImage src={post.thumbnail} alt={post.title} className="h-44 w-full bg-sky-100 object-cover" /><CardContent className="p-5"><div className="flex items-center justify-between"><Badge variant="secondary">{post.category}</Badge>{post.featured && <Badge>ফিচার্ড</Badge>}</div><Link href={`/blog/${post.slug}`} className="mt-4 block text-xl font-bold text-sky-950 hover:text-sky-700">{post.title}</Link><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{post.summary}</p><div className="mt-4 flex items-center justify-between text-xs text-slate-500"><span>{post.authorName}</span><span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views || 0}</span></div><Button asChild variant="outline" className="mt-4 w-full"><Link href={`/blog/${post.slug}`}>বিস্তারিত পড়ুন</Link></Button></CardContent></Card>)}</div>}<div className="mt-8"><PaginationBar pagination={pagination} page={page} onPageChange={setPage} /></div></div></main>;
}
