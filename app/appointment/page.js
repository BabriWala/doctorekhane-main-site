"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock, Loader2, Stethoscope } from "lucide-react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const emptyForm = { patientName: "", patientPhone: "", patientEmail: "", patientAge: "", patientGender: "", appointmentDate: "", timeSlot: "", reason: "", consultationType: "in-person", chamberId: "" };
const fullName = (doctor) => [doctor?.personalDetails?.firstName, doctor?.personalDetails?.middleName, doctor?.personalDetails?.lastName].filter(Boolean).join(" ");

export default function AppointmentPage() {
  const searchParams = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(searchParams.get("doctorId") || "");
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    api.get("/doctor", { params: { limit: 100, status: "Active" } })
      .then(({ data }) => setDoctors(data.data || []))
      .catch(() => setError("Doctors could not be loaded. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const doctor = useMemo(() => doctors.find((item) => (item.id || item._id) === doctorId), [doctors, doctorId]);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!doctorId || !form.patientName || !form.patientPhone || !form.appointmentDate || !form.timeSlot) {
      setError("Please complete the doctor, patient, date, and time fields."); return;
    }
    setSubmitting(true);
    try {
      const appointmentDate = new Date(`${form.appointmentDate}T12:00:00`);
      const { data } = await api.post("/appointments", { doctorId, ...form, chamberId: form.chamberId || undefined, patientAge: form.patientAge ? Number(form.patientAge) : undefined, appointmentDate: appointmentDate.toISOString() });
      setConfirmation(data.data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "The appointment could not be submitted.");
    } finally { setSubmitting(false); }
  };

  if (confirmation) return <main className="min-h-[70vh] bg-sky-50 px-4 py-16"><Card className="mx-auto max-w-xl text-center"><CardContent className="space-y-5 p-10"><CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" /><h1 className="text-3xl font-bold text-sky-950">Appointment requested</h1><p className="text-muted-foreground">Your request has been received. The clinic will confirm it shortly.</p><div className="rounded-lg bg-sky-100 p-4 text-sm text-sky-900">Reference: <strong>{confirmation.appointmentNumber}</strong><br />{fullName(doctor)} · {form.appointmentDate} · {form.timeSlot}</div><div className="flex flex-wrap justify-center gap-3"><Button asChild><Link href="/appointment/track">Track appointment</Link></Button><Button asChild variant="outline"><Link href="/doctors">Find another doctor</Link></Button></div></CardContent></Card></main>;

  return <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-4 py-10"><div className="mx-auto max-w-4xl"><div className="mb-8 text-center"><Stethoscope className="mx-auto mb-3 h-10 w-10 text-sky-600" /><h1 className="text-3xl font-bold text-sky-950">Book an appointment</h1><p className="mt-2 text-sky-700">Submit a request directly to your selected doctor.</p></div><Card><CardHeader><CardTitle>Appointment information</CardTitle></CardHeader><CardContent><form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
    <div className="space-y-2 md:col-span-2"><Label>Doctor *</Label><select className="h-10 w-full rounded-md border bg-white px-3" value={doctorId} onChange={(e) => { setDoctorId(e.target.value); update("chamberId", ""); }} disabled={loading}><option value="">{loading ? "Loading doctors..." : "Select a doctor"}</option>{doctors.map((item) => <option key={item.id || item._id} value={item.id || item._id}>{fullName(item)} — {item.professional?.field || item.professional?.department || "Doctor"}</option>)}</select></div>
    {doctor?.chambers?.length > 0 && <div className="space-y-2 md:col-span-2"><Label>Chamber</Label><select className="h-10 w-full rounded-md border bg-white px-3" value={form.chamberId} onChange={(e) => update("chamberId", e.target.value)}><option value="">Choose at confirmation</option>{doctor.chambers.map((chamber) => <option key={chamber._id} value={chamber._id}>{chamber.chamberName} — {chamber.day}, {chamber.from}–{chamber.to}</option>)}</select></div>}
    <div className="space-y-2"><Label>Patient name *</Label><Input placeholder="Enter the patient's full name" value={form.patientName} onChange={(e) => update("patientName", e.target.value)} /></div><div className="space-y-2"><Label>Phone *</Label><Input type="tel" placeholder="01XXXXXXXXX" value={form.patientPhone} onChange={(e) => update("patientPhone", e.target.value)} /></div>
    <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="patient@example.com" value={form.patientEmail} onChange={(e) => update("patientEmail", e.target.value)} /></div><div className="grid grid-cols-2 gap-3"><div className="space-y-2"><Label>Age</Label><Input type="number" min="0" max="120" placeholder="Age" value={form.patientAge} onChange={(e) => update("patientAge", e.target.value)} /></div><div className="space-y-2"><Label>Gender</Label><select className="h-10 w-full rounded-md border bg-white px-3" value={form.patientGender} onChange={(e) => update("patientGender", e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div></div>
    <div className="space-y-2"><Label className="flex gap-2"><CalendarDays className="h-4 w-4" /> Date *</Label><Input type="date" min={new Date().toISOString().slice(0, 10)} value={form.appointmentDate} onChange={(e) => update("appointmentDate", e.target.value)} /></div><div className="space-y-2"><Label className="flex gap-2"><Clock className="h-4 w-4" /> Preferred time *</Label><Input type="time" value={form.timeSlot} onChange={(e) => update("timeSlot", e.target.value)} /></div>
    <div className="space-y-2"><Label>Consultation</Label><select className="h-10 w-full rounded-md border bg-white px-3" value={form.consultationType} onChange={(e) => update("consultationType", e.target.value)}><option value="in-person">In person</option>{doctor?.telemedicine && <option value="video">Video consultation</option>}</select></div><div className="space-y-2 md:col-span-2"><Label>Reason for visit</Label><Textarea value={form.reason} onChange={(e) => update("reason", e.target.value)} placeholder="Briefly describe the health concern" /></div>
    {error && <p role="alert" className="md:col-span-2 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}<div className="md:col-span-2"><Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700" disabled={submitting || loading}>{submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Submit appointment request</Button></div>
  </form></CardContent></Card></div></main>;
}
