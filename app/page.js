"use client";
import MediaImage from "@/components/MediaImage";

import { useEffect, useState } from "react";
import DoctorActions from "@/components/DoctorActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Ambulance, Award, Building2, CalendarDays, Droplets, Loader2, MapPin, Search, ShieldCheck, Star, Stethoscope, Video } from "lucide-react";
import api, { IMAGE_BASE_URL } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const nameOf = (doctor) => [doctor?.personalDetails?.firstName, doctor?.personalDetails?.middleName, doctor?.personalDetails?.lastName].filter(Boolean).join(" ");
const mediaUrl = (path) => path ? (path.startsWith("http") ? path : `${IMAGE_BASE_URL}${path}`) : "";

export default function HomePage() {
  const router = useRouter();
  const [searchType, setSearchType] = useState("doctor");
  const [search, setSearch] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/doctor", { params: { page: 1, limit: 100, sort: "top" } }),
      api.get("/hospital", { params: { page: 1, limit: 100, sort: "rating" } }),
      api.get("/blogs", { params: { page: 1, limit: 3 } }),
      api.get("/doctor/filter-options"),
    ]).then(([doctorResponse, hospitalResponse, blogResponse, filterResponse]) => {
      setDoctors(doctorResponse.data.data || []);
      setSpecialties((filterResponse.data.data?.specialtyCounts || []).map(({ name, count }) => [name, count]));
      setHospitals(Array.isArray(hospitalResponse.data) ? hospitalResponse.data : hospitalResponse.data.data || []);
      setBlogs(blogResponse.data.data || []);
    }).catch(() => setError("সর্বশেষ স্বাস্থ্যসেবা তথ্য লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  }, []);


  const runSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    if (searchType === "hospital") router.push(`/hospitals${query ? `?search=${encodeURIComponent(query)}` : ""}`);
    else router.push(`/doctors${query ? `?${searchType === "specialty" ? "specialization" : "search"}=${encodeURIComponent(query)}` : ""}`);
  };

  return <main className="min-h-screen bg-white font-hind-siliguri">
    <section className="bg-gradient-to-br from-sky-950 via-sky-800 to-blue-700 px-4 py-16 text-white md:py-24"><div className="mx-auto max-w-6xl text-center"><Badge className="mb-5 bg-white/15 text-white">বিশ্বস্ত ডিজিটাল স্বাস্থ্যসেবা</Badge><h1 className="text-4xl font-bold leading-tight md:text-6xl">ডাক্তার, হাসপাতাল ও জরুরি সেবা<br className="hidden md:block" /> এখন এক জায়গায়</h1><p className="mx-auto mt-5 max-w-2xl text-lg text-sky-100">বাস্তব প্রোফাইল দেখুন, ফিল্টার করুন, রিভিউ পড়ুন এবং সরাসরি অ্যাপয়েন্টমেন্ট অনুরোধ পাঠান।</p>
      <form onSubmit={runSearch} className="mx-auto mt-9 max-w-3xl rounded-2xl bg-white p-3 text-slate-900 shadow-2xl"><div className="mb-3 grid grid-cols-3 gap-2">{[["doctor","ডাক্তার"],["hospital","হাসপাতাল"],["specialty","বিশেষত্ব"]].map(([value,label]) => <button type="button" key={value} onClick={() => setSearchType(value)} className={`rounded-lg px-3 py-2 text-sm font-medium ${searchType === value ? "bg-sky-100 text-sky-800" : "hover:bg-slate-50"}`}>{label}</button>)}</div><div className="flex flex-col gap-2 sm:flex-row"><Input value={search} onChange={(e) => setSearch(e.target.value)} className="h-12 flex-1" placeholder={searchType === "hospital" ? "হাসপাতালের নাম, শহর বা বিভাগ" : searchType === "specialty" ? "যেমন: Cardiology" : "ডাক্তারের নাম বা বিভাগ"} /><Button className="h-12 bg-sky-600 px-7"><Search className="mr-2 h-5 w-5" />খুঁজুন</Button></div></form>
      <div className="mt-6 flex flex-wrap justify-center gap-3"><Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600"><Link href="/doctors"><CalendarDays className="mr-2 h-5 w-5" />অ্যাপয়েন্টমেন্ট</Link></Button><Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"><Link href="/ambulance"><Ambulance className="mr-2 h-5 w-5" />অ্যাম্বুলেন্স</Link></Button></div></div></section>

    <section className="border-b bg-sky-50 px-4 py-8"><div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">{[[Stethoscope,doctors.length,`সক্রিয় ডাক্তার`,"/doctors"],[Building2,hospitals.length,`সক্রিয় হাসপাতাল`,"/hospitals"],[Droplets,"রক্ত","দাতা খুঁজুন","/blood-donors"],[ShieldCheck,"২৪/৭","জরুরি সহায়তা","/ambulance"]].map(([Icon,value,label,href]) => <Link href={href} key={href}><Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md"><CardContent className="flex items-center gap-4 p-5"><Icon className="h-9 w-9 text-sky-600" /><div><p className="text-xl font-bold text-sky-950">{value}</p><p className="text-sm text-slate-600">{label}</p></div></CardContent></Card></Link>)}</div></section>

    <section className="px-4 py-14"><div className="mx-auto max-w-6xl"><div className="mb-7 flex items-end justify-between"><div><h2 className="text-3xl font-bold text-sky-950">বিশেষজ্ঞ বিভাগ</h2><p className="mt-2 text-slate-600">বর্তমানে তালিকাভুক্ত ডাক্তারদের তথ্য থেকে</p></div><Button asChild variant="outline"><Link href="/doctors">সব দেখুন</Link></Button></div>{loading ? <Loader2 className="mx-auto h-8 w-8 animate-spin text-sky-600" /> : specialties.length ? <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">{specialties.map(([name,count]) => <Link key={name} href={`/doctors?specialization=${encodeURIComponent(name)}`} className="rounded-xl border bg-white p-5 transition hover:border-sky-300 hover:shadow-md"><Stethoscope className="mb-3 h-7 w-7 text-sky-600" /><h3 className="font-semibold text-sky-950">{name}</h3><p className="mt-1 text-sm text-slate-500">{count} জন ডাক্তার</p></Link>)}</div> : <p className="text-slate-500">বিশেষত্বের তথ্য পাওয়া যায়নি।</p>}</div></section>

    <section className="bg-slate-50 px-4 py-14"><div className="mx-auto max-w-6xl"><div className="mb-7 flex items-end justify-between"><div><h2 className="text-3xl font-bold text-sky-950">শীর্ষ ডাক্তার</h2><p className="mt-2 text-slate-600">রেটিং ও প্রোফাইল তথ্য অনুযায়ী</p></div><Button asChild variant="outline"><Link href="/doctors">সব ডাক্তার</Link></Button></div>{error && <p className="mb-5 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{doctors.slice(0,6).map((doctor) => { const id = doctor.slug || doctor.id || doctor._id; return <Card key={doctor.id || doctor._id} className="cursor-pointer gap-0 py-0 transition hover:shadow-lg" onClick={(event) => { if (!event.target.closest("a,button,input,select,textarea,[role=button]")) router.push(`/doctor/${id}`); }}><CardContent className="p-4"><div className="flex items-start gap-3"><Avatar className="h-20 w-20 shrink-0"><AvatarImage src={mediaUrl(doctor.personalDetails?.profilePicture)} className="object-cover" /><AvatarFallback>{nameOf(doctor).slice(0,2)}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><Link href={`/doctor/${id}`} className="doctor-name-link block text-lg font-bold text-sky-950 hover:text-sky-700">{nameOf(doctor)}</Link><p className="text-sm text-sky-700">{doctor.professional?.field || doctor.professional?.department || "চিকিৎসক"}</p><p className="mt-2 flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{doctor.ratingAverage || 0} ({doctor.reviewCount || 0})</p></div><div className="shrink-0"><DoctorActions doctor={doctor}/></div></div><div className="mt-4 flex justify-between text-sm text-slate-600"><span className="flex items-center gap-1"><Award className="h-4 w-4" />{doctor.personalDetails?.totalExperience || 0}+ বছর</span>{doctor.telemedicine && <span className="flex items-center gap-1"><Video className="h-4 w-4" />ভিডিও</span>}</div><Button asChild className="mt-4 w-full"><Link href={`/appointment?doctorId=${doctor.id || doctor._id}`}>অ্যাপয়েন্টমেন্ট নিন</Link></Button></CardContent></Card>; })}</div></div></section>

    <section className="px-4 py-14"><div className="mx-auto max-w-6xl"><div className="mb-7 flex items-end justify-between"><div><h2 className="text-3xl font-bold text-sky-950">নির্বাচিত হাসপাতাল</h2><p className="mt-2 text-slate-600">সক্রিয় হাসপাতালের হালনাগাদ তথ্য</p></div><Button asChild variant="outline"><Link href="/hospitals">সব হাসপাতাল</Link></Button></div><div className="grid gap-5 md:grid-cols-2">{hospitals.slice(0,4).map((hospital) => { const info=hospital.basicInfo || {}; const city=hospital.address?.city; return <Card key={hospital.id || hospital._id} className="overflow-hidden"><MediaImage src={info.images?.[0] || info.logo} alt={info.name} fallback="/images/default-hospital.svg" className="h-40 w-full bg-sky-100 object-cover" /><CardContent className="p-5"><div className="flex justify-between gap-3"><div><Link href={`/hospital/${hospital.id || hospital._id}`} className="text-xl font-bold text-sky-950 hover:text-sky-700">{info.name}</Link>{city && <p className="mt-1 flex items-center gap-1 text-sm text-slate-600"><MapPin className="h-4 w-4" />{city}</p>}</div>{info.is24Hours && <Badge className="bg-emerald-100 text-emerald-800">২৪ ঘণ্টা</Badge>}</div><div className="mt-4 flex flex-wrap gap-2">{(hospital.departments || []).slice(0,4).map((department) => <Badge variant="secondary" key={department._id || department.name}>{department.name}</Badge>)}</div><Button asChild variant="outline" className="mt-4 w-full"><Link href={`/hospital/${hospital.id || hospital._id}`}>বিস্তারিত দেখুন</Link></Button></CardContent></Card>; })}</div></div></section>

    <section className="bg-sky-50 px-4 py-14"><div className="mx-auto max-w-6xl"><div className="mb-7 flex items-end justify-between"><div><h2 className="text-3xl font-bold text-sky-950">সাম্প্রতিক স্বাস্থ্য ব্লগ</h2><p className="mt-2 text-slate-600">প্রকাশিত স্বাস্থ্যবিষয়ক আর্টিকেল</p></div><Button asChild variant="outline"><Link href="/blog">সব আর্টিকেল</Link></Button></div>{blogs.length ? <div className="grid gap-5 md:grid-cols-3">{blogs.map((post) => <Card key={post._id} className="overflow-hidden"><MediaImage src={post.thumbnail} alt={post.title} className="h-36 w-full bg-sky-100 object-cover" /><CardContent className="p-5"><Badge variant="secondary">{post.category}</Badge><Link href={`/blog/${post.slug}`} className="mt-3 block text-lg font-bold text-sky-950 hover:text-sky-700">{post.title}</Link><p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.summary}</p><Button asChild variant="link" className="mt-2 px-0"><Link href={`/blog/${post.slug}`}>পড়ুন</Link></Button></CardContent></Card>)}</div> : <Card><CardContent className="py-10 text-center text-slate-500">প্রকাশিত আর্টিকেল শিগগিরই এখানে দেখা যাবে।</CardContent></Card>}</div></section>

    <section className="bg-gradient-to-r from-red-600 to-rose-600 px-4 py-12 text-white"><div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left"><div><h2 className="text-3xl font-bold">জরুরি অ্যাম্বুলেন্স প্রয়োজন?</h2><p className="mt-2 text-red-100">নিকটবর্তী সক্রিয় অ্যাম্বুলেন্স দেখুন এবং অনুরোধ পাঠান।</p></div><Button asChild size="lg" variant="secondary"><Link href="/ambulance"><Ambulance className="mr-2 h-5 w-5" />অ্যাম্বুলেন্স খুঁজুন</Link></Button></div></section>
  </main>;
}
