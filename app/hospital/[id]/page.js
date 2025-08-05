"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChevronRight,
  Star,
  MapPin,
  Phone,
  Clock,
  Shield,
  Building2,
  Heart,
  Brain,
  Baby,
  Eye,
  Stethoscope,
  Users,
  Calendar,
  Ambulance,
  Award,
  CreditCard,
  Filter,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export default function HospitalProfilePage() {
  const [reviewFilter, setReviewFilter] = useState("all");

  // Mock hospital data
  const hospital = {
    id: "1",
    name: "সিটি নার্সিং হোম",
    logo: "/placeholder.svg?height=120&width=120",
    bannerImage: "/placeholder.svg?height=300&width=800",
    address: "হিল কার্ট রোড, শিলিগুড়ি, পশ্চিমবঙ্গ ৭৩৪০০১",
    phone: "৯৮৩২৯০১২৩৪",
    emergencyPhone: "৯৮৩০০০০০০০",
    ambulancePhone: "৯৮১৮৮৮৮৮৮৮",
    rating: 4.5,
    reviewCount: 132,
    is24Hours: true,
    established: "১৯৮৫",
    bedCount: 150,
    overview:
      "সিটি নার্সিং হোম ১৯৮৫ সাল থেকে শিলিগুড়ি ও উত্তরবঙ্গের মানুষের সেবায় নিয়োজিত। আমাদের অভিজ্ঞ চিকিৎসক দল এবং আধুনিক চিকিৎসা সরঞ্জাম দিয়ে আমরা সর্বোচ্চ মানের স্বাস্থ্যসেবা প্রদান করি।",
    accreditations: ["NABH", "ISO 9001:2015", "NABL"],
    departments: [
      {
        name: "হৃদরোগ বিভাগ",
        icon: Heart,
        services: [
          "ইকোকার্ডিওগ্রাম",
          "এনজিওগ্রাম",
          "পেসমেকার",
          "হার্ট সার্জারি",
        ],
        doctors: 5,
      },
      {
        name: "নিউরোলজি বিভাগ",
        icon: Brain,
        services: ["MRI", "CT Scan", "EEG", "নিউরো সার্জারি"],
        doctors: 3,
      },
      {
        name: "শিশু বিভাগ",
        icon: Baby,
        services: [
          "NICU",
          "শিশু টিকাদান",
          "বৃদ্ধি পর্যবেক্ষণ",
          "শিশু সার্জারি",
        ],
        doctors: 4,
      },
      {
        name: "চোখের বিভাগ",
        icon: Eye,
        services: [
          "ছানি অপারেশন",
          "রেটিনা চিকিৎসা",
          "গ্লুকোমা",
          "লেজার সার্জারি",
        ],
        doctors: 2,
      },
    ],
    facilities: [
      {
        name: "ICU",
        icon: Heart,
        description: "২৪ ঘণ্টা নিবিড় পরিচর্যা কেন্দ্র",
      },
      { name: "OT", icon: Stethoscope, description: "আধুনিক অপারেশন থিয়েটার" },
      { name: "MRI", icon: Brain, description: "উচ্চ রেজোলিউশন MRI স্ক্যান" },
      { name: "CT Scan", icon: Eye, description: "দ্রুত CT স্ক্যান সুবিধা" },
      {
        name: "Dialysis",
        icon: Heart,
        description: "কিডনি ডায়ালাইসিস সেন্টার",
      },
      { name: "Pharmacy", icon: Shield, description: "২৪ ঘণ্টা ফার্মেসি সেবা" },
    ],
    visitingHours: [
      { day: "রবিবার", hours: "৯:০০ AM - ১:০০ PM, ৪:০০ PM - ৮:০০ PM" },
      { day: "সোমবার", hours: "৯:০০ AM - ১:০০ PM, ৪:০০ PM - ৮:০০ PM" },
      { day: "মঙ্গলবার", hours: "৯:০০ AM - ১:০০ PM, ৪:০০ PM - ৮:০০ PM" },
      { day: "বুধবার", hours: "৯:০০ AM - ১:০০ PM, ৪:০০ PM - ৮:০০ PM" },
      { day: "বৃহস্পতিবার", hours: "৯:০০ AM - ১:০০ PM, ৪:০০ PM - ৮:০০ PM" },
      { day: "শুক্রবার", hours: "৯:০০ AM - ১:০০ PM, ৪:০০ PM - ৮:০০ PM" },
      { day: "শনিবার", hours: "৯:০০ AM - ১:০০ PM" },
    ],
    insurance: [
      "LIC",
      "Star Health",
      "MediAssist",
      "ICICI Lombard",
      "Bajaj Allianz",
    ],
    doctors: [
      {
        id: "1",
        name: "ডা. রাহুল সরকার",
        specialty: "হৃদরোগ বিশেষজ্ঞ",
        experience: "১৫ বছর",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "2",
        name: "ডা. প্রিয়া মুখার্জি",
        specialty: "নিউরোলজি বিশেষজ্ঞ",
        experience: "১২ বছর",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "3",
        name: "ডা. অনিতা রায়",
        specialty: "শিশু বিশেষজ্ঞ",
        experience: "২০ বছর",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    reviews: [
      {
        id: 1,
        patientName: "রমেশ চন্দ্র দাস",
        rating: 5,
        date: "১৫ নভেম্বর, ২০২৪",
        comment:
          "খুবই ভালো হাসপাতাল। চিকিৎসকরা অভিজ্ঞ এবং স্টাফরা সহায়ক। পরিষ্কার-পরিচ্ছন্নতা চমৎকার।",
        verified: true,
      },
      {
        id: 2,
        patientName: "সুমিত্রা রায়",
        rating: 4,
        date: "১০ নভেম্বর, ২০২৪",
        comment: "ভালো চিকিৎসা পেয়েছি। তবে অপেক্ষার সময় একটু বেশি ছিল।",
        verified: true,
      },
      {
        id: 3,
        patientName: "অনিল কুমার",
        rating: 5,
        date: "৫ নভেম্বর, ২০২৪",
        comment:
          "জরুরি অবস্থায় দ্রুত সেবা পেয়েছি। ধন্যবাদ সিটি নার্সিং হোমকে।",
        verified: true,
      },
    ],
  };

  const filteredReviews =
    reviewFilter === "all"
      ? hospital.reviews
      : hospital.reviews.filter(
          (review) => review.rating === Number.parseInt(reviewFilter)
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 font-hind-siliguri">
      {/* Breadcrumb Navigation */}
      <motion.div
        className="bg-white border-b border-sky-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              হোম
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/hospitals"
              className="hover:text-sky-600 transition-colors"
            >
              হাসপাতাল
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-sky-800 font-medium">{hospital.name}</span>
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
        <Image
          src={hospital.bannerImage || "/placeholder.svg"}
          alt="Hospital Banner"
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
              {hospital.name}
            </h1>
            <p className="text-xl md:text-2xl text-sky-100">
              বিশ্বস্ত স্বাস্থ্যসেবা প্রদানকারী
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
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
                <div className="flex-shrink-0 text-center md:text-left">
                  <Avatar className="w-32 h-32 mx-auto md:mx-0 border-4 border-sky-100">
                    <AvatarImage
                      src={hospital.logo || "/placeholder.svg"}
                      alt={hospital.name}
                    />
                    <AvatarFallback className="bg-sky-100 text-sky-700 text-2xl">
                      <Building2 className="w-16 h-16" />
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mb-2">
                      {hospital.name}
                    </h2>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(hospital.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sky-800 font-semibold">
                        {hospital.rating}
                      </span>
                      <span className="text-sky-600 text-sm">
                        ({hospital.reviewCount} রিভিউ)
                      </span>
                    </div>
                    {hospital.is24Hours && (
                      <Badge className="bg-green-100 text-green-700 mb-2">
                        ২ৄ ঘণ্টা খোলা
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sky-600" />
                      <span className="text-sky-700">{hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-sky-600" />
                      <span className="text-sky-700">{hospital.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-sky-600" />
                      <span className="text-sky-700">
                        {hospital.bedCount} শয্যা
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-sky-600" />
                      <span className="text-sky-700">
                        প্রতিষ্ঠিত {hospital.established}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hospital.accreditations.map((accreditation, index) => (
                      <Badge key={index} className="bg-sky-100 text-sky-700">
                        <Award className="w-3 h-3 mr-1" />
                        {accreditation}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      size="lg"
                      className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-8"
                      onClick={() =>
                        window.open(`tel:${hospital.phone}`, "_self")
                      }
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      যোগাযোগ করুন
                    </Button>
                    <Button
                      size="lg"
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8"
                      onClick={() =>
                        window.open(`tel:${hospital.ambulancePhone}`, "_self")
                      }
                    >
                      <Ambulance className="w-5 h-5 mr-2" />
                      অ্যাম্বুলেন্স কল করুন
                    </Button>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Overview Section */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-sky-900">
                হাসপাতাল পরিচিতি
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sky-700 leading-relaxed">
                {hospital.overview}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Departments Section */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-sky-900">
                বিভাগসমূহ
              </CardTitle>
              <CardDescription className="text-sky-600">
                আমাদের বিশেষজ্ঞ বিভাগ ও সেবা
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {hospital.departments.map((department, index) => (
                  <AccordionItem
                    key={index}
                    value={`dept-${index}`}
                    className="border-sky-200"
                  >
                    <AccordionTrigger className="text-sky-800 hover:text-sky-600">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                          <department.icon className="w-5 h-5 text-sky-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{department.name}</div>
                          <div className="text-sm text-sky-600">
                            {department.doctors}জন ডাক্তার
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sky-700">
                      <div className="ml-13 space-y-2">
                        <p className="font-medium">উপলব্ধ সেবা:</p>
                        <div className="flex flex-wrap gap-2">
                          {department.services.map((service, serviceIndex) => (
                            <Badge
                              key={serviceIndex}
                              variant="secondary"
                              className="bg-sky-100 text-sky-700"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Doctors Section */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-sky-900">
                আমাদের ডাক্তারগণ
              </CardTitle>
              <CardDescription className="text-sky-600">
                এই হাসপাতালের অভিজ্ঞ চিকিৎসকবৃন্দ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospital.doctors.map((doctor, index) => (
                  <Card
                    key={doctor.id}
                    className="border-sky-100 hover:shadow-md transition-all duration-300"
                  >
                    <CardContent className="p-4 text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-3">
                        <AvatarImage
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                        />
                        <AvatarFallback className="bg-sky-100 text-sky-700">
                          {doctor.name.split(" ")[1]?.[0] || "ড"}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-sky-900 mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-sky-600 mb-2">
                        {doctor.specialty}
                      </p>
                      <p className="text-xs text-sky-500 mb-3">
                        {doctor.experience} অভিজ্ঞতা
                      </p>
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full"
                      >
                        <Link href={`/doctor/${doctor.id}`}>
                          <Calendar className="w-4 h-4 mr-2" />
                          অ্যাপয়েন্টমেন্ট নিন
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Facilities & Services */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-sky-900">
                সুবিধাসমূহ
              </CardTitle>
              <CardDescription className="text-sky-600">
                আধুনিক চিকিৎসা সুবিধা ও যন্ত্রপাতি
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospital.facilities.map((facility, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Card className="border-sky-100 hover:shadow-md transition-all duration-300 cursor-pointer">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <facility.icon className="w-6 h-6 text-sky-600" />
                          </div>
                          <h3 className="font-semibold text-sky-900 mb-1">
                            {facility.name}
                          </h3>
                          <p className="text-xs text-sky-600">
                            {facility.description}
                          </p>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <facility.icon className="w-5 h-5 text-sky-600" />
                          {facility.name}
                        </DialogTitle>
                        <DialogDescription>
                          {facility.description}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Visiting Hours & Insurance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visiting Hours */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-sky-900 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  দেখার সময়
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {hospital.visitingHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-sky-100 last:border-b-0"
                  >
                    <span className="font-medium text-sky-800">
                      {schedule.day}
                    </span>
                    <span className="text-sky-600 text-sm">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Insurance & Payment */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-sky-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  ইন্স্যুরেন্স ও পেমেন্ট
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-sky-800 mb-2">
                      গ্রহণযোগ্য ইন্স্যুরেন্স:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {hospital.insurance.map((ins, index) => (
                        <Badge
                          key={index}
                          className="bg-green-100 text-green-700"
                        >
                          <Shield className="w-3 h-3 mr-1" />
                          {ins}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sky-800 mb-2">
                      পেমেন্ট পদ্ধতি:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="border-sky-200 text-sky-700"
                      >
                        নগদ
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-sky-200 text-sky-700"
                      >
                        কার্ড
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-sky-200 text-sky-700"
                      >
                        UPI
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Emergency Section */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-pink-50">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-red-600 mb-4 flex items-center justify-center gap-2">
                  <Phone className="w-6 h-6" />
                  জরুরি যোগাযোগ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <Button
                    size="lg"
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full"
                    onClick={() =>
                      window.open(`tel:${hospital.emergencyPhone}`, "_self")
                    }
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    জরুরি নম্বর: {hospital.emergencyPhone}
                  </Button>
                  <Button
                    size="lg"
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full"
                    onClick={() =>
                      window.open(`tel:${hospital.ambulancePhone}`, "_self")
                    }
                  >
                    <Ambulance className="w-5 h-5 mr-2" />
                    অ্যাম্বুলেন্স: {hospital.ambulancePhone}
                  </Button>
                </div>
                <p className="text-red-500 mt-4 text-sm">
                  ২৪/৭ জরুরি পরিষেবা • গড় সময়: ১৫ মিনিট
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reviews Section */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-2xl font-bold text-sky-900 flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  রোগীদের মতামত ({hospital.reviews.length})
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-sky-600" />
                  <select
                    value={reviewFilter}
                    onChange={(e) => setReviewFilter(e.target.value)}
                    className="border border-sky-200 rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="all">সব রিভিউ</option>
                    <option value="5">৫ তারকা</option>
                    <option value="4">৪ তারকা</option>
                    <option value="3">৩ তারকা</option>
                    <option value="2">২ তারকা</option>
                    <option value="1">১ তারকা</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredReviews.map((review, index) => (
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
                          <p className="text-sky-700 italic">
                            "{review.comment}"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  className="border-sky-200 text-sky-700 hover:bg-sky-50 bg-transparent"
                >
                  রিভিউ লিখুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
