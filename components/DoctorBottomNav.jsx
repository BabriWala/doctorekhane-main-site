"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Stethoscope, HeartPulse, MessageCircle, Phone } from "lucide-react";

const NavigationContext = createContext(null);
export function MobileNavigationProvider({ children }) {
  const [doctorNavigation, setDoctorNavigation] = useState(null);
  return <NavigationContext.Provider value={{ doctorNavigation, setDoctorNavigation }}>{children}</NavigationContext.Provider>;
}
export const useDoctorNavigation = () => useContext(NavigationContext);

export default function DoctorBottomNav() {
  const pathname = usePathname();
  const { doctorNavigation } = useDoctorNavigation();
  const doctor = doctorNavigation?.pathname === pathname ? doctorNavigation.doctor : null;
  const phone = doctor?.personalDetails?.phone || process.env.NEXT_PUBLIC_SUPPORT_PHONE;
  const items = [
    [Stethoscope, "Doctor", "/doctors", "/doctors"],
    [Building2, "Hospital", "/hospitals", "/hospitals"],
    [MessageCircle, "Chat", "/dashboard/patient/messages", "/dashboard/patient/messages"],
    [HeartPulse, "Health Check", "/blog", "/blog"],
  ];
  const itemClass = "flex min-h-[56px] min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] font-semibold leading-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600";
  return <nav aria-label="Mobile quick actions" className="fixed inset-x-0 bottom-0 z-40 rounded-t-2xl border-t border-sky-200 bg-white/95 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(3,105,161,0.16)] backdrop-blur-md md:hidden">
    <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
      {items.map(([Icon, label, href, route]) => {
        const active = pathname === route || pathname.startsWith(`${route}/`) || (route === "/doctors" && pathname.startsWith("/doctor/"));
        return <Link key={label} href={href} aria-current={active ? "page" : undefined} className={`${itemClass} ${active ? "bg-sky-100 text-sky-800" : "text-sky-900 hover:bg-sky-50"}`}><Icon aria-hidden="true" className="h-6 w-6 shrink-0" /><span className="text-center">{label}</span></Link>;
      })}
      {phone ? <a href={`tel:${phone}`} className={`${itemClass} bg-emerald-600 text-white shadow-sm hover:bg-emerald-700`}><Phone aria-hidden="true" className="h-6 w-6" /><span>Call</span></a> : <button type="button" disabled aria-label="Call unavailable: no contact number configured" className={`${itemClass} bg-slate-100 text-slate-400`}><Phone aria-hidden="true" className="h-6 w-6" /><span>Call</span></button>}
    </div>
  </nav>;
}
