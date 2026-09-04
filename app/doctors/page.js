"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, Filter, Loader2, MapPin, Search, Star, Video } from "lucide-react";
import api, { IMAGE_BASE_URL } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PaginationBar from "@/components/PaginationBar";
import DoctorActions from "@/components/DoctorActions";

const ALL = "all";
const nameOf = (d) => [d?.personalDetails?.firstName, d?.personalDetails?.middleName, d?.personalDetails?.lastName].filter(Boolean).join(" ");
const imageUrl = (path) => path ? (path.startsWith("http") ? path : `${IMAGE_BASE_URL}${path}`) : "";

export default function DoctorDirectoryPage() {
  const initial = { search: "", specialization: ALL, city: ALL, district: ALL, gender: ALL, minExperience: "", telemedicine: false, sort: "rating" };
  const [filters, setFilters] = useState(initial);
  const [options, setOptions] = useState({ departments: [], specializations: [], cities: [] });
  const [doctors, setDoctors] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const search = query.get("search") || "";
    const specialization = query.get("specialization") || ALL;
    if (search || specialization !== ALL) setFilters((current) => ({ ...current, search, specialization }));
  }, []);
  useEffect(() => { api.get("/doctor/filter-options").then(({ data }) => setOptions(data.data || {})).catch(() => {}); }, []);
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true); setError("");
        const params = { page, limit: 12, sort: filters.sort };
        for (const key of ["search", "minExperience"]) if (filters[key]) params[key] = filters[key];
        for (const key of ["specialization", "city", "district", "gender"]) if (filters[key] !== ALL) params[key] = filters[key];
        if (filters.telemedicine) params.telemedicine = true;
        const { data } = await api.get("/doctor", { params });
        setDoctors(data.data || []);
        setPagination({ currentPage: data.currentPage || 1, totalPages: data.totalPages || 1, totalItems: data.totalItems || 0 });
      } catch (e) { setDoctors([]); setError(e.response?.data?.message || "ডাক্তার তালিকা লোড করা যায়নি।"); }
      finally { setLoading(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, page]);

  const update = (key, value) => { setFilters((old) => ({ ...old, [key]: value })); setPage(1); };
  const specialties = [...new Set([...(options.specializations || []), ...(options.departments || [])])];
  const filterPanel = <div className="space-y-4">
    <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><Input className="pl-9" placeholder="ডাক্তারের নাম বা বিভাগ" value={filters.search} onChange={(e) => update("search", e.target.value)} /></div>
    <select className="h-10 w-full rounded-md border bg-white px-3" value={filters.specialization} onChange={(e) => update("specialization", e.target.value)}><option value={ALL}>সব বিশেষত্ব</option>{specialties.map((x) => <option key={x}>{x}</option>)}</select>
    <select className="h-10 w-full rounded-md border bg-white px-3" value={filters.city} onChange={(e) => update("city", e.target.value)}><option value={ALL}>সব শহর</option>{(options.cities || []).map((x) => <option key={x}>{x}</option>)}</select>
    <select className="h-10 w-full rounded-md border bg-white px-3" value={filters.gender} onChange={(e) => update("gender", e.target.value)}><option value={ALL}>সব লিঙ্গ</option><option value="Male">পুরুষ</option><option value="Female">মহিলা</option><option value="Other">অন্যান্য</option></select>
    <select aria-label="জেলা" className="h-10 w-full rounded-md border bg-white px-3" value={filters.district} onChange={e => update("district", e.target.value)}><option value={ALL}>সব জেলা</option>{(options.districts || []).map(district => <option key={district}>{district}</option>)}</select>
    <Input type="number" min="0" placeholder="ন্যূনতম অভিজ্ঞতা (বছর)" value={filters.minExperience} onChange={(e) => update("minExperience", e.target.value)} />
    <label className="flex items-center gap-2 rounded-md border p-3 text-sm"><input type="checkbox" checked={filters.telemedicine} onChange={(e) => update("telemedicine", e.target.checked)} /> ভিডিও পরামর্শ আছে</label>
    <select className="h-10 w-full rounded-md border bg-white px-3" value={filters.sort} onChange={(e) => update("sort", e.target.value)}><option value="rating">সেরা রেটিং</option><option value="experience">অভিজ্ঞতা</option><option value="feeLow">কম ফি</option><option value="feeHigh">বেশি ফি</option><option value="newest">নতুন</option></select>
    <Button variant="outline" className="w-full" onClick={() => { setFilters(initial); setPage(1); }}>ফিল্টার মুছুন</Button>
  </div>;

  return <main className="min-h-screen bg-sky-50/60 px-4 py-10 font-hind-siliguri"><div className="mx-auto max-w-6xl">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-bold text-sky-950 md:text-4xl">আপনার ডাক্তার খুঁজুন</h1><p className="mt-2 text-slate-600">প্রোফাইল, চেম্বার সময়, ফি ও রোগীর রিভিউ দেখুন।</p></div><Button variant="outline" className="lg:hidden" onClick={() => setMobileFilters(!mobileFilters)}><Filter className="mr-2 h-4 w-4" />ফিল্টার</Button></div>
    {mobileFilters && <Card className="mb-5 lg:hidden"><CardContent className="pt-6">{filterPanel}</CardContent></Card>}
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]"><aside className="hidden lg:block"><Card className="sticky top-20"><CardContent className="pt-6">{filterPanel}</CardContent></Card></aside><section>
      <p className="mb-4 text-sm text-slate-600">{pagination.totalItems} জন ডাক্তার পাওয়া গেছে</p>
      {loading ? <div className="flex min-h-72 items-center justify-center"><Loader2 className="h-9 w-9 animate-spin text-sky-600" /></div> : error ? <Card><CardContent className="py-12 text-center text-red-600">{error}</CardContent></Card> : !doctors.length ? <Card><CardContent className="py-12 text-center">এই ফিল্টারে কোনো সক্রিয় ডাক্তার পাওয়া যায়নি।</CardContent></Card> : <div className="grid gap-4 md:grid-cols-2">{doctors.map((doctor) => {
        const hrefId = doctor.slug || doctor.id || doctor._id; const fields = doctor.specialization?.map((x) => x.field).filter(Boolean) || [];
        return <Card key={doctor.id || doctor._id} className="transition hover:shadow-lg"><CardContent className="p-5"><DoctorActions doctor={doctor}/><div className="mt-3 flex gap-4"><Avatar className="h-20 w-20"><AvatarImage src={imageUrl(doctor.personalDetails?.profilePicture)} className="object-cover" /><AvatarFallback>{nameOf(doctor).slice(0, 2)}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><Link href={`/doctor/${hrefId}`} className="text-lg font-bold text-sky-950 hover:text-sky-700">{nameOf(doctor)}</Link><p className="text-sm text-sky-700">{doctor.professional?.position || doctor.professional?.field || "চিকিৎসক"}</p><div className="mt-2 flex flex-wrap gap-1">{fields.slice(0, 2).map((x) => <Badge key={x} variant="secondary">{x}</Badge>)}</div></div></div><div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600"><span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{doctor.ratingAverage || 0} ({doctor.reviewCount || 0})</span><span className="flex items-center gap-1"><Award className="h-4 w-4" />{doctor.personalDetails?.totalExperience || 0}+ বছর</span><span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{doctor.chambers?.[0]?.address?.city || "অনলাইন"}</span><span className="flex items-center gap-1"><Video className="h-4 w-4" />৳{doctor.professional?.consultationFee ?? "—"}</span></div><div className="mt-4 flex gap-2"><Button asChild variant="outline" className="flex-1"><Link href={`/doctor/${hrefId}`}>প্রোফাইল</Link></Button><Button asChild className="flex-1"><Link href={`/appointment?doctorId=${doctor.id || doctor._id}`}>অ্যাপয়েন্টমেন্ট</Link></Button></div></CardContent></Card>;
      })}</div>}
      <div className="mt-8"><PaginationBar pagination={pagination} page={page} onPageChange={setPage} /></div>
    </section></div>
  </div></main>;
}
