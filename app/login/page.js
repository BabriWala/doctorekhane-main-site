"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth(); const router = useRouter();
  const submit = async (event) => { event.preventDefault(); setSubmitting(true); setError(""); try { const account = await login(form.email, form.password); router.replace(account.account?.role === "doctor" ? "/dashboard/doctor" : "/account"); } catch (err) { setError(err.response?.data?.message || "লগইন করা যায়নি"); } finally { setSubmitting(false); } };
  return <main className="min-h-[calc(100vh-4rem)] bg-sky-50 px-4 py-12"><Card className="mx-auto max-w-md"><CardHeader><CardTitle>লগইন</CardTitle><CardDescription>আপনার ডাক্তার এখানে অ্যাকাউন্টে প্রবেশ করুন</CardDescription></CardHeader><CardContent><form onSubmit={submit} className="space-y-4">{error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}<div className="space-y-2"><Label htmlFor="email">ইমেইল</Label><Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div><div className="space-y-2"><Label htmlFor="password">পাসওয়ার্ড</Label><Input id="password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div><Button className="w-full" disabled={submitting}>{submitting ? "লগইন হচ্ছে..." : "লগইন"}</Button><p className="text-center text-sm">অ্যাকাউন্ট নেই? <Link href="/signup" className="text-sky-700 underline">সাইন আপ করুন</Link></p></form></CardContent></Card></main>;
}
