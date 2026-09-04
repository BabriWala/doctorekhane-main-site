"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import api, { IMAGE_BASE_URL } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const empty = { name: "", email: "", phone: "", dob: "", street: "", city: "", state: "", postalCode: "", country: "বাংলাদেশ" };
export default function AccountPage() {
  const { user, loading, logout, refreshUser } = useAuth(); const router = useRouter();
  const [form, setForm] = useState(empty); const [message, setMessage] = useState(null); const [saving, setSaving] = useState(false);
  useEffect(() => { if (!loading && !user) router.replace("/login"); }, [loading, user, router]);
  useEffect(() => { if (!user) return; const d = user.personalDetails || user; const a = d.address || {}; setForm({ name:d.name||"", email:d.email||"", phone:d.phone||"", dob:d.dob?String(d.dob).slice(0,10):"", street:a.street||"", city:a.city||"", state:a.state||"", postalCode:a.postalCode||"", country:a.country||"বাংলাদেশ" }); }, [user]);
  const update = (key) => (e) => setForm((old) => ({ ...old, [key]: e.target.value }));
  const save = async (e) => { e.preventDefault(); setSaving(true); setMessage(null); try { await api.patch("/auth/profile", { name:form.name,email:form.email,phone:form.phone,dob:form.dob||null,address:{street:form.street,city:form.city,state:form.state,postalCode:form.postalCode,country:form.country} }); await refreshUser(); setMessage({ok:true,text:"প্রোফাইল সফলভাবে সংরক্ষণ হয়েছে।"}); } catch(error) { setMessage({ok:false,text:error.response?.data?.message||"প্রোফাইল সংরক্ষণ করা যায়নি।"}); } finally { setSaving(false); } };
  const upload = async (e) => { const file=e.target.files?.[0]; if(!file)return; if(!file.type.startsWith("image/")||file.size>8*1024*1024)return setMessage({ok:false,text:"৮ MB-এর কম JPG, PNG বা WebP ছবি দিন।"}); const data=new FormData();data.append("photo",file);setSaving(true);try{await api.post("/auth/profile/photo",data);await refreshUser();setMessage({ok:true,text:"প্রোফাইল ছবি আপডেট হয়েছে।"});}catch(error){setMessage({ok:false,text:error.response?.data?.message||"ছবি আপলোড করা যায়নি।"});}finally{setSaving(false);e.target.value="";} };
  if (loading || !user) return <main className="min-h-[60vh] p-10 text-center">অ্যাকাউন্ট লোড হচ্ছে...</main>;
  const photo=user.profilePhoto?`${IMAGE_BASE_URL}${user.profilePhoto}`:"/images/default-doctor.svg";
  const fields=[["name","নাম","আপনার পূর্ণ নাম"],["email","ইমেইল","name@example.com"],["phone","মোবাইল","01XXXXXXXXX"],["dob","জন্মতারিখ",""]];
  return <main className="min-h-[calc(100vh-4rem)] bg-sky-50 px-4 py-10"><Card className="mx-auto max-w-3xl"><CardHeader><CardTitle>আমার প্রোফাইল</CardTitle></CardHeader><CardContent><nav aria-label="Account tools" className="mb-6 flex flex-wrap gap-3"><Link className="underline" href={user.account?.role === "doctor" ? "/dashboard/doctor" : "/dashboard/patient"}>My dashboard</Link><Link className="underline" href="/appointment/track">Track appointment</Link><Link className="underline" href="/ambulance/track">Track ambulance</Link><Link className="underline" href="/blood-request/track">Track blood request</Link></nav><form onSubmit={save} className="space-y-6">
    <div className="flex flex-wrap items-center gap-4"><img src={photo} alt="প্রোফাইল" className="h-24 w-24 rounded-full border object-cover"/><label className="cursor-pointer rounded-md border bg-white px-4 py-2 text-sm font-medium">ছবি পরিবর্তন<input type="file" accept="image/png,image/jpeg,image/webp" onChange={upload} className="sr-only"/></label></div>
    <div className="grid gap-4 sm:grid-cols-2">{fields.map(([key,label,placeholder])=><label key={key} className="space-y-1 text-sm font-medium">{label}<Input type={key==="email"?"email":key==="dob"?"date":"text"} value={form[key]} onChange={update(key)} placeholder={placeholder} required={key!=="dob"}/></label>)}</div>
    <div><h2 className="mb-3 font-semibold">ঠিকানা</h2><div className="grid gap-4 sm:grid-cols-2">{[["street","রাস্তা/এলাকা"],["city","শহর"],["state","জেলা/বিভাগ"],["postalCode","পোস্ট কোড"],["country","দেশ"]].map(([key,label])=><label key={key} className="space-y-1 text-sm font-medium">{label}<Input value={form[key]} onChange={update(key)} placeholder={label}/></label>)}</div></div>
    {message&&<div role="alert" className={`rounded-md p-3 text-sm ${message.ok?"bg-emerald-50 text-emerald-800":"bg-red-50 text-red-700"}`}>{message.text}</div>}
    <div className="flex flex-wrap gap-3"><Button type="submit" disabled={saving}>{saving?"সংরক্ষণ হচ্ছে...":"সংরক্ষণ করুন"}</Button><Button type="button" variant="outline" onClick={async()=>{await logout();router.replace("/");}}>লগআউট</Button></div>
  </form></CardContent></Card></main>;
}
