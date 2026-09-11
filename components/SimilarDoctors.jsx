"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import DoctorActions from "./DoctorActions";
export default function SimilarDoctors({ doctor }) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const specialty = doctor.specialization?.[0]?.field || doctor.professional?.department;
  useEffect(() => {
    if (!specialty) return;
    let active = true;
    api.get("/doctor", { params: { specialization: specialty, status: "Active", limit: 7 } }).then(({ data }) => { if (active) setItems((data.data || []).filter(item => String(item.id || item._id) !== String(doctor.id || doctor._id)).slice(0, 6)); }).catch(() => {});
    return () => { active = false; };
  }, [specialty, doctor.id, doctor._id]);
  if (!items.length) return null;
  return <section className="mx-auto max-w-5xl px-4"><h2 className="mb-4 text-2xl font-bold text-sky-950">একই বিভাগের ডাক্তার</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <article key={item.id || item._id} className="relative cursor-pointer rounded-xl border border-sky-300 bg-white p-4 pt-3 hover:shadow-lg" onClick={(event) => { if (!event.target.closest("a,button,input,select,textarea,[role=button]")) router.push(`/doctor/${item.slug || item.id || item._id}`); }}><div className="absolute right-3 top-3"><DoctorActions doctor={item}/></div><Link className="doctor-name-link block max-w-[60%] truncate font-semibold text-sky-900" title={[item.personalDetails?.firstName, item.personalDetails?.lastName].filter(Boolean).join(" ")} href={`/doctor/${item.slug || item.id || item._id}`}>{[item.personalDetails?.firstName, item.personalDetails?.lastName].filter(Boolean).join(" ")}</Link><p className="mt-0 truncate text-sm text-slate-600">{specialty}</p>{item.personalDetails?.phone && <a className="mt-3 inline-flex min-h-10 items-center rounded-md bg-emerald-600 px-4 text-sm font-medium text-white" href={`tel:${item.personalDetails.phone}`}>Call Now</a>}</article>)}</div></section>;
}
