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
import { Checkbox } from "@/components/ui/checkbox";
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
  Phone,
  Filter,
  Map,
  Search,
  Building2,
  Clock,
  Users,
} from "lucide-react";
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

// Mock data for hospitals
const mockHospitals = [
  {
    id: "1",
    name: "সিটি নার্সিং হোম",
    address: "হিল কার্ট রোড, শিলিগুড়ি, পশ্চিমবঙ্গ ৭৩৪০০১",
    city: "শিলিগুড়ি",
    phone: "৯৮৩২৯০১২৩৪",
    emergencyPhone: "৯৮৩০০০০০০০",
    rating: 4.5,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    services: ["ICU", "OT", "MRI", "CT Scan", "Dialysis"],
    departments: ["হৃদরোগ", "নিউরোলজি", "অর্থোপেডিক্স", "গাইনোকলজি"],
    insurance: ["LIC", "Star Health", "MediAssist"],
    is24Hours: true,
    established: "১৯৮৫",
    bedCount: 150,
  },
  {
    id: "2",
    name: "নর্থ বেঙ্গল মেডিকেল কলেজ ও হাসপাতাল",
    address: "সুশ্রুত নগর, শিলিগুড়ি, পশ্চিমবঙ্গ ৭৩৪০১২",
    city: "শিলিগুড়ি",
    phone: "৯৮৩২৯০৫৬৭৮",
    emergencyPhone: "৯৮৩০১১১১১১",
    rating: 4.7,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    services: ["ICU", "NICU", "OT", "MRI", "CT Scan", "Emergency"],
    departments: ["হৃদরোগ", "নিউরোলজি", "শিশু বিভাগ", "ক্যান্সার"],
    insurance: ["LIC", "Star Health", "ICICI Lombard", "Bajaj Allianz"],
    is24Hours: true,
    established: "১৯৬৫",
    bedCount: 500,
  },
  {
    id: "3",
    name: "ডি আর ক্লিনিক",
    address: "সেভোক রোড, শিলিগুড়ি, পশ্চিমবঙ্গ ৭৩৪০০৫",
    city: "শিলিগুড়ি",
    phone: "৯৮৩২৯০৯৮৭৬",
    emergencyPhone: "৯৮৩০২২২২২২",
    rating: 4.3,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    services: ["OPD", "Pathology", "X-Ray", "ECG"],
    departments: ["চর্মরোগ", "গাইনোকলজি", "শিশু বিভাগ"],
    insurance: ["Star Health", "MediAssist"],
    is24Hours: false,
    established: "২০০৫",
    bedCount: 50,
  },
  {
    id: "4",
    name: "জলপাইগুড়ি ডিস্ট্রিক্ট হাসপাতাল",
    address: "হাসপাতাল রোড, জলপাইগুড়ি, পশ্চিমবঙ্গ ৭৩৫১০১",
    city: "জলপাইগুড়ি",
    phone: "৯৮৩২৯০৪৫৬৭",
    emergencyPhone: "৯৮৩০৩৩৩৩৩ৃ",
    rating: 4.1,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    services: ["ICU", "OT", "Emergency", "Pathology"],
    departments: ["সাধারণ চিকিৎসা", "সার্জারি", "গাইনোকলজি"],
    insurance: ["LIC", "Star Health"],
    is24Hours: true,
    established: "১৯৭২",
    bedCount: 200,
  },
  {
    id: "5",
    name: "মালবাজার সুপার স্পেশালিটি হাসপাতাল",
    address: "মেইন রোড, মালবাজার, জলপাইগুড়ি ৭৩৫২২০",
    city: "মালবাজার",
    phone: "৯৮৩২৯০৭৮৯০",
    emergencyPhone: "৯৮৩০৪৪৪৪৪৪",
    rating: 4.6,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    services: ["ICU", "OT", "MRI", "Dialysis"],
    departments: ["হৃদরোগ", "নিউরোলজি", "অর্থোপেডিক্স"],
    insurance: ["LIC", "Star Health", "MediAssist", "ICICI Lombard"],
    is24Hours: true,
    established: "২০১০",
    bedCount: 120,
  },
  {
    id: "6",
    name: "আই কেয়ার হাসপাতাল",
    address: "বিধান নগর, শিলিগুড়ি, পশ্চিমবঙ্গ ৭৩৪০০৬",
    city: "শিলিগুড়ি",
    phone: "৯৮৩২৯০৩৪৫৬",
    emergencyPhone: "৯৮৩০৫৫৫৫৫৫",
    rating: 4.8,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
    services: ["Eye Surgery", "Laser Treatment", "OPD"],
    departments: ["চোখের চিকিৎসা", "রেটিনা", "গ্লুকোমা"],
    insurance: ["Star Health", "MediAssist"],
    is24Hours: false,
    established: "২০১৫",
    bedCount: 30,
  },
];

const cities = ["সব শহর", "শিলিগুড়ি", "জলপাইগুড়ি", "মালবাজার"];
const departments = [
  "সব বিভাগ",
  "হৃদরোগ",
  "নিউরোলজি",
  "গাইনোকলজি",
  "অর্থোপেডিক্স",
  "শিশু বিভাগ",
  "চর্মরোগ",
];
const insuranceOptions = [
  "LIC",
  "Star Health",
  "MediAssist",
  "ICICI Lombard",
  "Bajaj Allianz",
];

export default function HospitalDirectoryPage() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("সব শহর");
  const [selectedDepartment, setSelectedDepartment] = useState("সব বিভাগ");
  const [selectedInsurance, setSelectedInsurance] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([0]);
  const [showMap, setShowMap] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    api.get("/hospital", { params: { limit: 100 } }).then(({ data }) => {
      setHospitals((Array.isArray(data) ? data : []).map((item) => ({
        id: item._id,
        name: item.basicInfo?.name || "Hospital",
        address: [item.address?.street, item.address?.city].filter(Boolean).join(", "),
        city: item.address?.city || "",
        phone: item.contact?.phone || "",
        emergencyPhone: item.basicInfo?.emergencyPhone || item.contact?.phone || "",
        rating: item.basicInfo?.ratingAverage || 0,
        image: item.basicInfo?.logo ? `${IMAGE_BASE_URL}${item.basicInfo.logo}` : "",
        services: item.basicInfo?.services || [],
        departments: (item.departments || []).map((department) => department.name),
        insurance: item.basicInfo?.insurance || [],
        is24Hours: Boolean(item.basicInfo?.is24Hours),
        established: item.basicInfo?.establishedYear || "—",
        bedCount: item.basicInfo?.bedCount || 0,
      })));
    }).finally(() => setLoading(false));
  }, []);

  // Filter hospitals based on current filters
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      const matchesSearch =
        searchQuery === "" ||
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity =
        selectedCity === "সব শহর" || hospital.city === selectedCity;

      const matchesDepartment =
        selectedDepartment === "সব বিভাগ" ||
        hospital.departments.includes(selectedDepartment);

      const matchesInsurance =
        selectedInsurance.length === 0 ||
        selectedInsurance.some((ins) => hospital.insurance.includes(ins));

      const matchesRating = hospital.rating >= ratingFilter[0];

      return (
        matchesSearch &&
        matchesCity &&
        matchesDepartment &&
        matchesInsurance &&
        matchesRating
      );
    });
  }, [
    searchQuery,
    selectedCity,
    selectedDepartment,
    selectedInsurance,
    ratingFilter,
    hospitals,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredHospitals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHospitals = filteredHospitals.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCity("সব শহর");
    setSelectedDepartment("সব বিভাগ");
    setSelectedInsurance([]);
    setRatingFilter([0]);
    setCurrentPage(1);
  };

  const handleInsuranceChange = (insurance, checked) => {
    if (checked) {
      setSelectedInsurance([...selectedInsurance, insurance]);
    } else {
      setSelectedInsurance(
        selectedInsurance.filter((ins) => ins !== insurance)
      );
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search" className="text-sky-800 font-medium mb-2 block">
          🔍 হাসপাতাল খুঁজুন
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-4 h-4" />
          <Input
            id="search"
            placeholder="হাসপাতালের নাম বা ঠিকানা লিখুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-sky-200 focus:border-sky-400"
          />
        </div>
      </div>

      <div>
        <Label className="text-sky-800 font-medium mb-2 block">
          শহর নির্বাচন করুন
        </Label>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="border-sky-200 focus:border-sky-400">
            <SelectValue placeholder="শহর নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sky-800 font-medium mb-2 block">
          বিভাগ নির্বাচন করুন
        </Label>
        <Select
          value={selectedDepartment}
          onValueChange={setSelectedDepartment}
        >
          <SelectTrigger className="border-sky-200 focus:border-sky-400">
            <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sky-800 font-medium mb-3 block">
          ইন্স্যুরেন্স গ্রহণযোগ্যতা
        </Label>
        <div className="space-y-2">
          {insuranceOptions.map((insurance) => (
            <div key={insurance} className="flex items-center space-x-2">
              <Checkbox
                id={insurance}
                checked={selectedInsurance.includes(insurance)}
                onCheckedChange={(checked) =>
                  handleInsuranceChange(insurance, checked)
                }
                className="data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500"
              />
              <Label htmlFor={insurance} className="text-sm text-sky-700">
                {insurance}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sky-800 font-medium mb-3 block">
          রেটিং: {ratingFilter[0]}+ তারকা
        </Label>
        <Slider
          value={ratingFilter}
          onValueChange={setRatingFilter}
          max={5}
          min={0}
          step={0.5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-sky-600 mt-1">
          <span>০ তারকা</span>
          <span>৫ তারকা</span>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          onClick={() => setCurrentPage(1)}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full"
        >
          ফিল্টার করুন
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
            <span className="text-sky-800 font-medium">হাসপাতাল</span>
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
            হাসপাতাল ও ক্লিনিক তালিকা
          </h1>
          <p className="text-lg md:text-xl text-sky-700 mb-6">
            আপনার নিকটস্থ হাসপাতাল বা ক্লিনিক খুঁজুন
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Badge className="bg-sky-500 text-white px-4 py-2">
              <Building2 className="w-4 h-4 mr-2" />
              {filteredHospitals.length}টি হাসপাতাল পাওয়া গেছে
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
                  আপনার পছন্দের হাসপাতাল খুঁজুন
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
                  ফিল্টার ({filteredHospitals.length})
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-sky-900">ফিল্টার</SheetTitle>
                  <SheetDescription className="text-sky-600">
                    আপনার পছন্দের হাসপাতাল খুঁজুন
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
                      হাসপাতালের অবস্থান ম্যাপে দেখানো হবে
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Hospital Cards Grid */}
                {paginatedHospitals.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {paginatedHospitals.map((hospital, index) => (
                      <motion.div
                        key={hospital.id}
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                              <Avatar className="w-16 h-16 border-2 border-sky-100">
                                <AvatarImage
                                  src={
                                    hospital.image ||
                                    "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                                  }
                                  alt={hospital.name}
                                />
                                <AvatarFallback className="bg-sky-100 text-sky-700 text-lg">
                                  <Building2 className="w-8 h-8" />
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-sky-900 mb-2 line-clamp-2">
                                  {hospital.name}
                                </h3>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < Math.floor(hospital.rating)
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-sky-800 font-medium">
                                    {hospital.rating}
                                  </span>
                                  <span className="text-xs text-sky-600">
                                    ({hospital.reviewCount})
                                  </span>
                                </div>
                                {hospital.is24Hours && (
                                  <Badge className="bg-green-100 text-green-700 text-xs mb-2">
                                    ২৪ ঘণ্টা খোলা
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-start gap-2 text-sm text-sky-600">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-2">
                                  {hospital.address}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-sky-600">
                                <Phone className="w-4 h-4" />
                                <span>{hospital.phone}</span>
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-sm text-sky-700 mb-2 font-medium">
                                পরিষেবা:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {hospital.services
                                  .slice(0, 4)
                                  .map((service, serviceIndex) => (
                                    <Badge
                                      key={serviceIndex}
                                      variant="secondary"
                                      className="bg-sky-100 text-sky-700 text-xs"
                                    >
                                      {service}
                                    </Badge>
                                  ))}
                                {hospital.services.length > 4 && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-sky-100 text-sky-700 text-xs"
                                  >
                                    +{hospital.services.length - 4}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-sm text-sky-700 mb-2 font-medium">
                                বিভাগ:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {hospital.departments
                                  .slice(0, 3)
                                  .map((dept, deptIndex) => (
                                    <Badge
                                      key={deptIndex}
                                      variant="outline"
                                      className="border-sky-200 text-sky-700 text-xs"
                                    >
                                      {dept}
                                    </Badge>
                                  ))}
                                {hospital.departments.length > 3 && (
                                  <Badge
                                    variant="outline"
                                    className="border-sky-200 text-sky-700 text-xs"
                                  >
                                    +{hospital.departments.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-4 text-sm text-sky-600">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{hospital.bedCount} শয্যা</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>প্রতিষ্ঠিত {hospital.established}</span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                asChild
                                className="flex-1 bg-sky-500 hover:bg-sky-600 text-white rounded-full"
                              >
                                <Link href={`/hospital/${hospital.id}`}>
                                  <Building2 className="w-4 h-4 mr-2" />
                                  প্রোফাইল দেখুন
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                className="flex-1 border-sky-200 text-sky-700 hover:bg-sky-50 rounded-full bg-transparent"
                                onClick={() =>
                                  window.open(`tel:${hospital.phone}`, "_self")
                                }
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                যোগাযোগ করুন
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
                          কোনো হাসপাতাল পাওয়া যায়নি
                        </h3>
                        <p className="text-sky-600 mb-6 max-w-md mx-auto">
                          এই খোঁজ অনুযায়ী কোনো হাসপাতাল পাওয়া যায়নি। অনুগ্রহ
                          করে ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
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
