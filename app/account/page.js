"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  const { user, loading, logout } = useAuth(); const router = useRouter();
  useEffect(() => { if (!loading && !user) router.replace("/login"); }, [loading, user, router]);
  if (loading || !user) return <main className="min-h-[60vh] p-10 text-center">অ্যাকাউন্ট লোড হচ্ছে...</main>;
  const details = user.personalDetails || user;
  return <main className="min-h-[calc(100vh-4rem)] bg-sky-50 px-4 py-12"><Card className="mx-auto max-w-2xl"><CardHeader><CardTitle>আমার অ্যাকাউন্ট</CardTitle></CardHeader><CardContent className="space-y-4"><div><p className="text-sm text-muted-foreground">নাম</p><p className="font-medium">{details.name}</p></div><div><p className="text-sm text-muted-foreground">ইমেইল</p><p className="font-medium">{details.email}</p></div>{details.phone && <div><p className="text-sm text-muted-foreground">মোবাইল</p><p className="font-medium">{details.phone}</p></div>}<Button variant="outline" onClick={async () => { await logout(); router.replace("/"); }}>লগআউট</Button></CardContent></Card></main>;
}
