"use client";

import { MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

// The fictional 555-0100 number is deliberately used instead of a real person's number.
const demoNumber = "+12025550100";
export default function ContactWidget() {
  const pathname = usePathname();
  const phone = process.env.NEXT_PUBLIC_SUPPORT_PHONE || demoNumber;
  const whatsapp = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || demoNumber;
  const demo = phone === demoNumber || whatsapp === demoNumber;
  if (pathname === "/") return null;
  return <aside aria-label="যোগাযোগ" className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 pb-[env(safe-area-inset-bottom)]">
    {demo && <span className="rounded-md border bg-white px-2 py-1 text-xs text-slate-600 shadow">Demo contact — not a live service</span>}
    <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp chat" className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2"><MessageCircle className="h-6 w-6" /></a>
    <a href={`tel:${phone}`} aria-label="Call support" className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-sky-700 text-white shadow-lg hover:bg-sky-800 focus-visible:outline focus-visible:outline-2"><Phone className="h-6 w-6" /></a>
  </aside>;
}
