"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Droplets,
  User,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const locations = [
  "শিলিগুড়ি",
  "জলপাইগুড়ি",
  "মালবাজার",
  "আলিপুরদুয়ার",
  "কোচবিহার",
  "দার্জিলিং",
];

const donors = [
  {
    id: 1,
    name: "সৌমেন সরকার",
    bloodGroup: "O+",
    location: "শিলিগুড়ি",
    lastDonation: "১৫ দিন আগে",
    phone: "৯৮৩০০০০০০১",
    availability: "এখনই",
    totalDonations: 12,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "রিতা দাস",
    bloodGroup: "A+",
    location: "জলপাইগুড়ি",
    lastDonation: "২৫ দিন আগে",
    phone: "৯৮৩০০০০০০২",
    availability: "৭ দিনের মধ্যে",
    totalDonations: 8,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "অমিত রায়",
    bloodGroup: "B+",
    location: "শিলিগুড়ি",
    lastDonation: "৩০ দিন আগে",
    phone: "৯৮৩০০০০০০৩",
    availability: "এখনই",
    totalDonations: 15,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "প্রিয়া ব্যানার্জী",
    bloodGroup: "AB+",
    location: "মালবাজার",
    lastDonation: "২০ দিন আগে",
    phone: "৯৮৩০০০০০০৪",
    availability: "৭ দিনের মধ্যে",
    totalDonations: 6,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    name: "রাজেশ কুমার",
    bloodGroup: "O-",
    location: "শিলিগুড়ি",
    lastDonation: "৪৫ দিন আগে",
    phone: "৯৮৩০০০০০০৫",
    availability: "এখনই",
    totalDonations: 20,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
  },
  {
    id: 6,
    name: "সুমিত্রা চক্রবর্তী",
    bloodGroup: "A-",
    location: "আলিপুরদুয়ার",
    lastDonation: "১০ দিন আগে",
    phone: "৯৮৩০০০০০০৬",
    availability: "৭ দিনের মধ্যে",
    totalDonations: 9,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
  },
];

export default function BloodDonors() {
  const [filters, setFilters] = useState({
    bloodGroup: "",
    location: "",
    availability: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodRequestForm, setBloodRequestForm] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
    requiredDate: "",
    contactNumber: "",
    urgency: "",
  });
  const [donorRegistrationForm, setDonorRegistrationForm] = useState({
    name: "",
    bloodGroup: "",
    location: "",
    contactNumber: "",
    availability: "",
    healthConfirm: false,
  });

  const filteredDonors = donors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodGroup =
      !filters.bloodGroup || donor.bloodGroup === filters.bloodGroup;
    const matchesLocation =
      !filters.location || donor.location === filters.location;
    const matchesAvailability =
      !filters.availability || donor.availability === filters.availability;

    return (
      matchesSearch &&
      matchesBloodGroup &&
      matchesLocation &&
      matchesAvailability
    );
  });

  const handleBloodRequest = (e) => {
    e.preventDefault();
    // Handle blood request submission
    console.log("Blood request:", bloodRequestForm);
    alert("রক্তের অনুরোধ সফলভাবে পাঠানো হয়েছে!");
  };

  const handleDonorRegistration = (e) => {
    e.preventDefault();
    if (!donorRegistrationForm.healthConfirm) {
      alert("অনুগ্রহ করে স্বাস্থ্য নিশ্চিতকরণ চেকবক্স টিক করুন");
      return;
    }
    // Handle donor registration
    console.log("Donor registration:", donorRegistrationForm);
    alert("রক্তদাতা হিসেবে নিবন্ধন সফল হয়েছে!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-sky-800">
                রক্তদাতা তালিকা
              </h1>
              <p className="text-sky-600 mt-2">
                জরুরি মুহূর্তে সাহায্যের জন্য রক্তদাতা খুঁজুন বা নিবন্ধন করুন
              </p>
            </div>
            <nav className="text-sm text-sky-600">
              <span>হোম</span> <span className="mx-2">&gt;</span>{" "}
              <span className="text-sky-800">রক্তদাতা</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              রক্তদাতা খুঁজুন
            </TabsTrigger>
            <TabsTrigger value="request" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              রক্ত অনুরোধ করুন
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              রক্তদাতা নিবন্ধন
            </TabsTrigger>
          </TabsList>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filters Sidebar */}
              <div className="lg:w-80">
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-sky-800 flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      ফিল্টার
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label
                        htmlFor="search"
                        className="text-sky-700 font-medium"
                      >
                        নাম বা এলাকা খুঁজুন
                      </Label>
                      <Input
                        id="search"
                        placeholder="নাম বা এলাকা লিখুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-sky-700 font-medium">
                        রক্তের গ্রুপ
                      </Label>
                      <Select
                        value={filters.bloodGroup}
                        onValueChange={(value) =>
                          setFilters({ ...filters, bloodGroup: value })
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="রক্তের গ্রুপ নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">সব গ্রুপ</SelectItem>
                          {bloodGroups.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sky-700 font-medium">
                        এলাকা / শহর
                      </Label>
                      <Select
                        value={filters.location}
                        onValueChange={(value) =>
                          setFilters({ ...filters, location: value })
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">সব এলাকা</SelectItem>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sky-700 font-medium">
                        উপলব্ধতা
                      </Label>
                      <Select
                        value={filters.availability}
                        onValueChange={(value) =>
                          setFilters({ ...filters, availability: value })
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="উপলব্ধতা নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">সব</SelectItem>
                          <SelectItem value="now">এখনই</SelectItem>
                          <SelectItem value="7days">৭ দিনের মধ্যে</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      className="w-full bg-sky-600 hover:bg-sky-700"
                      onClick={() => {
                        // Apply filters (already applied through state)
                      }}
                    >
                      ফিল্টার করুন
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        setFilters({
                          bloodGroup: "",
                          location: "",
                          availability: "",
                        });
                        setSearchTerm("");
                      }}
                    >
                      রিসেট করুন
                    </Button>
                  </CardContent>
                </Card>

                {/* Mobile Filter Sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="lg:hidden w-full mb-4 bg-transparent"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      ফিল্টার
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>ফিল্টার</SheetTitle>
                      <SheetDescription>
                        আপনার পছন্দ অনুযায়ী রক্তদাতা খুঁজুন
                      </SheetDescription>
                    </SheetHeader>
                    {/* Same filter content as desktop */}
                  </SheetContent>
                </Sheet>
              </div>

              {/* Donors Grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sky-700">
                    <span className="font-medium">{filteredDonors.length}</span>{" "}
                    জন রক্তদাতা পাওয়া গেছে
                  </p>
                  <Select defaultValue="recent">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">সাম্প্রতিক রক্তদান</SelectItem>
                      <SelectItem value="donations">মোট রক্তদান</SelectItem>
                      <SelectItem value="location">এলাকা অনুযায়ী</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredDonors.map((donor) => (
                    <motion.div
                      key={donor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-sky-50 hover:bg-sky-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage
                                src={
                                  donor.image ||
                                  "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                                }
                              />
                              <AvatarFallback className="bg-sky-200 text-sky-800">
                                {donor.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sky-800 text-lg">
                                {donor.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant="secondary"
                                  className="bg-red-100 text-red-800 font-medium"
                                >
                                  {donor.bloodGroup}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={
                                    donor.availability === "এখনই"
                                      ? "border-green-500 text-green-700"
                                      : "border-yellow-500 text-yellow-700"
                                  }
                                >
                                  {donor.availability}
                                </Badge>
                              </div>
                              <div className="space-y-1 mt-3 text-sm text-sky-600">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  {donor.location}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  শেষ রক্তদান: {donor.lastDonation}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Droplets className="h-4 w-4" />
                                  মোট দান: {donor.totalDonations} বার
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button
                              className="flex-1 bg-sky-600 hover:bg-sky-700"
                              onClick={() => window.open(`tel:${donor.phone}`)}
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              যোগাযোগ করুন
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 bg-transparent"
                              onClick={() =>
                                window.open(
                                  `https://wa.me/${donor.phone.replace(
                                    /[^0-9]/g,
                                    ""
                                  )}`
                                )
                              }
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              WhatsApp
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredDonors.length === 0 && (
                  <div className="text-center py-12">
                    <Droplets className="h-16 w-16 text-sky-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-sky-700 mb-2">
                      কোনো রক্তদাতা পাওয়া যায়নি
                    </h3>
                    <p className="text-sky-600">
                      অন্য ফিল্টার ব্যবহার করে আবার চেষ্টা করুন
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Blood Request Tab */}
          <TabsContent value="request">
            <Card className="max-w-2xl mx-auto bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-sky-800 flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  রক্ত অনুরোধ করুন
                </CardTitle>
                <CardDescription>
                  জরুরি রক্তের প্রয়োজনে এই ফর্মটি পূরণ করুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBloodRequest} className="space-y-4">
                  <div>
                    <Label
                      htmlFor="patientName"
                      className="text-sky-700 font-medium"
                    >
                      রোগীর নাম
                    </Label>
                    <Input
                      id="patientName"
                      value={bloodRequestForm.patientName}
                      onChange={(e) =>
                        setBloodRequestForm({
                          ...bloodRequestForm,
                          patientName: e.target.value,
                        })
                      }
                      placeholder="রোগীর পূর্ণ নাম লিখুন"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sky-700 font-medium">
                        রক্তের গ্রুপ
                      </Label>
                      <Select
                        value={bloodRequestForm.bloodGroup}
                        onValueChange={(value) =>
                          setBloodRequestForm({
                            ...bloodRequestForm,
                            bloodGroup: value,
                          })
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="রক্তের গ্রুপ নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodGroups.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="requiredDate"
                        className="text-sky-700 font-medium"
                      >
                        প্রয়োজনীয় তারিখ
                      </Label>
                      <Input
                        id="requiredDate"
                        type="date"
                        value={bloodRequestForm.requiredDate}
                        onChange={(e) =>
                          setBloodRequestForm({
                            ...bloodRequestForm,
                            requiredDate: e.target.value,
                          })
                        }
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="hospital"
                      className="text-sky-700 font-medium"
                    >
                      ঠিকানা / হাসপাতালের নাম
                    </Label>
                    <Input
                      id="hospital"
                      value={bloodRequestForm.hospital}
                      onChange={(e) =>
                        setBloodRequestForm({
                          ...bloodRequestForm,
                          hospital: e.target.value,
                        })
                      }
                      placeholder="হাসপাতালের নাম বা ঠিকানা লিখুন"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="contactNumber"
                      className="text-sky-700 font-medium"
                    >
                      যোগাযোগ নম্বর
                    </Label>
                    <Input
                      id="contactNumber"
                      value={bloodRequestForm.contactNumber}
                      onChange={(e) =>
                        setBloodRequestForm({
                          ...bloodRequestForm,
                          contactNumber: e.target.value,
                        })
                      }
                      placeholder="০১৭xxxxxxxx"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-sky-700 font-medium">
                      জরুরি অবস্থা
                    </Label>
                    <Select
                      value={bloodRequestForm.urgency}
                      onValueChange={(value) =>
                        setBloodRequestForm({
                          ...bloodRequestForm,
                          urgency: value,
                        })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="জরুরি অবস্থা নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">
                          অত্যন্ত জরুরি (২৪ ঘণ্টার মধ্যে)
                        </SelectItem>
                        <SelectItem value="urgent">
                          জরুরি (৪৮ ঘণ্টার মধ্যে)
                        </SelectItem>
                        <SelectItem value="normal">
                          সাধারণ (১ সপ্তাহের মধ্যে)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    রক্ত চাওয়ার অনুরোধ পাঠান
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donor Registration Tab */}
          <TabsContent value="register">
            <Card className="max-w-2xl mx-auto bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-sky-800 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  রক্তদাতা নিবন্ধন
                </CardTitle>
                <CardDescription>
                  রক্তদাতা হিসেবে নিবন্ধন করুন এবং জীবন বাঁচান
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonorRegistration} className="space-y-4">
                  <div>
                    <Label
                      htmlFor="donorName"
                      className="text-sky-700 font-medium"
                    >
                      নাম
                    </Label>
                    <Input
                      id="donorName"
                      value={donorRegistrationForm.name}
                      onChange={(e) =>
                        setDonorRegistrationForm({
                          ...donorRegistrationForm,
                          name: e.target.value,
                        })
                      }
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sky-700 font-medium">
                        রক্তের গ্রুপ
                      </Label>
                      <Select
                        value={donorRegistrationForm.bloodGroup}
                        onValueChange={(value) =>
                          setDonorRegistrationForm({
                            ...donorRegistrationForm,
                            bloodGroup: value,
                          })
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="রক্তের গ্রুপ নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodGroups.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sky-700 font-medium">এলাকা</Label>
                      <Select
                        value={donorRegistrationForm.location}
                        onValueChange={(value) =>
                          setDonorRegistrationForm({
                            ...donorRegistrationForm,
                            location: value,
                          })
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="এলাকা নির্বাচন করুন" />
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
                  </div>

                  <div>
                    <Label
                      htmlFor="donorContact"
                      className="text-sky-700 font-medium"
                    >
                      যোগাযোগ নম্বর
                    </Label>
                    <Input
                      id="donorContact"
                      value={donorRegistrationForm.contactNumber}
                      onChange={(e) =>
                        setDonorRegistrationForm({
                          ...donorRegistrationForm,
                          contactNumber: e.target.value,
                        })
                      }
                      placeholder="০১৭xxxxxxxx"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-sky-700 font-medium">
                      উপলব্ধতার তথ্য
                    </Label>
                    <Select
                      value={donorRegistrationForm.availability}
                      onValueChange={(value) =>
                        setDonorRegistrationForm({
                          ...donorRegistrationForm,
                          availability: value,
                        })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="আপনার উপলব্ধতা নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">এখনই রক্ত দিতে পারি</SelectItem>
                        <SelectItem value="7days">৭ দিনের মধ্যে</SelectItem>
                        <SelectItem value="30days">৩০ দিনের মধ্যে</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="healthConfirm"
                      checked={donorRegistrationForm.healthConfirm}
                      onCheckedChange={(checked) =>
                        setDonorRegistrationForm({
                          ...donorRegistrationForm,
                          healthConfirm: checked,
                        })
                      }
                    />
                    <Label
                      htmlFor="healthConfirm"
                      className="text-sm text-sky-700"
                    >
                      আমি বর্তমানে রক্ত দানের জন্য সুস্থ ও যোগ্য আছি এবং গত ৩
                      মাসে রক্ত দান করিনি
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700"
                  >
                    রক্তদাতা হিসেবে নিবন্ধন করুন
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
