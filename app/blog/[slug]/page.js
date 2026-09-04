"use client";
import MediaImage from "@/components/MediaImage";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Eye, Loader2, UserRound } from "lucide-react";
import api, { IMAGE_BASE_URL } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const imageUrl = (path) => path ? (path.startsWith("http") ? path : `${IMAGE_BASE_URL}${path}`) : "";

export default function ArticlePage({ params }) {
  const { slug } = use(params); const [post, setPost] = useState(null); const [related, setRelated] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { api.get(`/blogs/${slug}`).then(async ({ data }) => { const article = data.data; setPost(article); const response = await api.get("/blogs", { params: { category: article.category, limit: 4 } }); setRelated((response.data.data || []).filter((item) => item.slug !== article.slug).slice(0, 3)); }).catch((e) => setError(e.response?.data?.message || "আর্টিকেল পাওয়া যায়নি।")).finally(() => setLoading(false)); }, [slug]);
  if (loading) return <main className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-sky-600" /></main>;
  if (error || !post) return <main className="min-h-[60vh] px-4 py-20 text-center"><h1 className="text-2xl font-bold">{error}</h1><Button asChild className="mt-5"><Link href="/blog">সব আর্টিকেল</Link></Button></main>;
  return <main className="min-h-screen bg-white"><article className="mx-auto max-w-3xl px-4 py-12"><Button asChild variant="ghost" className="mb-6"><Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" />ব্লগে ফিরুন</Link></Button><Badge>{post.category}</Badge><h1 className="mt-4 text-3xl font-bold leading-tight text-sky-950 md:text-5xl">{post.title}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{post.summary}</p><div className="mt-6 flex flex-wrap gap-5 border-y py-4 text-sm text-slate-500"><span className="flex gap-2"><UserRound className="h-4 w-4" />{post.authorName}</span><span className="flex gap-2"><CalendarDays className="h-4 w-4" />{new Date(post.publishedAt || post.createdAt).toLocaleDateString("bn-BD")}</span><span className="flex gap-2"><Eye className="h-4 w-4" />{post.views || 0} বার পড়া হয়েছে</span></div><MediaImage src={post.thumbnail} alt={post.title} className="mt-8 max-h-[440px] w-full rounded-2xl object-cover" /><div className="mt-8 whitespace-pre-wrap text-base leading-8 text-slate-800">{post.content}</div>{post.tags?.length > 0 && <div className="mt-10 flex flex-wrap gap-2">{post.tags.map((tag) => <Badge key={tag} variant="outline">#{tag}</Badge>)}</div>}</article>{related.length > 0 && <section className="border-t bg-sky-50 px-4 py-12"><div className="mx-auto max-w-5xl"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-sky-950">সম্পর্কিত আর্টিকেল</h2><Button asChild variant="outline"><Link href={`/blog?category=${encodeURIComponent(post.category)}`}>সব দেখুন</Link></Button></div><div className="mt-6 grid gap-5 md:grid-cols-3">{related.map((item) => <Card key={item._id}><CardContent className="p-5"><Badge variant="secondary">{item.category}</Badge><Link href={`/blog/${item.slug}`} className="mt-3 block text-lg font-bold text-sky-950 hover:text-sky-700">{item.title}</Link><p className="mt-2 line-clamp-3 text-sm text-slate-600">{item.summary}</p><Button asChild variant="link" className="mt-2 px-0"><Link href={`/blog/${item.slug}`}>পড়ুন</Link></Button></CardContent></Card>)}</div></div></section>}</main>;
}
