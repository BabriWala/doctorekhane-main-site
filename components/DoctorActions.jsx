"use client";
import { useState } from "react";
import { Phone, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function DoctorActions({ doctor, prominent = false, showCall = prominent }) {
  const [message, setMessage] = useState("");
  const phone = doctor.personalDetails?.phone;
  const share = async () => {
    const url = `${window.location.origin}/doctor/${doctor.slug || doctor.id || doctor._id}`;
    try {
      if (navigator.share) await navigator.share({ title: "Doctor Ekhane", url });
      else { await navigator.clipboard.writeText(url); setMessage("লিংক কপি হয়েছে"); }
    } catch (error) { if (error.name !== "AbortError") setMessage("লিংক কপি করা যায়নি"); }
  };
  return <div className="flex flex-wrap items-center justify-end gap-2">
    {showCall && (phone ? <Button asChild size={prominent ? "default" : "icon"} className="bg-emerald-600 text-white hover:bg-emerald-700"><a href={`tel:${phone}`} aria-label="ডাক্তারকে কল করুন"><Phone className="h-4 w-4" />{prominent && "Call Now"}</a></Button> : <Button disabled size="icon" aria-label="ফোন নম্বর দেওয়া নেই"><Phone className="h-4 w-4" /></Button>)}
    <Button type="button" variant="outline" size="icon" onClick={share} aria-label="ডাক্তারের প্রোফাইল শেয়ার করুন" className="text-sky-900"><Share2 className="h-4 w-4" /></Button>
    {message && <span role="status" className="text-xs">{message}</span>}
  </div>;
}
