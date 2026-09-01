import Link from "next/link";
import { HeartPulse, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return <footer className="bg-sky-950 px-4 pt-12 text-sky-100"><div className="mx-auto grid max-w-6xl gap-9 pb-10 sm:grid-cols-2 lg:grid-cols-4">
    <div><Link href="/" className="flex items-center gap-2 text-xl font-bold text-white"><HeartPulse className="h-7 w-7 text-sky-400" />ডাক্তার এখানে</Link><p className="mt-4 text-sm leading-6 text-sky-200">ডাক্তার, হাসপাতাল, রক্তদাতা এবং জরুরি স্বাস্থ্যসেবা খোঁজার বিশ্বস্ত ডিজিটাল প্ল্যাটফর্ম।</p></div>
    <div><h2 className="font-semibold text-white">দ্রুত লিংক</h2><div className="mt-4 grid gap-2 text-sm">{[["/doctors","ডাক্তার"],["/hospitals","হাসপাতাল"],["/appointment","অ্যাপয়েন্টমেন্ট"],["/blog","স্বাস্থ্য ব্লগ"]].map(([href,label]) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}</div></div>
    <div><h2 className="font-semibold text-white">জরুরি সেবা</h2><div className="mt-4 grid gap-2 text-sm">{[["/ambulance","অ্যাম্বুলেন্স"],["/blood-donors","রক্তদাতা"],["/about","আমাদের সম্পর্কে"],["/account","আমার অ্যাকাউন্ট"]].map(([href,label]) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}</div></div>
    <div><h2 className="font-semibold text-white">যোগাযোগ</h2><div className="mt-4 space-y-3 text-sm text-sky-200"><p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" />বাংলাদেশ</p><a className="flex gap-2 hover:text-white" href="mailto:support@doctorekhane.com"><Mail className="h-4 w-4" />support@doctorekhane.com</a><a className="flex gap-2 hover:text-white" href="tel:999"><Phone className="h-4 w-4" />জরুরি সহায়তা: ৯৯৯</a></div></div>
  </div><div className="border-t border-sky-800 py-5 text-center text-xs text-sky-300">© {new Date().getFullYear()} ডাক্তার এখানে। সর্বস্বত্ব সংরক্ষিত।</div></footer>;
}
