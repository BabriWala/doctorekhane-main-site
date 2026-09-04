"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RequestTracker({ title, endpoint, numberLabel, numberKey, phoneKey, phoneLabel="মোবাইল নম্বর" }) {
  const [number,setNumber]=useState(""); const [phone,setPhone]=useState(""); const [item,setItem]=useState(null); const [message,setMessage]=useState(""); const [loading,setLoading]=useState(false);
  const track=async(silent=false)=>{if(!number||!phone)return; if(!silent)setLoading(true); try{const {data}=await api.get(endpoint,{params:{[numberKey]:number,[phoneKey]:phone}});setItem(data.data);setMessage("");}catch(error){if(!silent)setItem(null);setMessage(error.response?.data?.message||"তথ্য পাওয়া যায়নি।");}finally{setLoading(false);}};
  useEffect(()=>{if(!item)return;const timer=setInterval(()=>track(true),20000);return()=>clearInterval(timer);},[item,number,phone]);
  const customerAction = async (action) => {
    if (action === "cancel" && !window.confirm("অনুরোধ বাতিল করবেন?")) return;
    setLoading(true);
    try { const { data } = await api.post(endpoint + "/action", { requestNumber: item.requestNumber, contactNumber: phone, action }); setItem(data.data); setMessage(action === "cancel" ? "অনুরোধ বাতিল হয়েছে" : "অ্যাম্বুলেন্স গ্রহণ করা হয়েছে"); }
    catch (error) { setMessage(error.response?.data?.message || "আপডেট করা যায়নি"); }
    finally { setLoading(false); }
  };
  return <main className="min-h-[65vh] bg-sky-50 px-4 py-12"><Card className="mx-auto max-w-2xl"><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent className="space-y-5"><form onSubmit={(e)=>{e.preventDefault();track();}} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"><Input value={number} onChange={(e)=>setNumber(e.target.value)} placeholder={numberLabel} required/><Input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder={phoneLabel} required/><Button disabled={loading}>{loading?"খোঁজা হচ্ছে...":"ট্র্যাক করুন"}</Button></form>{message&&<div role="alert" className="rounded-md bg-red-50 p-3 text-red-700">{message}</div>}{item&&<div aria-live="polite" className="space-y-3 rounded-xl border bg-white p-5"><div className="flex items-center justify-between gap-4"><strong>{item[numberKey]}</strong><span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-800">{item.status}</span></div>{item.patient?.name&&<p>রোগী: {item.patient.name}</p>}{item.patientName&&<p>রোগী: {item.patientName}</p>}{item.bloodGroup&&<p>রক্তের গ্রুপ: {item.bloodGroup}</p>}{item.pickupLocation&&<p>পিকআপ: {item.pickupLocation}</p>}{item.appointmentDate&&<p>তারিখ: {new Date(item.appointmentDate).toLocaleString("bn-BD")}</p>}{endpoint === "/ambulance-requests/track" && <div className="flex gap-3">{item.status === "assigned" && !item.customerAcceptedAt && <Button disabled={loading} onClick={() => customerAction("accept")}>গ্রহণ করুন</Button>}{["pending", "assigned"].includes(item.status) && <Button variant="destructive" disabled={loading} onClick={() => customerAction("cancel")}>বাতিল করুন</Button>}{item.customerAcceptedAt && <span>আপনি অ্যাম্বুলেন্সটি গ্রহণ করেছেন</span>}</div>}<p className="text-xs text-muted-foreground">স্ট্যাটাস প্রতি ২০ সেকেন্ডে স্বয়ংক্রিয়ভাবে আপডেট হয়।</p></div>}</CardContent></Card></main>;
}
