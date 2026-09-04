"use client";
import { useState } from "react";
import { Phone, Share2, Heart } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
export default function DoctorActions({ doctor, prominent = false }) {
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const toggleSaved = async () => {
    if (!user) { setMessage("ডাক্তার সংরক্ষণ করতে লগইন করুন"); return; }
    setSaving(true);
    try { const { data } = await api.post(`/users/favorites/doctors/${doctor.id || doctor._id}`); setMessage(data.favorite ? "ডাক্তার সংরক্ষিত হয়েছে" : "সংরক্ষিত তালিকা থেকে সরানো হয়েছে"); }
    catch { setMessage("সংরক্ষণ করা যায়নি"); } finally { setSaving(false); }
  };
  const phone = doctor.personalDetails?.phone;
  const share = async () => {
    const url = `${window.location.origin}/doctor/${doctor.slug || doctor.id || doctor._id}`;
    try {
      if (navigator.share) await navigator.share({ title: "Doctor Ekhane", url });
      else { await navigator.clipboard.writeText(url); setMessage("লিংক কপি হয়েছে"); }
    } catch (error) { if (error.name !== "AbortError") setMessage("লিংক কপি করা যায়নি"); }
  };
  return <div className="flex flex-wrap items-center justify-end gap-2">
    {phone ? <Button asChild size={prominent ? "default" : "icon"} className="bg-emerald-600 text-white hover:bg-emerald-700"><a href={`tel:${phone}`} aria-label="ডাক্তারকে কল করুন"><Phone className="h-4 w-4" />{prominent && "Call Now"}</a></Button> : <Button disabled size="icon" aria-label="ফোন নম্বর দেওয়া নেই"><Phone className="h-4 w-4" /></Button>}
    <Button type="button" variant="outline" size="icon" onClick={share} aria-label="ডাক্তারের প্রোফাইল শেয়ার করুন" className="text-sky-900"><Share2 className="h-4 w-4" /></Button>
    <Button type="button" variant="outline" size="icon" disabled={saving} onClick={toggleSaved} aria-label="সংরক্ষিত ডাক্তার তালিকায় যোগ বা বাদ দিন"><Heart className="h-4 w-4" /></Button>
    {message && <span role="status" className="text-xs">{message}</span>}
  </div>;
}
