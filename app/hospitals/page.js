"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, Clock, MapPin, Phone, Search, Star, Users } from "lucide-react";
import api, { IMAGE_BASE_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const emptyFilters = { cities: [], departments: [], insurance: [], types: [] };

export default function HospitalsPage() {
  const [items, setItems] = useState([]);
  const [filterOptions, setFilterOptions] = useState(emptyFilters);
  const [filters, setFilters] = useState({ search: "", city: "", department: "", insurance: "", type: "", sort: "rating" });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const search = new URLSearchParams(window.location.search).get("search") || "";
    if (search) setFilters((current) => ({ ...current, search }));
  }, []);
  useEffect(() => {
    api.get("/hospital/filters/options").then(({ data }) => setFilterOptions(data.data)).catch(() => setFilterOptions(emptyFilters));
  }, []);

  useEffect(() => {
    setLoading(true); setError("");
    api.get("/hospital", { params: { page, limit: 9, ...Object.fromEntries(Object.entries(filters).filter(([, value]) => value)) } })
      .then(({ data, headers }) => {
        setItems(Array.isArray(data) ? data : []);
        const totalItems = Number(headers["x-total-count"] || 0);
        setPagination({ totalItems, totalPages: Math.max(1, Math.ceil(totalItems / 9)) });
      })
      .catch(() => { setItems([]); setError("হাসপাতালের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।"); })
      .finally(() => setLoading(false));
  }, [page, filters]);

  const updateFilter = (name, value) => { setFilters((current) => ({ ...current, [name]: value === "all" ? "" : value })); setPage(1); };

  return <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
    <section className="border-b bg-white"><div className="mx-auto max-w-7xl px-4 py-8"><h1 className="text-3xl font-bold text-sky-900">হাসপাতাল খুঁজুন</h1><p className="mt-2 text-sky-700">যাচাইকৃত হাসপাতালের সেবা, বিভাগ ও যোগাযোগের তথ্য দেখুন</p></div></section>
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <Card><CardContent className="grid gap-3 p-4 md:grid-cols-2 lg:grid-cols-6">
        <div className="relative lg:col-span-2"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="নাম, সেবা বা ঠিকানা" value={filters.search} onChange={(event) => updateFilter("search", event.target.value)} /></div>
        {[["city", "সব শহর", filterOptions.cities], ["department", "সব বিভাগ", filterOptions.departments], ["insurance", "সব বীমা", filterOptions.insurance], ["type", "সব ধরন", filterOptions.types]].map(([name, placeholder, options]) => <Select key={name} value={filters[name] || "all"} onValueChange={(value) => updateFilter(name, value)}><SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent><SelectItem value="all">{placeholder}</SelectItem>{options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select>)}
      </CardContent></Card>
      <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sky-800"><b>{pagination.totalItems}</b>টি হাসপাতাল পাওয়া গেছে</p><Select value={filters.sort} onValueChange={(value) => updateFilter("sort", value)}><SelectTrigger className="w-44"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="rating">রেটিং অনুযায়ী</SelectItem><SelectItem value="name">নাম অনুযায়ী</SelectItem><SelectItem value="newest">সাম্প্রতিক</SelectItem></SelectContent></Select></div>
      {error && <p className="rounded-md bg-red-50 p-4 text-red-700">{error}</p>}
      {loading ? <p className="py-16 text-center text-sky-700">হাসপাতাল লোড হচ্ছে...</p> : items.length === 0 ? <div className="py-16 text-center"><Building2 className="mx-auto h-14 w-14 text-sky-300" /><p className="mt-3 text-sky-700">কোনো হাসপাতাল পাওয়া যায়নি</p></div> : <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{items.map((hospital) => {
        const info = hospital.basicInfo || {}; const address = hospital.address || {}; const contact = hospital.contact || {};
        return <Card key={hospital._id} className="overflow-hidden transition-shadow hover:shadow-lg"><CardContent className="space-y-4 p-6"><div className="flex gap-4"><Avatar className="h-16 w-16"><AvatarImage src={info.logo ? `${IMAGE_BASE_URL}${info.logo}` : ""} alt={info.name} /><AvatarFallback><Building2 /></AvatarFallback></Avatar><div className="min-w-0 flex-1"><h2 className="text-lg font-bold text-sky-900">{info.name}</h2><div className="mt-1 flex flex-wrap gap-2"><Badge variant="outline">{info.type}</Badge>{info.is24Hours && <Badge className="bg-green-100 text-green-800">২৪ ঘণ্টা</Badge>}</div><p className="mt-2 flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{info.ratingAverage || 0} ({info.reviewCount || 0})</p></div></div><div className="space-y-2 text-sm text-sky-800"><p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" />{[address.street, address.city, address.state, address.postalCode].filter(Boolean).join(", ") || "ঠিকানা যোগ করা হয়নি"}</p>{contact.phone && <p className="flex gap-2"><Phone className="h-4 w-4" />{contact.phone}</p>}<p className="flex gap-2"><Users className="h-4 w-4" />{info.bedCount || 0} শয্যা</p>{info.establishedYear && <p className="flex gap-2"><Clock className="h-4 w-4" />প্রতিষ্ঠিত {info.establishedYear}</p>}</div>{info.services?.length > 0 && <div className="flex flex-wrap gap-2">{info.services.slice(0, 5).map((service) => <Badge key={service} variant="secondary">{service}</Badge>)}</div>}<div className="flex gap-2"><Button asChild className="flex-1"><Link href={`/hospital/${hospital._id}`}>বিস্তারিত দেখুন</Link></Button>{contact.phone && <Button variant="outline" onClick={() => window.location.href = `tel:${contact.phone}`}>কল করুন</Button>}</div></CardContent></Card>;
      })}</div>}
      {pagination.totalPages > 1 && <div className="flex items-center justify-center gap-3 pt-4"><Button variant="outline" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>আগের পৃষ্ঠা</Button><span className="text-sm">পৃষ্ঠা {page} / {pagination.totalPages}</span><Button variant="outline" disabled={page >= pagination.totalPages} onClick={() => setPage((value) => value + 1)}>পরের পৃষ্ঠা</Button></div>}
    </section>
  </main>;
}
