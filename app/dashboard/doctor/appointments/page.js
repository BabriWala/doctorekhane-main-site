"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Phone,
  Video,
  User,
  Search,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const appointments = [
  {
    id: 1,
    patient: "রহিম উদ্দিন",
    phone: "০১৭১২৩৪৫৬৭৮",
    date: "২৫ ডিসেম্বর, ২০২৪",
    time: "১০:৩০ AM",
    type: "নিয়মিত চেকআপ",
    status: "নিশ্চিত",
    mode: "অফলাইন",
    duration: "৩০ মিনিট",
    fee: "১৫০০",
  },
  {
    id: 2,
    patient: "ফাতেমা খাতুন",
    phone: "০১৮১২৩৪৫৬৭৮",
    date: "২৫ ডিসেম্বর, ২০২৪",
    time: "১১:০০ AM",
    type: "ফলোআপ",
    status: "অপেক্ষমাণ",
    mode: "টেলিমেডিসিন",
    duration: "২০ মিনিট",
    fee: "১০০০",
  },
  {
    id: 3,
    patient: "করিম আহমেদ",
    phone: "০১৯১২৩৪৫৬৭৮",
    date: "২৫ ডিসেম্বর, ২০২৪",
    time: "১১:৩০ AM",
    type: "জরুরি পরামর্শ",
    status: "বাতিল",
    mode: "অফলাইন",
    duration: "৪৫ মিনিট",
    fee: "২০০০",
  },
  {
    id: 4,
    patient: "সালমা বেগম",
    phone: "০১৬১২৩৪৫৬৭৮",
    date: "২৬ ডিসেম্বর, ২০২৪",
    time: "০৯:০০ AM",
    type: "নিয়মিত চেকআপ",
    status: "নিশ্চিত",
    mode: "অফলাইন",
    duration: "৩০ মিনিট",
    fee: "১৫০০",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "নিশ্চিত":
      return "bg-green-100 text-green-800";
    case "অপেক্ষমাণ":
      return "bg-yellow-100 text-yellow-800";
    case "বাতিল":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "নিশ্চিত":
      return <CheckCircle className="w-4 h-4" />;
    case "অপেক্ষমাণ":
      return <AlertCircle className="w-4 h-4" />;
    case "বাতিল":
      return <XCircle className="w-4 h-4" />;
    default:
      return null;
  }
};

export default function DoctorAppointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("সব");
  const [dateFilter, setDateFilter] = useState("আজ");

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.patient
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "সব" || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const todayAppointments = filteredAppointments.filter(
    (apt) => apt.date === "২৫ ডিসেম্বর, ২০২৪"
  );
  const upcomingAppointments = filteredAppointments.filter(
    (apt) => apt.date !== "২৫ ডিসেম্বর, ২০২৪"
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-sky-800">
              অ্যাপয়েন্টমেন্ট ব্যবস্থাপনা
            </h1>
            <p className="text-sky-600">
              আপনার সব অ্যাপয়েন্টমেন্ট দেখুন এবং পরিচালনা করুন
            </p>
          </div>
          <Button className="bg-sky-500 hover:bg-sky-600">
            <Plus className="w-4 h-4 mr-2" />
            নতুন অ্যাপয়েন্টমেন্ট
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
                  <p className="text-blue-100">আজকের অ্যাপয়েন্টমেন্ট</p>
                  <p className="text-2xl font-bold">
                    {todayAppointments.length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-200" />
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
                  <p className="text-green-100">নিশ্চিত</p>
                  <p className="text-2xl font-bold">
                    {appointments.filter((a) => a.status === "নিশ্চিত").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">অপেক্ষমাণ</p>
                  <p className="text-2xl font-bold">
                    {
                      appointments.filter((a) => a.status === "অপেক্ষমাণ")
                        .length
                    }
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">মোট আয়</p>
                  <p className="text-2xl font-bold">৳১২,০০০</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-200" />
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
                    placeholder="রোগীর নাম খুঁজুন..."
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
                  <SelectItem value="নিশ্চিত">নিশ্চিত</SelectItem>
                  <SelectItem value="অপেক্ষমাণ">অপেক্ষমাণ</SelectItem>
                  <SelectItem value="বাতিল">বাতিল</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="তারিখ ফিল্টার" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="আজ">আজ</SelectItem>
                  <SelectItem value="আগামীকাল">আগামীকাল</SelectItem>
                  <SelectItem value="এই সপ্তাহ">এই সপ্তাহ</SelectItem>
                  <SelectItem value="এই মাস">এই মাস</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Appointments Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Tabs defaultValue="today" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="today">
              আজকের অ্যাপয়েন্টমেন্ট ({todayAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              আসন্ন অ্যাপয়েন্টমেন্ট ({upcomingAppointments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            {todayAppointments.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-sky-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-sky-800 mb-2">
                    আজ কোন অ্যাপয়েন্টমেন্ট নেই
                  </h3>
                  <p className="text-sky-600">
                    আজকের জন্য কোন অ্যাপয়েন্টমেন্ট নির্ধারিত নেই।
                  </p>
                </CardContent>
              </Card>
            ) : (
              todayAppointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <User className="w-5 h-5 text-sky-600" />
                          <h3 className="font-semibold text-sky-800">
                            {appointment.patient}
                          </h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusIcon(appointment.status)}
                            <span className="ml-1">{appointment.status}</span>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-sky-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.time} ({appointment.duration})
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {appointment.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            {appointment.mode === "টেলিমেডিসিন" ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                            {appointment.mode}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm font-medium text-sky-700">
                            ধরন:{" "}
                          </span>
                          <span className="text-sm text-sky-600">
                            {appointment.type}
                          </span>
                          <span className="ml-4 text-sm font-medium text-green-600">
                            ফি: ৳{appointment.fee}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {appointment.status === "অপেক্ষমাণ" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                            >
                              নিশ্চিত করুন
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                            >
                              বাতিল করুন
                            </Button>
                          </>
                        )}
                        {appointment.status === "নিশ্চিত" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-sky-500 hover:bg-sky-600"
                            >
                              {appointment.mode === "টেলিমেডিসিন"
                                ? "ভিডিও কল"
                                : "শুরু করুন"}
                            </Button>
                            <Button size="sm" variant="outline">
                              পুনঃনির্ধারণ
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          বিস্তারিত
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-sky-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-sky-800 mb-2">
                    কোন আসন্ন অ্যাপয়েন্টমেন্ট নেই
                  </h3>
                  <p className="text-sky-600">
                    আসন্ন দিনগুলোর জন্য কোন অ্যাপয়েন্টমেন্ট নির্ধারিত নেই।
                  </p>
                </CardContent>
              </Card>
            ) : (
              upcomingAppointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <User className="w-5 h-5 text-sky-600" />
                          <h3 className="font-semibold text-sky-800">
                            {appointment.patient}
                          </h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusIcon(appointment.status)}
                            <span className="ml-1">{appointment.status}</span>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-sky-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {appointment.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            {appointment.mode === "টেলিমেডিসিন" ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                            {appointment.mode}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm font-medium text-sky-700">
                            ধরন:{" "}
                          </span>
                          <span className="text-sm text-sky-600">
                            {appointment.type}
                          </span>
                          <span className="ml-4 text-sm font-medium text-green-600">
                            ফি: ৳{appointment.fee}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          পুনঃনির্ধারণ
                        </Button>
                        <Button size="sm" variant="outline">
                          বিস্তারিত
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
