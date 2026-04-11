"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  Star,
  MapPin,
  Clock,
  CalendarIcon,
  MessageCircle,
  Award,
  Users,
  Languages,
  GraduationCap,
  Building2,
  CheckCircle,
  XCircle,
  ArrowUp,
  Stethoscope,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import api, { IMAGE_BASE_URL } from "@/lib/api";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function DoctorDetailPage({ params }) {
  const [selectedDate, setSelectedDate] = useState(undefined);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [reviewFilter, setReviewFilter] = useState("all");

  // Mock doctor data
  const doctor = {
    id: "1",
    name: "ডা. রাহুল সরকার",
    title: "সিনিয়র কনসালট্যান্ট",
    specialty: "হৃদরোগ বিশেষজ্ঞ",
    experience: "১৫ বছরের অভিজ্ঞতা",
    languages: ["বাংলা", "ইংরেজি", "হিন্দি"],
    qualifications: ["MBBS", "MD (Cardiology)", "FACC"],
    hospitals: ["সিটি নার্সিং হোম", "ডি আর ক্লিনিক", "সিলিগুড়ি মেডিকেল কলেজ"],
    totalPatients: "৫০০০+",
    rating: 4.8,
    reviewCount: 245,
    isAvailableToday: true,
    consultationFee: "৮০০",
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=400&width=400",
    bannerImage:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=300&width=800",
    bio: "ডা. রাহুল সরকার একজন অভিজ্ঞ হৃদরোগ বিশেষজ্ঞ যিনি গত ১৫ বছর ধরে সিলিগুড়ি ও আশেপাশের এলাকায় সেবা দিয়ে আসছেন। তিনি জটিল হৃদরোগের চিকিৎসায় বিশেষ দক্ষতা রাখেন এবং রোগীদের সাথে সহানুভূতিশীল আচরণের জন্য পরিচিত।",
  };

  // const weeklySchedule = [
  //   {
  //     day: "রবিবার",
  //     dayEn: "sunday",
  //     isToday: false,
  //     slots: [
  //       {
  //         time: "১০:০০ AM – ১২:০০ PM",
  //         chamber: "সিটি নার্সিং হোম",
  //         available: true,
  //       },
  //       {
  //         time: "৪:০০ PM – ৬:০০ PM",
  //         chamber: "ডি আর ক্লিনিক",
  //         available: true,
  //       },
  //     ],
  //   },
  //   {
  //     day: "সোমবার",
  //     dayEn: "monday",
  //     isToday: true,
  //     slots: [
  //       {
  //         time: "৯:০০ AM – ১১:০০ AM",
  //         chamber: "সিলিগুড়ি মেডিকেল কলেজ",
  //         available: true,
  //       },
  //       {
  //         time: "৫:০০ PM – ৭:০০ PM",
  //         chamber: "সিটি নার্সিং হোম",
  //         available: false,
  //       },
  //     ],
  //   },
  //   {
  //     day: "মঙ্গলবার",
  //     dayEn: "tuesday",
  //     isToday: false,
  //     slots: [
  //       {
  //         time: "১০:০০ AM – ১২:০০ PM",
  //         chamber: "ডি আর ক্লিনিক",
  //         available: true,
  //       },
  //     ],
  //   },
  //   {
  //     day: "বুধবার",
  //     dayEn: "wednesday",
  //     isToday: false,
  //     slots: [],
  //   },
  //   {
  //     day: "বৃহস্পতিবার",
  //     dayEn: "thursday",
  //     isToday: false,
  //     slots: [
  //       {
  //         time: "২:০০ PM – ৪:০০ PM",
  //         chamber: "সিটি নার্সিং হোম",
  //         available: true,
  //       },
  //       {
  //         time: "৬:০০ PM – ৮:০০ PM",
  //         chamber: "ডি আর ক্লিনিক",
  //         available: true,
  //       },
  //     ],
  //   },
  //   {
  //     day: "শুক্রবার",
  //     dayEn: "friday",
  //     isToday: false,
  //     slots: [
  //       {
  //         time: "১১:০০ AM – ১:০০ PM",
  //         chamber: "সিলিগুড়ি মেডিকেল কলেজ",
  //         available: true,
  //       },
  //     ],
  //   },
  //   {
  //     day: "শনিবার",
  //     dayEn: "saturday",
  //     isToday: false,
  //     slots: [],
  //   },
  // ];

  const reviews = [
    {
      id: 1,
      patientName: "রমেশ চন্দ্র দাস",
      rating: 5,
      date: "১৫ নভেম্বর, ২০২৪",
      comment:
        "ডাক্তার খুবই আন্তরিক ও সময়মতো দেখেছেন। হৃদরোগের সমস্যার জন্য খুব ভালো পরামর্শ দিয়েছেন।",
      verified: true,
    },
    {
      id: 2,
      patientName: "সুমিত্রা রায়",
      rating: 5,
      date: "১০ নভেম্বর, ২০২৪",
      comment:
        "অসাধারণ চিকিৎসক। ধৈর্য সহকারে সব কিছু বুঝিয়ে বলেছেন। অবশ্যই সুপারিশ করব।",
      verified: true,
    },
    {
      id: 3,
      patientName: "অনিল কুমার",
      rating: 4,
      date: "৫ নভেম্বর, ২০২৪",
      comment:
        "ভালো ডাক্তার, তবে অপেক্ষার সময় একটু বেশি ছিল। চিকিৎসা ভালো হয়েছে।",
      verified: true,
    },
    {
      id: 4,
      patientName: "প্রিয়া শর্মা",
      rating: 5,
      date: "১ নভেম্বর, ২০২৪",
      comment:
        "বাবার হার্টের সমস্যার জন্য দেখিয়েছিলাম। খুব যত্নসহকারে চিকিৎসা করেছেন।",
      verified: true,
    },
  ];

  const relatedDoctors = [
    {
      id: "2",
      name: "ডা. প্রিয়া মুখার্জি",
      specialty: "হৃদরোগ বিশেষজ্ঞ",
      rating: 4.7,
      experience: "১২ বছর",
      image:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    },
    {
      id: "3",
      name: "ডা. সুব্রত দাস",
      specialty: "হৃদরোগ বিশেষজ্ঞ",
      rating: 4.6,
      experience: "১৮ বছর",
      image:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    },
    {
      id: "4",
      name: "ডা. অনিতা রায়",
      specialty: "হৃদরোগ বিশেষজ্ঞ",
      rating: 4.9,
      experience: "২০ বছর",
      image:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    },
  ];

  const faqs = [
    {
      question: "ডা. রাহুল কি অনলাইন অ্যাপয়েন্টমেন্ট নেন?",
      answer:
        "হ্যাঁ, ডা. রাহুল সরকার অনলাইন অ্যাপয়েন্টমেন্ট গ্রহণ করেন। আপনি আমাদের প্ল্যাটফর্মের মাধ্যমে সহজেই অ্যাপয়েন্টমেন্ট বুক করতে পারেন।",
    },
    {
      question: "পরামর্শের ফি কত?",
      answer:
        "ডা. রাহুল সরকারের পরামর্শের ফি ৮০০ টাকা। এই ফি চেম্বার ভেদে সামান্য ভিন্ন হতে পারে।",
    },
    {
      question: "অ্যাপয়েন্টমেন্ট বাতিল করলে কী হবে?",
      answer:
        "অ্যাপয়েন্টমেন্টের ২৪ ঘন্টা আগে বাতিল করলে সম্পূর্ণ ফি ফেরত পাবেন। এর পরে বাতিল করলে ৫০% ফি কাটা যাবে।",
    },
    {
      question: "জরুরি ক্ষেত্রে কীভাবে যোগাযোগ করব?",
      answer:
        "জরুরি ক্ষেত্রে সরাসরি হাসপাতালে যোগাযোগ করুন অথবা আমাদের ২৪/৭ হটলাইনে কল করুন।",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredReviews =
    reviewFilter === "all"
      ? reviews
      : reviews.filter(
          (review) => review.rating === Number.parseInt(reviewFilter),
        );

  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const { slug } = use(params);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/doctor/${slug}`);
        console.log(data, "Data");
        setCurrentDoctor(data); // paginated data
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [slug]);

  console.log(currentDoctor);

  // Transform chambers into weekly schedule
  const getWeeklySchedule = (chambers) => {
    const daysOfWeek = [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];
    const todayIndex = new Date().getDay(); // Sunday = 0
    return daysOfWeek.map((day, index) => {
      const dayChambers = chambers.filter(
        (c) => c.day.toLowerCase() === day.toLowerCase(),
      );
      return {
        day,
        isToday: index === todayIndex,
        slots: dayChambers.map((c) => ({
          time: `${c.from} - ${c.to}`,
          chamber: c.chamberName,
          available: true, // you can extend with real availability if you have it
        })),
      };
    });
  };

  const weeklySchedule = getWeeklySchedule(currentDoctor?.chambers || []);

  const formatTimeRange = (timeRange) => {
    try {
      if (!timeRange || typeof timeRange !== "string") return "Invalid time";

      const parts = timeRange.split(" - ");
      if (parts.length !== 2) return "Invalid time";

      const [start, end] = parts;

      const formatTime = (time) => {
        const [hour, minute] = time.split(":");

        if (
          hour === undefined ||
          minute === undefined ||
          isNaN(hour) ||
          isNaN(minute)
        ) {
          throw new Error("Invalid time format");
        }

        const date = new Date();
        date.setHours(Number(hour), Number(minute));

        return date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      };

      return `${formatTime(start)} - ${formatTime(end)}`;
    } catch (error) {
      console.error("Time format error:", error);
      return "Invalid time";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 font-hind-siliguri">
      {/* Breadcrumb Navigation */}
      <motion.div
        className="bg-white border-b border-sky-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              হোম
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/doctors"
              className="hover:text-sky-600 transition-colors"
            >
              ডাক্তার
            </Link>
            <ChevronRight className="w-4 h-4" />
            {/**  <span className="text-sky-800 font-medium">{doctor.name}</span>*/}
            <span className="text-sky-800 font-medium">
              {currentDoctor?.personalDetails?.firstName}{" "}
              {currentDoctor?.personalDetails?.lastName}
            </span>
          </nav>
        </div>
      </motion.div>

      {/* Hero Banner */}
      <motion.section
        className="relative h-64 md:h-80 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={`${IMAGE_BASE_URL}${currentDoctor?.personalDetails?.profilePicture}`}
          alt="Doctor Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/70 to-blue-800/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              {/* {doctor.name} */}
              {currentDoctor?.personalDetails?.firstName}{" "}
              {currentDoctor?.personalDetails?.lastName}
            </h1>
            <p className="text-xl md:text-2xl text-sky-100">
              {/* {doctor.specialty} */}
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <motion.div
                className="flex flex-col md:flex-row gap-6"
                variants={fadeInUp}
              >
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  <Avatar className="w-32 h-32 border-4 border-sky-100 flex items-center justify-center">
                    <AvatarImage
                      className="object-cover w-full h-full"
                      src={`${IMAGE_BASE_URL}${currentDoctor?.personalDetails?.profilePicture}`}
                      alt={doctor.name}
                    />
                    <AvatarFallback className="bg-sky-100 text-sky-700 text-2xl flex items-center justify-center text-center px-2">
                      {currentDoctor?.personalDetails?.firstName}{" "}
                      {currentDoctor?.personalDetails?.lastName}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mb-1">
                      {/* {doctor.name} */}
                      {currentDoctor?.personalDetails?.firstName}{" "}
                      {currentDoctor?.personalDetails?.lastName}
                    </h2>
                    {/* Degree */}
                    <p className="text-md text-sky-700 font-medium">
                      {currentDoctor?.education &&
                        currentDoctor.education.length > 0 &&
                        currentDoctor.education
                          .map((it) => it?.degree)
                          .join(", ")}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {currentDoctor?.specialization?.map((it, index) => (
                        <span
                          key={index}
                          className="text-sm font-medium text-sky-800 bg-sky-100 px-3 py-1 rounded-full"
                        >
                          {it?.field}
                        </span>
                      ))}
                    </div>
                    {/* <p className="text-lg text-sky-700 mb-2">{doctor.title}</p> */}
                    {/* <p className="text-xl font-semibold text-sky-800">
                      {currentDoctor?.specialization &&
                        currentDoctor?.specialization.length > 0 &&
                        currentDoctor.specialization
                          .map((it) => it?.field)
                          .join(", ")}
                    </p> */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-sky-600" />
                      <span className="text-sky-700">
                        {currentDoctor?.personalDetails?.totalExperience} বছরের
                        অভিজ্ঞতা
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-sky-600" />
                      <span className="text-sky-700">
                        মোট রোগী: {doctor.totalPatients}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4 text-sky-600" />
                      <span className="text-sky-700">ভাষা: বাংলা, ইংরেজি</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-sky-600" />
                      <span className="text-sky-700">
                        {/* যোগ্যতা: {doctor.qualifications.join(", ")} */}
                        {currentDoctor?.education &&
                          currentDoctor?.education.length > 0 &&
                          currentDoctor.education
                            .map((it) => it?.degree)
                            .join(", ")}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-sky-600" />
                      <span className="text-sm text-sky-700 font-medium">
                        যুক্ত হাসপাতালসমূহ:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentDoctor?.experience &&
                        currentDoctor?.experience.length > 0 &&
                        currentDoctor.experience.map((it, index) => {
                          return (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-sky-100 text-sky-700"
                            >
                              {it?.hospitalName}
                            </Badge>
                          );
                        })}

                      {/* {doctor.hospitals.map((hospital, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-sky-100 text-sky-700"
                        >
                          {hospital}
                        </Badge>
                      ))} */}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(5)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sky-800 font-semibold">
                        {doctor.rating}
                      </span>
                      <span className="text-sky-600 text-sm">(5 রিভিউ)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {doctor.isAvailableToday ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-green-600 font-medium">
                            আজ পাওয়া যাচ্ছে
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-red-600 font-medium">
                            আজ অনুপলব্ধ
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={"https://wa.me/8801955787578"}>
                      <Button
                        size="lg"
                        className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-8"
                      >
                        <CalendarIcon className="w-5 h-5 mr-2" />
                        অ্যাপয়েন্টমেন্ট নিন
                      </Button>
                    </Link>

                    <Link href={"https://wa.me/8801955787578"}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-sky-200 text-sky-700 hover:bg-sky-50 rounded-full px-8 bg-transparent"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        মেসেজ করুন
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-sky-900 flex items-center gap-2">
                <CalendarIcon className="w-6 h-6" />
                চিকিৎসার সময়সূচি
              </CardTitle>
              <CardDescription className="text-sky-600">
                সাপ্তাহিক চেম্বার ও সময়সূচি
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {weeklySchedule.map((schedule, index) => (
                <motion.div
                  key={schedule.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`border ${
                      schedule.isToday
                        ? "border-sky-300 bg-sky-50"
                        : "border-sky-100"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3
                          className={`font-semibold ${
                            schedule.isToday ? "text-sky-800" : "text-sky-700"
                          }`}
                        >
                          {schedule.day}
                          {schedule.isToday && (
                            <Badge className="ml-2 bg-sky-500 text-white">
                              আজ
                            </Badge>
                          )}
                        </h3>
                      </div>

                      {schedule.slots.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">
                          <XCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <span>বন্ধ</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {schedule.slots.map((slot, slotIndex) => (
                            <div
                              key={slotIndex}
                              className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border ${
                                slot.available
                                  ? "border-green-200 bg-green-50"
                                  : "border-red-200 bg-red-50"
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-sky-600" />
                                  {/* <span className="font-medium text-sky-800">
                                    {slot.time}
                                  </span> */}
                                  <span className="font-medium text-sky-800">
                                    {formatTimeRange(slot.time)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-sky-600" />
                                  <span className="text-sm text-sky-600">
                                    {slot.chamber}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-2 sm:mt-0">
                                {slot.available ? (
                                  <Badge className="bg-green-500 text-white">
                                    উপলব্ধ
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="secondary"
                                    className="bg-red-100 text-red-700"
                                  >
                                    বুক হয়ে গেছে
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Appointment Booking */}
        {/* <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-sky-900">
                অ্যাপয়েন্টমেন্ট বুক করুন
              </CardTitle>
              <CardDescription className="text-sky-600">
                সহজ ৪টি ধাপে অ্যাপয়েন্টমেন্ট নিন
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="date" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="date">১. দিন নির্বাচন</TabsTrigger>
                  <TabsTrigger value="time">২. সময় নির্বাচন</TabsTrigger>
                  <TabsTrigger value="details">৩. তথ্য দিন</TabsTrigger>
                  <TabsTrigger value="confirm">৪. নিশ্চিত করুন</TabsTrigger>
                </TabsList>

                <TabsContent value="date" className="space-y-4">
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border border-sky-200"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="time" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {weeklySchedule
                      .find((s) => s.isToday)
                      ?.slots.filter((slot) => slot.available)
                      .map((slot, index) => (
                        <Card
                          key={index}
                          className={`cursor-pointer transition-all ${
                            selectedTimeSlot === slot.time
                              ? "border-sky-500 bg-sky-50"
                              : "border-sky-200 hover:border-sky-300"
                          }`}
                          onClick={() => setSelectedTimeSlot(slot.time)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-sky-600" />
                              <span className="font-medium">{slot.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-sky-600" />
                              <span className="text-sm text-sky-600">
                                {slot.chamber}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientName">রোগীর নাম *</Label>
                      <Input
                        id="patientName"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="পূর্ণ নাম লিখুন"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientPhone">মোবাইল নম্বর *</Label>
                      <Input
                        id="patientPhone"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="০১৭xxxxxxxx"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="symptoms">সমস্যার বিবরণ (ঐচ্ছিক)</Label>
                    <Textarea
                      id="symptoms"
                      placeholder="আপনার সমস্যার সংক্ষিপ্ত বিবরণ লিখুন"
                      className="mt-1"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="confirm" className="space-y-4">
                  <Card className="border-sky-200 bg-sky-50">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sky-900 mb-3">
                        অ্যাপয়েন্টমেন্টের বিবরণ
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>ডাক্তার:</span>
                          <span className="font-medium">{doctor.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>তারিখ:</span>
                          <span className="font-medium">
                            {selectedDate?.toLocaleDateString("bn-BD")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>সময়:</span>
                          <span className="font-medium">
                            {selectedTimeSlot}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>রোগীর নাম:</span>
                          <span className="font-medium">{patientName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ফোন:</span>
                          <span className="font-medium">{patientPhone}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 mt-2">
                          <span>পরামর্শ ফি:</span>
                          <span className="font-bold text-sky-800">
                            ৳{doctor.consultationFee}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full py-3">
                        অ্যাপয়েন্টমেন্ট নিশ্চিত করুন
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-center text-green-600">
                          <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                          সফল!
                        </DialogTitle>
                        <DialogDescription className="text-center">
                          আপনার অ্যাপয়েন্টমেন্ট সফলভাবে বুক হয়েছে। শীঘ্রই আমরা
                          আপনার সাথে যোগাযোগ করব।
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div> */}

        {/* Doctor Bio */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-sky-900 flex items-center gap-2">
                <User className="w-6 h-6" />
                ডাক্তারের পরিচিতি
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sky-700 leading-relaxed mb-4">
                {currentDoctor?.personalDetails?.about}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-sky-100 text-sky-700">
                  🚹 পুরুষ চিকিৎসক
                </Badge>
                <Badge className="bg-sky-100 text-sky-700">
                  💬 বাংলা ভাষাভাষী
                </Badge>
                <Badge className="bg-sky-100 text-sky-700">
                  ⭐ অভিজ্ঞ বিশেষজ্ঞ
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Patient Reviews - Updated */}
        {/* <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-2xl font-bold text-sky-900 flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  রোগীদের মতামত ({reviews.length})
                </CardTitle>
                <Link href={`/doctor/${doctor.id}/reviews`}>
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-full">
                    সব রিভিউ দেখুন
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4"> */}
        {/* Show only first 2 reviews as preview */}
        {/* {reviews.slice(0, 2).map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-sky-100">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-sky-100 text-sky-700">
                            {review.patientName.split(" ")[0][0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-sky-900">
                                {review.patientName}
                              </h4>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                {review.verified && (
                                  <Badge className="bg-green-100 text-green-700 text-xs">
                                    যাচাইকৃত
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-sky-600">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-sky-700 italic line-clamp-2">
                            "{review.comment}"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <div className="text-center pt-4">
                <Link href={`/doctor/${doctor.id}/reviews`}>
                  <Button
                    variant="outline"
                    className="border-sky-200 text-sky-700 hover:bg-sky-50 bg-transparent rounded-full"
                  >
                    আরও রিভিউ দেখুন ({reviews.length - 2}টি)
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div> */}

        {/* FAQ Section */}
        {/* <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-sky-900">
                প্রায়শই জিজ্ঞাসিত প্রশ্ন
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-sky-200"
                  >
                    <AccordionTrigger className="text-sky-800 hover:text-sky-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sky-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div> */}

        {/* Related Doctors */}
        {/* <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-sky-900 flex items-center gap-2">
                <Stethoscope className="w-6 h-6" />
                অন্যান্য {doctor.specialty}
              </CardTitle>
              <CardDescription className="text-sky-600">
                একই বিভাগের আরও ডাক্তার
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {relatedDoctors.map((relatedDoctor) => (
                    <CarouselItem
                      key={relatedDoctor.id}
                      className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <Card className="border-sky-100 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-4 text-center">
                          <Avatar className="w-20 h-20 mx-auto mb-3">
                            <AvatarImage
                              src={
                                relatedDoctor.image ||
                                "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                              }
                              alt={relatedDoctor.name}
                            />
                            <AvatarFallback className="bg-sky-100 text-sky-700">
                              {relatedDoctor.name.split(" ")[1]?.[0] || "ড"}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold text-sky-900 mb-1">
                            {relatedDoctor.name}
                          </h3>
                          <p className="text-sm text-sky-600 mb-2">
                            {relatedDoctor.specialty}
                          </p>
                          <p className="text-xs text-sky-500 mb-2">
                            {relatedDoctor.experience} অভিজ্ঞতা
                          </p>
                          <div className="flex items-center justify-center gap-1 mb-3">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-sky-700">
                              {relatedDoctor.rating}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full"
                          >
                            প্রোফাইল দেখুন
                          </Button>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-sky-600" />
                <CarouselNext className="text-sky-600" />
              </Carousel>
            </CardContent>
          </Card>
        </motion.div> */}
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full shadow-lg z-50"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
