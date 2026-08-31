"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState(""); const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth(); const router = useRouter();
  const submit = async (event) => { event.preventDefault(); setSubmitting(true); setError(""); try { await register(form); router.replace("/account"); } catch (err) { setError(err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || "সাইন আপ করা যায়নি"); } finally { setSubmitting(false); } };
  return <main className="min-h-[calc(100vh-4rem)] bg-sky-50 px-4 py-12"><Card className="mx-auto max-w-md"><CardHeader><CardTitle>নতুন অ্যাকাউন্ট</CardTitle><CardDescription>স্বাস্থ্যসেবা বুক করতে বিনামূল্যে নিবন্ধন করুন</CardDescription></CardHeader><CardContent><form onSubmit={submit} className="space-y-4">{error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}{[["name","পূর্ণ নাম","text"],["email","ইমেইল","email"],["phone","মোবাইল নম্বর","tel"],["password","পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)","password"]].map(([name,label,type]) => <div key={name} className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} type={type} required minLength={name === "password" ? 6 : undefined} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} /></div>)}<Button className="w-full" disabled={submitting}>{submitting ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}</Button><p className="text-center text-sm">আগেই অ্যাকাউন্ট আছে? <Link href="/login" className="text-sky-700 underline">লগইন করুন</Link></p></form></CardContent></Card></main>;
}
