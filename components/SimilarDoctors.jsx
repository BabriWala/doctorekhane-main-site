"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import DoctorActions from "./DoctorActions";
export default function SimilarDoctors({ doctor }) {
  const [items, setItems] = useState([]);
  const specialty = doctor.specialization?.[0]?.field || doctor.professional?.department;
  useEffect(() => {
    if (!specialty) return;
    let active = true;
    api.get("/doctor", { params: { specialization: specialty, status: "Active", limit: 7 } }).then(({ data }) => { if (active) setItems((data.data || []).filter(item => String(item.id || item._id) !== String(doctor.id || doctor._id)).slice(0, 6)); }).catch(() => {});
    return () => { active = false; };
  }, [specialty, doctor.id, doctor._id]);
  if (!items.length) return null;
  return <section className="mx-auto max-w-5xl px-4"><h2 className="mb-4 text-2xl font-bold text-sky-950">একই বিভাগের ডাক্তার</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <article key={item.id || item._id} className="rounded-xl border border-sky-200 bg-white p-5"><DoctorActions doctor={item}/><Link className="mt-3 block font-semibold text-sky-900" href={`/doctor/${item.slug || item.id || item._id}`}>{[item.personalDetails?.firstName, item.personalDetails?.lastName].filter(Boolean).join(" ")}</Link><p className="text-sm text-slate-600">{specialty}</p></article>)}</div></section>;
}
