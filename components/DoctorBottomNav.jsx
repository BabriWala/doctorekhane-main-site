"use client";

import Link from "next/link";
import { Building2, CalendarDays, HeartPulse, MessageCircle, Phone } from "lucide-react";

export default function DoctorBottomNav({ doctor }) {
  const id = doctor.id || doctor._id; const phone = doctor.personalDetails?.phone;
  const items = [
    [CalendarDays, "Appointment", `/appointment?doctorId=${id}`],
    [Building2, "Hospital", "/hospitals"],
    [MessageCircle, "Chat", "/dashboard/patient/messages"],
    [HeartPulse, "Health Check", "/blog"],
  ];
  return <nav aria-label="Doctor quick actions" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-sky-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(15,23,42,.12)] backdrop-blur md:hidden">
    {items.map(([Icon, label, href]) => <Link key={label} href={href} className="flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[10px] font-medium text-sky-900"><Icon className="h-5 w-5" /><span>{label}</span></Link>)}
    {phone ? <a href={`tel:${phone}`} className="flex min-h-16 flex-col items-center justify-center gap-1 bg-emerald-600 px-1 text-[10px] font-medium text-white"><Phone className="h-5 w-5" /><span>Call</span></a> : <span className="flex min-h-16 flex-col items-center justify-center gap-1 bg-slate-200 px-1 text-[10px] text-slate-500"><Phone className="h-5 w-5" /><span>Call</span></span>}
  </nav>;
}
