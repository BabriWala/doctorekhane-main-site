"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Calendar,
  FileText,
  Search,
  Eye,
  Edit,
  Plus,
  Heart,
  Activity,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const patients = [
  {
    id: 1,
    name: "রহিম উদ্দিন",
    age: 45,
    gender: "পুরুষ",
    phone: "০১৭১২৩৪৫৬৭৮",
    email: "rahim@email.com",
    address: "ঢাকা, বাংলাদেশ",
    bloodGroup: "B+",
    lastVisit: "২০ ডিসেম্বর, ২০২ৄ",
    condition: "উচ্চ রক্তচাপ",
    status: "নিয়মিত",
    totalVisits: 12,
    nextAppointment: "২৮ ডিসেম্বর, ২০২৪",
  },
  {
    id: 2,
    name: "ফাতেমা খাতুন",
    age: 38,
    gender: "মহিলা",
    phone: "০১৮১২৩৪৫৬৭৮",
    email: "fatema@email.com",
    address: "চট্টগ্রাম, বাংলাদেশ",
    bloodGroup: "A+",
    lastVisit: "১৮ ডিসেম্বর, ২০২৪",
    condition: "ডায়াবেটিস",
    status: "চিকিৎসাধীন",
    totalVisits: 8,
    nextAppointment: "২৫ ডিসেম্বর, ২০২৪",
  },
  {
    id: 3,
    name: "করিম আহমেদ",
    age: 52,
    gender: "পুরুষ",
    phone: "০১৯১২৩৪৫৬৭৮",
    email: "karim@email.com",
    address: "সিলেট, বাংলাদেশ",
    bloodGroup: "O+",
    lastVisit: "১৫ ডিসেম্বর, ২০২৪",
    condition: "হৃদরোগ",
    status: "জরুরি",
    totalVisits: 15,
    nextAppointment: "২৬ ডিসেম্বর, ২০২৪",
  },
  {
    id: 4,
    name: "সালমা বেগম",
    age: 29,
    gender: "মহিলা",
    phone: "০১৬১২৩৪৫৬৭৮",
    email: "salma@email.com",
    address: "রাজশাহী, বাংলাদেশ",
    bloodGroup: "AB+",
    lastVisit: "২২ ডিসেম্বর, ২০২৪",
    condition: "গর্ভকালীন যত্ন",
    status: "নিয়মিত",
    totalVisits: 6,
    nextAppointment: "৩০ ডিসেম্বর, ২০২৪",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "নিয়মিত":
      return "bg-green-100 text-green-800";
    case "চিকিৎসাধীন":
      return "bg-blue-100 text-blue-800";
    case "জরুরি":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function DoctorPatients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("সব");
  const [genderFilter, setGenderFilter] = useState("সব");

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "সব" || patient.status === statusFilter;
    const matchesGender =
      genderFilter === "সব" || patient.gender === genderFilter;
    return matchesSearch && matchesStatus && matchesGender;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-sky-800">রোগীর বিস্তারিত</h1>
            <p className="text-sky-600">
              আপনার সব রোগীর তথ্য দেখুন এবং পরিচালনা করুন
            </p>
          </div>
          <Button className="bg-sky-500 hover:bg-sky-600">
            <Plus className="w-4 h-4 mr-2" />
            নতুন রোগী যোগ করুন
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-sky-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">মোট রোগী</p>
                  <p className="text-2xl font-bold">{patients.length}</p>
                </div>
                <User className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">নিয়মিত রোগী</p>
                  <p className="text-2xl font-bold">
                    {patients.filter((p) => p.status === "নিয়মিত").length}
                  </p>
                </div>
                <Heart className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">জরুরি রোগী</p>
                  <p className="text-2xl font-bold">
                    {patients.filter((p) => p.status === "জরুরি").length}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">চিকিৎসাধীন</p>
                  <p className="text-2xl font-bold">
                    {patients.filter((p) => p.status === "চিকিৎসাধীন").length}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-4 h-4" />
                  <Input
                    placeholder="রোগীর নাম, ফোন বা রোগ খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="সব">সব স্ট্যাটাস</SelectItem>
                  <SelectItem value="নিয়মিত">নিয়মিত</SelectItem>
                  <SelectItem value="চিকিৎসাধীন">চিকিৎসাধীন</SelectItem>
                  <SelectItem value="জরুরি">জরুরি</SelectItem>
                </SelectContent>
              </Select>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="লিঙ্গ ফিল্টার" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="সব">সব লিঙ্গ</SelectItem>
                  <SelectItem value="পুরুষ">পুরুষ</SelectItem>
                  <SelectItem value="মহিলা">মহিলা</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Patients List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="space-y-4">
          {filteredPatients.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <User className="w-12 h-12 text-sky-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-sky-800 mb-2">
                  কোন রোগী পাওয়া যায়নি
                </h3>
                <p className="text-sky-600">
                  আপনার অনুসন্ধানের সাথে মিলে এমন কোন রোগী নেই।
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPatients.map((patient) => (
              <Card
                key={patient.id}
                className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={`/placeholder.svg?height=64&width=64&text=${patient.name.charAt(
                            0
                          )}`}
                        />
                        <AvatarFallback className="bg-sky-100 text-sky-800 text-lg">
                          {patient.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-sky-800 text-lg">
                          {patient.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-sky-600">
                          <span>{patient.age} বছর</span>
                          <span>•</span>
                          <span>{patient.gender}</span>
                          <span>•</span>
                          <span>{patient.bloodGroup}</span>
                        </div>
                        <Badge
                          className={getStatusColor(patient.status)}
                          variant="secondary"
                        >
                          {patient.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="flex items-center gap-1 text-sky-600 mb-1">
                          <Phone className="w-4 h-4" />
                          <span className="font-medium">ফোন:</span>
                        </div>
                        <p className="text-sky-800">{patient.phone}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-sky-600 mb-1">
                          <FileText className="w-4 h-4" />
                          <span className="font-medium">রোগ:</span>
                        </div>
                        <p className="text-sky-800">{patient.condition}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-sky-600 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">শেষ ভিজিট:</span>
                        </div>
                        <p className="text-sky-800">{patient.lastVisit}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-sky-600 mb-1">
                          <User className="w-4 h-4" />
                          <span className="font-medium">মোট ভিজিট:</span>
                        </div>
                        <p className="text-sky-800">
                          {patient.totalVisits} বার
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-sky-600 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">
                            পরবর্তী অ্যাপয়েন্টমেন্ট:
                          </span>
                        </div>
                        <p className="text-sky-800">
                          {patient.nextAppointment}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-sky-600 mb-1">
                          <User className="w-4 h-4" />
                          <span className="font-medium">ঠিকানা:</span>
                        </div>
                        <p className="text-sky-800">{patient.address}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
                        <Eye className="w-4 h-4 mr-1" />
                        বিস্তারিত দেখুন
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        সম্পাদনা
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-1" />
                        প্রেসক্রিপশন
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
