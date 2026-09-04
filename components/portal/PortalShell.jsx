"use client";
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { usePathname } from 'next/navigation';
const doctorLinks=[['','Overview'],['appointments','Appointments'],['patients','Patient encounters'],['prescriptions','Prescriptions'],['messages','Messages'],['availability','Chambers & hours'],['reviews','Reviews'],['analytics','Statistics'],['profile','Profile']];
const patientLinks=[['','Overview'],['appointments','Appointments'],['history','Visit history'],['prescriptions','Prescriptions'],['favorites','Saved doctors'],['messages','Messages'],['reminders','Reminders']];
export default function PortalShell({role,children}){
  const {user,loading,logout}=useAuth(); const pathname=usePathname();
  if(loading)return <main className="p-8" role="status">Loading account…</main>;
  if(!user)return <main className="p-8"><p>Please sign in to view your records.</p><Link className="underline" href="/login">Sign in</Link></main>;
  const expected=role==='doctor'?'doctor':'user';
  if(user.account?.role!==expected)return <main className="p-8"><h1 className="text-xl font-bold">Account access</h1><p>This portal requires a {role} account{role==='doctor'?' linked by an administrator':''}.</p><Link className="underline" href="/account">My account</Link></main>;
  const base=`/dashboard/${role}`;
  return <main className="min-h-screen bg-sky-50 px-4 py-6"><div className="mx-auto max-w-7xl"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-bold text-sky-950">{role==='doctor'?'Doctor':'Patient'} portal · {user.personalDetails?.name}</h1><button className="rounded border bg-white px-4 py-2" onClick={logout}>Sign out</button></div><div className="grid gap-5 lg:grid-cols-[210px_minmax(0,1fr)]"><nav aria-label={`${role} portal`} className="flex flex-wrap content-start gap-2 rounded-xl border bg-white p-3 lg:flex-col">{(role==='doctor'?doctorLinks:patientLinks).map(([path,label])=><Link key={path} href={`${base}${path?'/'+path:''}`} aria-current={pathname===`${base}${path?'/'+path:''}`?'page':undefined} className={`rounded px-3 py-2 text-sm ${pathname===`${base}${path?'/'+path:''}`?'bg-sky-100 font-bold':'hover:bg-slate-50'}`}>{label}</Link>)}</nav><section className="min-w-0">{children}</section></div></div></main>;
}
