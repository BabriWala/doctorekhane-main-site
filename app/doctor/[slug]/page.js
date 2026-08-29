"use client";

import { use, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Award, Building2, CalendarDays, CheckCircle2, Clock, Heart, Languages, Loader2, MapPin, Star, Stethoscope, Users } from "lucide-react";
import api, { IMAGE_BASE_URL } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const nameOf = (doctor) => [doctor?.personalDetails?.firstName, doctor?.personalDetails?.middleName, doctor?.personalDetails?.lastName].filter(Boolean).join(" ");
const imageUrl = (path) => path ? (path.startsWith("http") ? path : `${IMAGE_BASE_URL}${path}`) : "";

export default function DoctorDetailPage({ params }) {
  const { slug } = use(params);
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({ averageRating: 0, reviewCount: 0 });
  const [sort, setSort] = useState("newest");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewForm, setReviewForm] = useState({ patientName: "", rating: "5", title: "", comment: "", treatmentType: "" });
  const [reviewMessage, setReviewMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadReviews = useCallback(async (id) => {
    const { data } = await api.get(`/reviews/doctor/${id}`, { params: { sort, rating: rating || undefined, limit: 50 } });
    setReviews(data.data || []); setSummary(data.summary || { averageRating: 0, reviewCount: 0 });
  }, [sort, rating]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await api.get(`/doctor/${slug}`);
        if (!active) return;
        const provider = data.data || data;
        setDoctor(provider);
        await loadReviews(provider.id || provider._id);
      } catch (requestError) { if (active) setError(requestError.response?.data?.message || "Doctor profile could not be loaded."); }
      finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, [slug, loadReviews]);

  const submitReview = async (event) => {
    event.preventDefault(); setReviewMessage(""); setSubmitting(true);
    try {
      await api.post(`/reviews/doctor/${doctor.id || doctor._id}`, { ...reviewForm, rating: Number(reviewForm.rating) });
      setReviewForm({ patientName: "", rating: "5", title: "", comment: "", treatmentType: "" });
      setReviewMessage("Thank you. Your review was submitted for moderation.");
    } catch (requestError) { setReviewMessage(requestError.response?.data?.message || "Review submission failed."); }
    finally { setSubmitting(false); }
  };

  const favorite = async () => {
    try { await api.post(`/users/favorites/doctors/${doctor.id || doctor._id}`); setReviewMessage("Favorites updated."); }
    catch { setReviewMessage("Please sign in to save favorite doctors."); }
  };

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-sky-600" /></div>;
  if (error || !doctor) return <div className="mx-auto max-w-xl py-24 text-center"><h1 className="text-2xl font-bold">Doctor unavailable</h1><p className="mt-3 text-muted-foreground">{error}</p><Button asChild className="mt-6"><Link href="/doctors">Browse doctors</Link></Button></div>;

  const fields = doctor.specialization?.map((item) => item.field).filter(Boolean) || [];
  const education = doctor.education?.map((item) => item.degree).filter(Boolean) || [];
  const availableDays = [...new Set((doctor.chambers || []).map((item) => item.day))];

  return <main className="min-h-screen bg-sky-50/50 pb-16">
    <section className="bg-gradient-to-r from-sky-800 to-blue-700 px-4 py-12 text-white"><div className="mx-auto flex max-w-5xl flex-col items-center gap-6 md:flex-row"><Avatar className="h-36 w-36 border-4 border-white"><AvatarImage src={imageUrl(doctor.personalDetails?.profilePicture)} className="object-cover" /><AvatarFallback className="text-3xl text-sky-800">{nameOf(doctor).slice(0, 2)}</AvatarFallback></Avatar><div className="flex-1 text-center md:text-left"><h1 className="text-3xl font-bold md:text-4xl">{nameOf(doctor)}</h1><p className="mt-2 text-lg text-sky-100">{doctor.professional?.position || "Medical professional"}</p><div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">{fields.map((field) => <Badge key={field} className="bg-white/20">{field}</Badge>)}</div><div className="mt-5 flex flex-wrap justify-center gap-5 text-sm md:justify-start"><span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-300 text-yellow-300" /> {summary.averageRating || doctor.ratingAverage || 0} ({summary.reviewCount || doctor.reviewCount || 0})</span><span className="flex items-center gap-1"><Award className="h-4 w-4" /> {doctor.personalDetails?.totalExperience || 0}+ years</span><span className="flex items-center gap-1"><Users className="h-4 w-4" /> {doctor.totalPatients || 0} patients</span></div></div><div className="flex gap-2"><Button variant="secondary" onClick={favorite}><Heart className="mr-2 h-4 w-4" />Save</Button><Button asChild className="bg-emerald-500 hover:bg-emerald-600"><Link href={`/appointment?doctorId=${doctor.id || doctor._id}`}><CalendarDays className="mr-2 h-4 w-4" />Book now</Link></Button></div></div></section>
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6"><Card><CardHeader><CardTitle>About</CardTitle></CardHeader><CardContent className="space-y-5"><p className="leading-7 text-muted-foreground">{doctor.personalDetails?.about || "Detailed profile information will be available soon."}</p><div className="grid gap-4 sm:grid-cols-2"><p className="flex gap-2"><Stethoscope className="h-5 w-5 text-sky-600" />{doctor.services?.join(", ") || fields.join(", ") || "General consultation"}</p><p className="flex gap-2"><Languages className="h-5 w-5 text-sky-600" />{doctor.languages?.join(", ") || "Bangla"}</p><p className="flex gap-2"><Award className="h-5 w-5 text-sky-600" />{education.join(", ") || "Qualifications pending"}</p><p className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-sky-600" />{doctor.telemedicine ? "Video and in-person" : "In-person consultation"}</p></div></CardContent></Card>
      <Card><CardHeader><div className="flex flex-wrap items-center justify-between gap-3"><CardTitle>Patient reviews</CardTitle><div className="flex gap-2"><select className="rounded-md border bg-white px-2 py-1 text-sm" value={rating} onChange={(e) => setRating(e.target.value)}><option value="">All ratings</option>{[5,4,3,2,1].map((value) => <option key={value}>{value}</option>)}</select><select className="rounded-md border bg-white px-2 py-1 text-sm" value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Newest</option><option value="highest">Highest</option><option value="lowest">Lowest</option><option value="helpful">Most helpful</option></select></div></div></CardHeader><CardContent className="space-y-4">{reviews.length ? reviews.map((review) => <article key={review._id} className="rounded-lg border p-4"><div className="flex justify-between"><strong>{review.patientName}</strong><span className="text-amber-500">{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</span></div>{review.title && <h3 className="mt-2 font-medium">{review.title}</h3>}<p className="mt-2 text-sm text-muted-foreground">{review.comment}</p><p className="mt-2 text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()} · {review.helpfulCount || 0} helpful</p></article>) : <p className="text-muted-foreground">No approved reviews match this filter.</p>}</CardContent></Card>
      <Card><CardHeader><CardTitle>Share your experience</CardTitle></CardHeader><CardContent><form onSubmit={submitReview} className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label>Your name *</Label><Input value={reviewForm.patientName} onChange={(e) => setReviewForm({...reviewForm, patientName:e.target.value})} /></div><div className="space-y-2"><Label>Rating *</Label><select className="h-10 w-full rounded-md border bg-white px-3" value={reviewForm.rating} onChange={(e) => setReviewForm({...reviewForm, rating:e.target.value})}>{[5,4,3,2,1].map((value) => <option key={value} value={value}>{value} stars</option>)}</select></div><div className="space-y-2"><Label>Title</Label><Input value={reviewForm.title} onChange={(e) => setReviewForm({...reviewForm, title:e.target.value})} /></div><div className="space-y-2"><Label>Treatment type</Label><Input value={reviewForm.treatmentType} onChange={(e) => setReviewForm({...reviewForm, treatmentType:e.target.value})} /></div><div className="space-y-2 sm:col-span-2"><Label>Review * (at least 10 characters)</Label><Textarea required minLength={10} value={reviewForm.comment} onChange={(e) => setReviewForm({...reviewForm, comment:e.target.value})} /></div>{reviewMessage && <p className="sm:col-span-2 text-sm text-sky-700">{reviewMessage}</p>}<Button disabled={submitting} className="sm:col-span-2">{submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Submit review</Button></form></CardContent></Card></div>
      <aside className="space-y-6"><Card><CardHeader><CardTitle>Consultation</CardTitle></CardHeader><CardContent className="space-y-3"><p className="text-3xl font-bold text-sky-700">৳{doctor.professional?.consultationFee || "—"}</p><p className="text-sm text-muted-foreground">New patient fee: ৳{doctor.professional?.consultationFeeNew || doctor.professional?.consultationFee || "—"}</p><Button asChild className="w-full"><Link href={`/appointment?doctorId=${doctor.id || doctor._id}`}>Request appointment</Link></Button></CardContent></Card><Card><CardHeader><CardTitle>Chambers & schedule</CardTitle></CardHeader><CardContent className="space-y-4">{doctor.chambers?.length ? doctor.chambers.map((chamber) => <div key={chamber._id} className="border-b pb-3 last:border-0"><strong className="flex gap-2"><Building2 className="h-4 w-4 text-sky-600" />{chamber.chamberName}</strong><p className="mt-1 flex gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{chamber.day}: {chamber.from}–{chamber.to}</p>{chamber.address?.city && <p className="mt-1 flex gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{chamber.address.city}</p>}</div>) : <p className="text-sm text-muted-foreground">Contact the clinic for availability.</p>}<p className="text-xs text-muted-foreground">Available days: {availableDays.join(", ") || "To be confirmed"}</p></CardContent></Card></aside>
    </div>
  </main>;
}
