import { redirect } from "next/navigation";

export default async function DoctorReviewsPage({ params }) {
  const { slug } = await params;
  redirect(`/doctor/${slug}#reviews`);
}
