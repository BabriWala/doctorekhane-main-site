"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Search,
  Phone,
  Mail,
  MapPin,
  Star,
  Users,
  Building2,
  Heart,
  Bone,
  Baby,
  Brain,
  Stethoscope,
  Ambulance,
  Calendar,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ChevronRight,
  Shield,
  Activity,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";

export default function BengaliHealthcarePlatform() {
  const [searchType, setSearchType] = useState("doctor");

  const specialties = [
    { name: "হৃদরোগ বিশেষজ্ঞ", icon: Heart, count: "২৫+ ডাক্তার" },
    { name: "হাড় বিশেষজ্ঞ", icon: Bone, count: "২০+ ডাক্তার" },
    { name: "শিশু বিশেষজ্ঞ", icon: Baby, count: "১৮+ ডাক্তার" },
    { name: "মানসিক স্বাস্থ্য", icon: Brain, count: "১৫+ ডাক্তার" },
  ];

  const doctors = [
    {
      name: "ডাঃ রাজেশ কুমার",
      specialty: "হৃদরোগ বিশেষজ্ঞ",
      experience: "১৫ বছর অভিজ্ঞতা",
      rating: 4.8,
      hospital: "সিলিগুড়ি মেডিকেল কলেজ",
      image:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    },
    {
      name: "ডাঃ প্রিয়া শর্মা",
      specialty: "শিশু বিশেষজ্ঞ",
      experience: "১২ বছর অভিজ্ঞতা",
      rating: 4.9,
      hospital: "নর্থ বেঙ্গল মেডিকেল কলেজ",
      image:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    },
    {
      name: "ডাঃ অমিত দাস",
      specialty: "হাড় বিশেষজ্ঞ",
      experience: "২০ বছর অভিজ্ঞতা",
      rating: 4.7,
      hospital: "সিলিগুড়ি ডিস্ট্রিক্ট হাসপাতাল",
      image:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    },
  ];

  const hospitals = [
    {
      name: "সিলিগুড়ি মেডিকেল কলেজ ও হাসপাতাল",
      address: "বার্ডমোর, সিলিগুড়ি",
      departments: ["জরুরি", "হৃদরোগ", "নিউরো", "অর্থোপেডিক"],
      image:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=200&width=300",
    },
    {
      name: "নর্থ বেঙ্গল মেডিকেল কলেজ",
      address: "সুশ্রুত নগর, সিলিগুড়ি",
      departments: ["শিশু", "স্ত্রীরোগ", "সার্জারি", "মেডিসিন"],
      image:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=200&width=300",
    },
  ];

  const testimonials = [
    {
      name: "রমেশ চন্দ্র রায়",
      review: "খুবই ভালো সেবা পেয়েছি। ডাক্তার খুব যত্নসহকারে চিকিৎসা করেছেন।",
      rating: 5,
      avatar:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
    },
    {
      name: "সুমিত্রা দেবী",
      review: "অনলাইনে অ্যাপয়েন্টমেন্ট নেওয়া খুবই সহজ হয়েছে। ধন্যবাদ।",
      rating: 5,
      avatar:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
    },
    {
      name: "অনিল কুমার",
      review: "জরুরি সময়ে দ্রুত অ্যাম্বুলেন্স পেয়েছি। চমৎকার সেবা।",
      rating: 5,
      avatar:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
    },
  ];

  const blogPosts = [
    {
      title: "গ্রীষ্মকালে স্বাস্থ্য সুরক্ষার উপায়",
      excerpt:
        "গরমকালে কীভাবে নিজেকে সুস্থ রাখবেন এবং হিট স্ট্রোক থেকে বাঁচবেন।",
      image:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=200&width=300",
      date: "১৫ মে, ২০২৪",
    },
    {
      title: "শিশুদের পুষ্টি ও যত্ন",
      excerpt:
        "বাড়ন্ত শিশুদের সঠিক পুষ্টি এবং স্বাস্থ্য যত্নের গুরুত্বপূর্ণ তথ্য।",
      image:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=200&width=300",
      date: "১০ মে, ২০২৪",
    },
    {
      title: "হৃদরোগ প্রতিরোধের উপায়",
      excerpt: "জীবনযাত্রার পরিবর্তনের মাধ্যমে হৃদরোগ প্রতিরোধ করুন।",
      image:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=200&width=300",
      date: "৫ মে, ২০২৪",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 font-hind-siliguri">
      {/* Header */}

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-100 via-blue-50 to-sky-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-sky-900 mb-6 leading-tight font-hind-siliguri">
            আপনার স্বাস্থ্য, আমাদের অগ্রাধিকার
          </h1>
          <p className="text-xl md:text-2xl text-sky-700 mb-12 max-w-3xl mx-auto font-hind-siliguri">
            সেরা ডাক্তার ও হাসপাতাল এখন এক প্ল্যাটফর্মে
          </p>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <Tabs
              value={searchType}
              onValueChange={setSearchType}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="doctor" className="text-sky-700">
                  ডাক্তার
                </TabsTrigger>
                <TabsTrigger value="hospital" className="text-sky-700">
                  হাসপাতাল
                </TabsTrigger>
                <TabsTrigger value="specialty" className="text-sky-700">
                  বিশেষজ্ঞতা
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <Input
                placeholder={
                  searchType === "doctor"
                    ? "ডাক্তারের নাম লিখুন..."
                    : searchType === "hospital"
                      ? "হাসপাতালের নাম লিখুন..."
                      : "বিশেষজ্ঞতা লিখুন..."
                }
                className="flex-1 h-12 rounded-full border-sky-200 bg-white/90 backdrop-blur-sm"
              />
              <Button className="h-12 px-8 bg-sky-500 hover:bg-sky-600 text-white rounded-full">
                <Search className="w-5 h-5 mr-2" />
                অনুসন্ধান
              </Button>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg"
          >
            অ্যাপয়েন্টমেন্ট নিন
          </Button>
        </div>
      </section>

      {/* Appointment Booking */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-sky-900 mb-2">
                অ্যাপয়েন্টমেন্ট বুক করুন
              </CardTitle>
              <CardDescription className="text-sky-600 text-lg">
                সহজেই আপনার পছন্দের ডাক্তারের সাথে অ্যাপয়েন্টমেন্ট নিন
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-sky-800 mb-2">
                    বিভাগ নির্বাচন করুন
                  </label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl border-sky-200">
                      <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">
                        হৃদরোগ বিশেষজ্ঞ
                      </SelectItem>
                      <SelectItem value="orthopedic">হাড় বিশেষজ্ঞ</SelectItem>
                      <SelectItem value="pediatric">শিশু বিশেষজ্ঞ</SelectItem>
                      <SelectItem value="mental">মানসিক স্বাস্থ্য</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-sky-800 mb-2">
                    ডাক্তার নির্বাচন করুন
                  </label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl border-sky-200">
                      <SelectValue placeholder="ডাক্তার নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr1">ডাঃ রাজেশ কুমার</SelectItem>
                      <SelectItem value="dr2">ডাঃ প্রিয়া শর্মা</SelectItem>
                      <SelectItem value="dr3">ডাঃ অমিত দাস</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-sky-800 mb-2">
                    হাসপাতাল নির্বাচন করুন
                  </label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl border-sky-200">
                      <SelectValue placeholder="হাসপাতাল নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smc">
                        সিলিগুড়ি মেডিকেল কলেজ
                      </SelectItem>
                      <SelectItem value="nbmc">
                        নর্থ বেঙ্গল মেডিকেল কলেজ
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-sky-800 mb-2">
                    তারিখ ও সময়
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      className="flex-1 h-12 rounded-xl border-sky-200"
                    />
                    <Input
                      type="time"
                      className="flex-1 h-12 rounded-xl border-sky-200"
                    />
                  </div>
                </div>
              </div>
              <Button className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-lg font-semibold">
                <Calendar className="w-5 h-5 mr-2" />
                বুক করুন
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              জরুরি পরিষেবা
            </h2>
            <p className="text-red-500 mb-6">
              ২৪/৭ জরুরি পরিষেবা • গড় সময়: ১৫ মিনিট
            </p>
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 py-4 text-lg font-semibold"
            >
              <Ambulance className="w-6 h-6 mr-2" />
              🚑 অ্যাম্বুলেন্স ডাকুন
            </Button>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
              বিশেষজ্ঞ বিভাগ
            </h2>
            <p className="text-sky-600 text-lg max-w-2xl mx-auto">
              আমাদের অভিজ্ঞ বিশেষজ্ঞ ডাক্তারদের সাথে যোগাযোগ করুন
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <specialty.icon className="w-8 h-8 text-sky-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-sky-900 mb-2">
                    {specialty.name}
                  </h3>
                  <p className="text-sky-600 text-sm mb-4">{specialty.count}</p>
                  <Button
                    variant="outline"
                    className="border-sky-200 text-sky-700 hover:bg-sky-50 rounded-full bg-transparent"
                  >
                    ডাক্তার দেখুন
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
              নির্বাচিত ডাক্তার
            </h2>
            <p className="text-sky-600 text-lg max-w-2xl mx-auto">
              সিলিগুড়ির সেরা ও অভিজ্ঞ ডাক্তারদের সাথে পরামর্শ নিন
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage
                      src={
                        doctor.image ||
                        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                      }
                      alt={doctor.name}
                    />
                    <AvatarFallback className="bg-sky-100 text-sky-700 text-lg">
                      {doctor.name.split(" ")[1]?.[0] || "ড"}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-sky-900 mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-sky-600 mb-2">{doctor.specialty}</p>
                  <p className="text-sm text-sky-500 mb-3">
                    {doctor.experience}
                  </p>
                  <div className="flex items-center justify-center mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-sky-700 ml-1">
                      {doctor.rating}
                    </span>
                  </div>
                  <p className="text-xs text-sky-500 mb-4">{doctor.hospital}</p>
                  <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full">
                    অ্যাপয়েন্টমেন্ট নিন
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hospitals */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
              নির্বাচিত হাসপাতাল
            </h2>
            <p className="text-sky-600 text-lg max-w-2xl mx-auto">
              সিলিগুড়ির প্রতিষ্ঠিত ও বিশ্বস্ত হাসপাতালসমূহ
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {hospitals.map((hospital, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm"
              >
                <div className="aspect-video relative overflow-hidden rounded-t-xl">
                  <Image
                    src={
                      hospital.image ||
                      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                    }
                    alt={hospital.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-sky-900 mb-3">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center text-sky-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{hospital.address}</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-sky-700 mb-2 font-medium">
                      গুরুত্বপূর্ণ বিভাগ:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {hospital.departments.map((dept, deptIndex) => (
                        <Badge
                          key={deptIndex}
                          variant="secondary"
                          className="bg-sky-100 text-sky-700"
                        >
                          {dept}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full">
                    প্রোফাইল দেখুন
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-100 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
              আমাদের পরিসংখ্যান
            </h2>
            <p className="text-sky-600 text-lg">
              সিলিগুড়ির বৃহত্তম স্বাস্থ্যসেবা নেটওয়ার্ক
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: Users, count: "২০০+", label: "ডাক্তার" },
              { icon: Building2, count: "৫০+", label: "হাসপাতাল" },
              { icon: Heart, count: "৫০০০+", label: "রোগী" },
              { icon: Activity, count: "১০০+", label: "রক্তদাতা" },
              { icon: Ambulance, count: "৩০+", label: "অ্যাম্বুলেন্স" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center border-0 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-sky-900 mb-1">
                    {stat.count}
                  </div>
                  <div className="text-sm text-sky-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
              স্বাস্থ্য ব্লগ
            </h2>
            <p className="text-sky-600 text-lg max-w-2xl mx-auto">
              স্বাস্থ্য সম্পর্কিত গুরুত্বপূর্ণ তথ্য ও পরামর্শ
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm"
              >
                <div className="aspect-video relative overflow-hidden rounded-t-xl">
                  <Image
                    src={
                      post.image ||
                      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                    }
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-xs text-sky-500 mb-2">{post.date}</div>
                  <h3 className="text-lg font-semibold text-sky-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sky-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Button
                    variant="outline"
                    className="border-sky-200 text-sky-700 hover:bg-sky-50 rounded-full bg-transparent"
                  >
                    আরও পড়ুন
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
              ব্যবহারকারী মতামত
            </h2>
            <p className="text-sky-600 text-lg">
              আমাদের সেবা নিয়ে রোগীদের অভিজ্ঞতা
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage
                        src={
                          testimonial.avatar ||
                          "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                        }
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-sky-100 text-sky-700">
                        {testimonial.name.split(" ")[0][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sky-900">
                        {testimonial.name}
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sky-700 italic">"{testimonial.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Request */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 bg-gradient-to-br from-red-50 to-pink-50 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-red-600 mb-2">
                রক্ত অনুরোধ
              </CardTitle>
              <CardDescription className="text-red-500 text-lg">
                জরুরি রক্তের প্রয়োজনে আমাদের সাথে যোগাযোগ করুন
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    রক্তের গ্রুপ নির্বাচন করুন
                  </label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl border-red-200">
                      <SelectValue placeholder="রক্তের গ্রুপ নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a+">A+</SelectItem>
                      <SelectItem value="a-">A-</SelectItem>
                      <SelectItem value="b+">B+</SelectItem>
                      <SelectItem value="b-">B-</SelectItem>
                      <SelectItem value="ab+">AB+</SelectItem>
                      <SelectItem value="ab-">AB-</SelectItem>
                      <SelectItem value="o+">O+</SelectItem>
                      <SelectItem value="o-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    অবস্থান
                  </label>
                  <Input
                    placeholder="আপনার এলাকার নাম লিখুন"
                    className="h-12 rounded-xl border-red-200"
                  />
                </div>
              </div>
              <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl text-lg font-semibold">
                <Heart className="w-5 h-5 mr-2" />
                রক্ত অনুরোধ করুন
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Daily Health Tip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                আজকের স্বাস্থ্য পরামর্শ
              </h3>
              <p className="text-green-600 text-lg mb-4">
                "প্রতিদিন কমপক্ষে ৮ গ্লাস পানি পান করুন। পানি আপনার শরীরের
                বিষাক্ত পদার্থ বের করে দেয় এবং ত্বক সুন্দর রাখে।"
              </p>
              <div className="flex items-center justify-center">
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarImage src="https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-green-100 text-green-700">
                    ড
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-green-600">
                  ডাঃ সুমিত্রা রায়, পুষ্টিবিদ
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">স্বাস্থ্য সেবা</span>
              </div>
              <p className="text-sky-200 mb-4">
                সিলিগুড়ির সবচেয়ে বিশ্বস্ত স্বাস্থ্যসেবা প্ল্যাটফর্ম। আপনার
                স্বাস্থ্য আমাদের অগ্রাধিকার।
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-sky-300 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-sky-300 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-sky-300 hover:text-white cursor-pointer" />
                <Youtube className="w-5 h-5 text-sky-300 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">দ্রুত লিংক</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sky-200 hover:text-white transition-colors"
                  >
                    হোম
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sky-200 hover:text-white transition-colors"
                  >
                    ডাক্তার
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sky-200 hover:text-white transition-colors"
                  >
                    হাসপাতাল
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sky-200 hover:text-white transition-colors"
                  >
                    রক্তদাতা
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sky-200 hover:text-white transition-colors"
                  >
                    ব্লগ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">সেবাসমূহ</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sky-200 hover:text-white transition-colors"
                  >
                    অনলাইন পরামর্শ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sky-200 hover:text-white transition-colors"
                  >
                    অ্যাপয়েন্টমেন্ট
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sky-200 hover:text-white transition-colors"
                  >
                    জরুরি সেবা
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sky-200 hover:text-white transition-colors"
                  >
                    রক্ত ব্যাংক
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sky-200 hover:text-white transition-colors"
                  >
                    স্বাস্থ্য পরীক্ষা
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">যোগাযোগ</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-sky-300" />
                  <span className="text-sky-200">+৮৮ ০১৭০০-০০০০০০</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-sky-300" />
                  <span className="text-sky-200">info@swasthyaseba.com</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 text-sky-300 mt-1" />
                  <span className="text-sky-200">
                    হিল কার্ট রোড, সিলিগুড়ি, পশ্চিমবঙ্গ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-sky-800 pt-8 mb-8">
            <div className="max-w-md mx-auto text-center">
              <h4 className="text-lg font-semibold mb-4">
                স্বাস্থ্য আপডেট পান
              </h4>
              <div className="flex gap-2">
                <Input
                  placeholder="আপনার ইমেইল ঠিকানা"
                  className="bg-sky-800 border-sky-700 text-white placeholder-sky-300 rounded-full"
                />
                <Button className="bg-sky-500 hover:bg-sky-400 text-white rounded-full px-6">
                  সাবস্ক্রাইব
                </Button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-sky-800 pt-8 text-center">
            <p className="text-sky-200">
              © ২০২৪ স্বাস্থ্য সেবা। সকল অধিকার সংরক্ষিত।
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
