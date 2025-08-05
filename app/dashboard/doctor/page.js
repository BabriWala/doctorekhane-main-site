"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  DollarSign,
  Star,
  Clock,
  Phone,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const todayAppointments = [
  {
    id: 1,
    patient: "রহিম উদ্দিন",
    time: "১০:৩০ AM",
    type: "নিয়মিত চেকআপ",
    status: "আসন্ন",
    phone: "০১৭১২৩৪৫৬৭৮",
  },
  {
    id: 2,
    patient: "ফাতেমা খাতুন",
    time: "১১:০০ AM",
    type: "ফলোআপ",
    status: "আসন্ন",
    phone: "০১৮১২৩৪৫৬৭৮",
  },
  {
    id: 3,
    patient: "করিম আহমেদ",
    time: "১১:৩০ AM",
    type: "টেলিমেডিসিন",
    status: "আসন্ন",
    phone: "০১৯১২৩৪৫৬৭৮",
  },
];

const recentPatients = [
  {
    id: 1,
    name: "সালমা বেগম",
    lastVisit: "২০ ডিসেম্বর, ২০২৪",
    condition: "উচ্চ রক্তচাপ",
    status: "স্থিতিশীল",
  },
  {
    id: 2,
    name: "নাসির উদ্দিন",
    lastVisit: "১৮ ডিসেম্বর, ২০২৪",
    condition: "ডায়াবেটিস",
    status: "নিয়ন্ত্রণে",
  },
  {
    id: 3,
    name: "রাশিদা খাতুন",
    lastVisit: "১৫ ডিসেম্বর, ২০২৪",
    condition: "হৃদরোগ",
    status: "উন্নতি",
  },
];

const weeklyStats = [
  { day: "রবি", appointments: 8, revenue: 8000 },
  { day: "সোম", appointments: 12, revenue: 12000 },
  { day: "মঙ্গল", appointments: 10, revenue: 10000 },
  { day: "বুধ", appointments: 15, revenue: 15000 },
  { day: "বৃহ", appointments: 9, revenue: 9000 },
  { day: "শুক্র", appointments: 11, revenue: 11000 },
  { day: "শনি", appointments: 6, revenue: 6000 },
];

export default function DoctorDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-sky-800 mb-2">
          স্বাগতম, ডা. রহিম উদ্দিন
        </h1>
        <p className="text-sky-600">
          আপনার রোগী এবং অ্যাপয়েন্টমেন্ট ব্যবস্থাপনা
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-sky-500 to-blue-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sky-100">আজকের অ্যাপয়েন্টমেন্ট</p>
                  <p className="text-2xl font-bold">
                    {todayAppointments.length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-sky-200" />
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
                  <p className="text-green-100">মোট রোগী</p>
                  <p className="text-2xl font-bold">২৪৮</p>
                </div>
                <Users className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">এই মাসের আয়</p>
                  <p className="text-2xl font-bold">৳৭১,০০০</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">গড় রেটিং</p>
                  <p className="text-2xl font-bold">৪.৮</p>
                </div>
                <Star className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-sky-800">
                <Calendar className="w-5 h-5 mr-2" />
                আজকের অ্যাপয়েন্টমেন্ট
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-sky-800">
                        {appointment.patient}
                      </h4>
                      <p className="text-sm text-sky-600">{appointment.type}</p>
                    </div>
                    <Badge
                      variant={
                        appointment.status === "আসন্ন" ? "default" : "secondary"
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-sky-600 mb-3">
                    <Clock className="w-4 h-4 mr-1" />
                    {appointment.time}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-1" />
                      কল করুন
                    </Button>
                    <Button size="sm" variant="outline">
                      বিস্তারিত দেখুন
                    </Button>
                    <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
                      শুরু করুন
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-sky-500 hover:bg-sky-600">
                সব অ্যাপয়েন্টমেন্ট দেখুন
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Patients */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-sky-800">
                <Users className="w-5 h-5 mr-2" />
                সাম্প্রতিক রোগী
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-sky-800">
                        {patient.name}
                      </h4>
                      <p className="text-sm text-sky-600">
                        {patient.condition}
                      </p>
                    </div>
                    <Badge
                      className={
                        patient.status === "স্থিতিশীল"
                          ? "bg-green-100 text-green-800"
                          : patient.status === "নিয়ন্ত্রণে"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {patient.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-sky-600 mb-3">
                    শেষ ভিজিট: {patient.lastVisit}
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      ইতিহাস দেখুন
                    </Button>
                    <Button size="sm" variant="outline">
                      প্রেসক্রিপশন
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-sky-500 hover:bg-sky-600">
                সব রোগী দেখুন
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-sky-800">
              <TrendingUp className="w-5 h-5 mr-2" />
              সাপ্তাহিক পারফরমেন্স
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {weeklyStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors"
                >
                  <div className="text-sm font-medium text-sky-800 mb-2">
                    {stat.day}
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-sky-700">
                      {stat.appointments}
                    </div>
                    <div className="text-xs text-sky-600">অ্যাপয়েন্টমেন্ট</div>
                    <div className="text-sm font-medium text-green-600">
                      ৳{stat.revenue.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sky-800">দ্রুত কাজ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col bg-sky-500 hover:bg-sky-600">
                <Clock className="w-6 h-6 mb-2" />
                চেম্বার সময় হালনাগাদ
              </Button>
              <Button className="h-20 flex flex-col bg-green-500 hover:bg-green-600">
                <Users className="w-6 h-6 mb-2" />
                নতুন রোগী যোগ
              </Button>
              <Button className="h-20 flex flex-col bg-purple-500 hover:bg-purple-600">
                <Calendar className="w-6 h-6 mb-2" />
                অ্যাপয়েন্টমেন্ট দেখুন
              </Button>
              <Button className="h-20 flex flex-col bg-orange-500 hover:bg-orange-600">
                <Star className="w-6 h-6 mb-2" />
                রিভিউ দেখুন
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
