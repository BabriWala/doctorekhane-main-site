"use client";

import { useState, useMemo, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ChevronRight,
  Star,
  MapPin,
  Calendar,
  Languages,
  Filter,
  Map,
  Search,
  Building2,
  Award,
  Users,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import api, { NEXT_PUBLIC_IMAGE_BASE_URL } from "@/lib/api";

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

// Mock data for doctors
const mockDoctors = [
  {
    id: "1",
    name: "ডা. রাহুল সরকার",
    specialty: "হৃদরোগ বিশেষজ্ঞ",
    experience: 15,
    hospital: "সিটি নার্সিং হোম",
    location: "শিলিগুড়ি",
    languages: ["বাংলা", "ইংরেজি"],
    rating: 4.8,
    reviewCount: 135,
    consultationFee: 800,
    availableToday: true,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    qualifications: ["MBBS", "MD (Cardiology)"],
  },
  {
    id: "2",
    name: "ডা. প্রিয়া মুখার্জি",
    specialty: "গাইনি বিশেষজ্ঞ",
    experience: 12,
    hospital: "নর্থ বেঙ্গল মেডিকেল কলেজ",
    location: "শিলিগুড়ি",
    languages: ["বাংলা", "ইংরেজি", "হিন্দি"],
    rating: 4.9,
    reviewCount: 89,
    consultationFee: 700,
    availableToday: true,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    qualifications: ["MBBS", "MS (Gynecology)"],
  },
  {
    id: "3",
    name: "ডা. সুব্রত দাস",
    specialty: "চর্মরোগ বিশেষজ্ঞ",
    experience: 18,
    hospital: "ডি আর ক্লিনিক",
    location: "মালবাজার",
    languages: ["বাংলা", "ইংরেজি"],
    rating: 4.6,
    reviewCount: 67,
    consultationFee: 600,
    availableToday: false,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    qualifications: ["MBBS", "MD (Dermatology)"],
  },
  {
    id: "4",
    name: "ডা. অনিতা রায়",
    specialty: "শিশু বিশেষজ্ঞ",
    experience: 20,
    hospital: "সিলিগুড়ি ডিস্ট্রিক্ট হাসপাতাল",
    location: "শিলিগুড়ি",
    languages: ["বাংলা", "ইংরেজি"],
    rating: 4.9,
    reviewCount: 156,
    consultationFee: 750,
    availableToday: true,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    qualifications: ["MBBS", "MD (Pediatrics)"],
  },
  {
    id: "5",
    name: "ডা. রাজেশ কুমার",
    specialty: "অর্থোপেডিক সার্জন",
    experience: 25,
    hospital: "বেলভিউ নার্সিং হোম",
    location: "কোচবিহার",
    languages: ["বাংলা", "ইংরেজি", "হিন্দি"],
    rating: 4.7,
    reviewCount: 203,
    consultationFee: 900,
    availableToday: true,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    qualifications: ["MBBS", "MS (Orthopedics)"],
  },
  {
    id: "6",
    name: "ডা. সুমিত্রা ঘোষ",
    specialty: "মানসিক স্বাস্থ্য বিশেষজ্ঞ",
    experience: 10,
    hospital: "মাইন্ড কেয়ার ক্লিনিক",
    location: "শিলিগুড়ি",
    languages: ["বাংলা", "ইংরেজি"],
    rating: 4.8,
    reviewCount: 78,
    consultationFee: 1000,
    availableToday: false,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    qualifications: ["MBBS", "MD (Psychiatry)"],
  },
  {
    id: "7",
    name: "ডা. অমিত চক্রবর্তী",
    specialty: "নিউরোলজি বিশেষজ্ঞ",
    experience: 16,
    hospital: "নিউরো কেয়ার সেন্টার",
    location: "শিলিগুড়ি",
    languages: ["বাংলা", "ইংরেজি"],
    rating: 4.5,
    reviewCount: 92,
    consultationFee: 1200,
    availableToday: true,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    qualifications: ["MBBS", "DM (Neurology)"],
  },
  {
    id: "8",
    name: "ডা. রীতা সরকার",
    specialty: "চোখের ডাক্তার",
    experience: 14,
    hospital: "আই কেয়ার হাসপাতাল",
    location: "মালবাজার",
    languages: ["বাংলা", "ইংরেজি"],
    rating: 4.7,
    reviewCount: 114,
    consultationFee: 650,
    availableToday: true,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    qualifications: ["MBBS", "MS (Ophthalmology)"],
  },
];

const specialties = [
  "সব বিভাগ",
  "হৃদরোগ বিশেষজ্ঞ",
  "গাইনি বিশেষজ্ঞ",
  "চর্মরোগ বিশেষজ্ঞ",
  "শিশু বিশেষজ্ঞ",
  "অর্থোপেডিক সার্জন",
  "মানসিক স্বাস্থ্য বিশেষজ্ঞ",
  "নিউরোলজি বিশেষজ্ঞ",
  "চোখের ডাক্তার",
];

const locations = ["সব এলাকা", "শিলিগুড়ি", "মালবাজার", "কোচবিহার"];

export default function DoctorDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("সব বিভাগ");
  const [selectedLocation, setSelectedLocation] = useState("সব এলাকা");
  const [experienceRange, setExperienceRange] = useState([0]);
  const [availableToday, setAvailableToday] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const itemsPerPage = 10;
  console.log(doctors);
  // Filter doctors based on current filters
  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter((doctor) => {
      const matchesSearch =
        searchQuery === "" ||
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === "সব বিভাগ" ||
        doctor.specialty === selectedSpecialty;

      const matchesLocation =
        selectedLocation === "সব এলাকা" || doctor.location === selectedLocation;

      const matchesExperience = doctor.experience >= experienceRange[0];

      const matchesAvailability = !availableToday || doctor.availableToday;

      return (
        matchesSearch &&
        matchesSpecialty &&
        matchesLocation &&
        matchesExperience &&
        matchesAvailability
      );
    });
  }, [
    searchQuery,
    selectedSpecialty,
    selectedLocation,
    experienceRange,
    availableToday,
  ]);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("সব বিভাগ");
    setSelectedLocation("সব এলাকা");
    setExperienceRange([0]);
    setAvailableToday(false);
    setCurrentPage(1);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search" className="text-sky-800 font-medium mb-2 block">
          🔍 ডাক্তার নাম বা হাসপাতাল
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-4 h-4" />
          <Input
            id="search"
            placeholder="নাম বা হাসপাতাল লিখুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-sky-200 focus:border-sky-400"
          />
        </div>
      </div>

      <div>
        <Label className="text-sky-800 font-medium mb-2 block">
          বিভাগ নির্বাচন করুন
        </Label>
        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger className="border-sky-200 focus:border-sky-400">
            <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sky-800 font-medium mb-2 block">
          অবস্থান নির্বাচন করুন
        </Label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="border-sky-200 focus:border-sky-400">
            <SelectValue placeholder="অবস্থান নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sky-800 font-medium mb-3 block">
          অভিজ্ঞতা: {experienceRange[0]}+ বছর
        </Label>
        <Slider
          value={experienceRange}
          onValueChange={setExperienceRange}
          max={30}
          min={0}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-sky-600 mt-1">
          <span>০ বছর</span>
          <span>৩০+ বছর</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="available-today" className="text-sky-800 font-medium">
          আজ উপলব্ধ
        </Label>
        <Switch
          id="available-today"
          checked={availableToday}
          onCheckedChange={setAvailableToday}
          className="data-[state=checked]:bg-sky-500"
        />
      </div>

      <div className="space-y-2">
        <Button
          onClick={() => setCurrentPage(1)}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full"
        >
          ফিল্টার প্রয়োগ করুন
        </Button>
        <Button
          onClick={clearFilters}
          variant="outline"
          className="w-full border-sky-200 text-sky-700 rounded-full bg-transparent"
        >
          সব ফিল্টার মুছুন
        </Button>
      </div>
    </div>
  );

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);

        const params = {
          page: currentPage,
          limit: itemsPerPage,
        };

        if (searchQuery) params.search = searchQuery;
        if (selectedSpecialty !== "সব বিভাগ")
          params.department = selectedSpecialty;
        if (selectedLocation !== "সব এলাকা") params.location = selectedLocation;
        if (experienceRange[0] > 0) params.minExperience = experienceRange[0];
        if (availableToday) params.availableToday = true;

        const { data } = await api.get("/doctor", {
          params,
        });

        setDoctors(data.data); // paginated data
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [
    searchQuery,
    selectedSpecialty,
    selectedLocation,
    experienceRange,
    availableToday,
    currentPage,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 font-hind-siliguri">
      {/* Breadcrumb Navigation */}
      <motion.div
        className="bg-white border-b border-sky-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              হোম
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-sky-800 font-medium">ডাক্তার</span>
          </nav>
        </div>
      </motion.div>

      {/* Header Section */}
      <motion.section
        className="bg-gradient-to-r from-sky-100 to-blue-100 py-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
            ডাক্তার তালিকা
          </h1>
          <p className="text-lg md:text-xl text-sky-700 mb-6">
            আপনার প্রয়োজনীয় বিশেষজ্ঞ খুঁজুন
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Badge className="bg-sky-500 text-white px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              {doctors.length} টি ডাক্তার পাওয়া গেছে
            </Badge>
            <Button
              onClick={() => setShowMap(!showMap)}
              variant="outline"
              className="border-sky-300 text-sky-700 hover:bg-sky-50 bg-white/80"
            >
              <Map className="w-4 h-4 mr-2" />
              {showMap ? "তালিকায় দেখুন" : "ম্যাপে দেখুন"}
            </Button>
          </div>
        </div>
      </motion.section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <motion.aside
            className="hidden lg:block w-80 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="sticky top-4 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-sky-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  ফিল্টার
                </CardTitle>
                <CardDescription className="text-sky-600">
                  আপনার পছন্দের ডাক্তার খুঁজুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FilterContent />
              </CardContent>
            </Card>
          </motion.aside>

          {/* Mobile Filter Sheet */}
          <div className="lg:hidden mb-4">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-sky-200 text-sky-700 bg-white"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  ফিল্টার ({filteredDoctors.length})
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-sky-900">ফিল্টার</SheetTitle>
                  <SheetDescription className="text-sky-600">
                    আপনার পছন্দের ডাক্তার খুঁজুন
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Main Content Area */}
          <motion.main
            className="flex-1"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {showMap ? (
              /* Map View Placeholder */
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm h-96">
                <CardContent className="p-8 flex items-center justify-center h-full">
                  <div className="text-center">
                    <Map className="w-16 h-16 text-sky-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-sky-900 mb-2">
                      ম্যাপ ভিউ
                    </h3>
                    <p className="text-sky-600">
                      ডাক্তারদের অবস্থান ম্যাপে দেখানো হবে
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Doctor Cards Grid */}
                {doctors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {doctors.map((doctor, index) => (
                      <motion.div
                        key={doctor?.id}
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                              <Avatar className="w-16 h-16 border-2 border-sky-100">
                                {doctor?.personalDetails?.profilePicture && (
                                  <AvatarImage
                                    src={`${NEXT_PUBLIC_IMAGE_BASE_URL}${doctor.personalDetails.profilePicture}`}
                                    alt={`${doctor.personalDetails.firstName} ${doctor.personalDetails.lastName}`}
                                  />
                                )}

                                <AvatarFallback className="bg-sky-100 text-sky-700 text-lg">
                                  {doctor?.personalDetails?.firstName?.[0] ||
                                    ""}
                                  {doctor?.personalDetails?.lastName?.[0] || ""}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-sky-900 mb-1 truncate">
                                  {doctor?.personalDetails?.firstName +
                                    " " +
                                    doctor?.personalDetails?.lastName}
                                </h3>
                                <p className="text-sky-700 font-medium mb-1">
                                  {/* {doctor.specialty} */}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-sky-600 mb-2">
                                  <Award className="w-4 h-4" />
                                  <span>
                                    {doctor?.personalDetails?.totalExperience}{" "}
                                    বছর অভিজ্ঞতা
                                  </span>
                                </div>
                              </div>
                              {/* {doctor.availableToday && (
                                <Badge className="bg-green-100 text-green-700 text-xs">
                                  আজ উপলব্ধ
                                </Badge>
                              )} */}
                            </div>

                            <div className="space-y-2 mb-4">
                              {/* <div className="flex items-center gap-2 text-sm text-sky-600">
                                <Building2 className="w-4 h-4" />
                                <span className="truncate">
                                  {doctor.hospital}
                                </span>
                              </div> */}
                              <div className="flex items-center gap-2 text-sm text-sky-600">
                                <MapPin className="w-4 h-4" />
                                <span>
                                  {doctor?.personalDetails?.address?.street}{" "}
                                  {doctor?.personalDetails?.address?.city}
                                </span>
                              </div>
                              {/* <div className="flex items-center gap-2 text-sm text-sky-600">
                                <Languages className="w-4 h-4" />
                                <span>{doctor.languages.join(", ")}</span>
                              </div> */}
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        // i < Math.floor(doctor.rating)
                                        i < Math.floor(5)
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-sky-800 font-medium">
                                  {/* {doctor.rating} */}
                                  {5}
                                </span>
                                <span className="text-xs text-sky-600">
                                  {/* ({doctor.reviewCount}) */}({5})
                                </span>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-sky-600">
                                  পরামর্শ ফি
                                </div>
                                <div className="font-semibold text-sky-800">
                                  ৳ {doctor?.professional?.consultationFee}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-col gap-2">
                              <Button
                                asChild
                                className="flex-1 bg-sky-500 hover:bg-sky-600 text-white rounded-full"
                              >
                                <Link href={`/doctor/${doctor?.id}`}>
                                  <Calendar className="w-4 h-4 mr-2" />
                                  অ্যাপয়েন্টমেন্ট নিন
                                </Link>
                              </Button>
                              <Button
                                asChild
                                variant="outline"
                                className="flex-1 border-sky-200 text-sky-700 hover:bg-sky-50 rounded-full bg-transparent"
                              >
                                <Link href={`/doctor/${doctor?.id}`}>
                                  বিস্তারিত দেখুন
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                      <CardContent className="p-12 text-center">
                        <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Search className="w-12 h-12 text-sky-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-sky-900 mb-4">
                          কোনো ডাক্তার পাওয়া যায়নি
                        </h3>
                        <p className="text-sky-600 mb-6 max-w-md mx-auto">
                          দুঃখিত, এই শর্ত অনুযায়ী কোনো ডাক্তার পাওয়া যায়নি।
                          অনুগ্রহ করে ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
                        </p>
                        <Button
                          onClick={clearFilters}
                          className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-8"
                        >
                          সব ফিল্টার মুছুন
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage > 1)
                                setCurrentPage(currentPage - 1);
                            }}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>

                        {[...Array(totalPages)].map((_, index) => {
                          const page = index + 1;
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(page);
                                  }}
                                  isActive={currentPage === page}
                                  className={
                                    currentPage === page
                                      ? "bg-sky-500 text-white"
                                      : ""
                                  }
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                          return null;
                        })}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage < totalPages)
                                setCurrentPage(currentPage + 1);
                            }}
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </motion.div>
                )}
              </>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
