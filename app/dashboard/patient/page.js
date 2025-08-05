"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  FileText,
  MapPin,
  Download,
  Clock,
  User,
  Phone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const upcomingAppointments = [
  {
    id: 1,
    doctor: "ডা. রহিম উদ্দিন",
    specialty: "হৃদরোগ বিশেষজ্ঞ",
    date: "২৫ ডিসেম্বর, ২০২৪",
    time: "১০:৩০ AM",
    hospital: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
    type: "সরাসরি চেম্বারে",
  },
  {
    id: 2,
    doctor: "ডা. ফাতেমা খাতুন",
    specialty: "শিশু বিশেষজ্ঞ",
    date: "২৮ ডিসেম্বর, ২০২৪",
    time: "২:০০ PM",
    hospital: "বারডেম হাসপাতাল",
    type: "টেলিমেডিসিন",
  },
];

const recentPrescriptions = [
  {
    id: 1,
    doctor: "ডা. করিম আহমেদ",
    date: "২০ ডিসেম্বর, ২০২৪",
    diagnosis: "উচ্চ রক্তচাপ",
    medicines: ["এমলোডিপিন ৫mg", "হাইড্রোক্লোরোথায়াজাইড ২৫mg"],
  },
  {
    id: 2,
    doctor: "ডা. নাসির উদ্দিন",
    date: "১৫ ডিসেম্বর, ২০২৪",
    diagnosis: "ডায়াবেটিস নিয়ন্ত্রণ",
    medicines: ["মেটফরমিন ৫০০mg", "গ্লিমেপিরাইড ২mg"],
  },
];

const nearbyHospitals = [
  { name: "ঢাকা মেডিকেল কলেজ হাসপাতাল", distance: "২.৫ কিমি", emergency: true },
  { name: "বারডেম হাসপাতাল", distance: "৩.২ কিমি", emergency: true },
  { name: "স্কয়ার হাসপাতাল", distance: "৪.১ কিমি", emergency: false },
];

export default function PatientDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-sky-800 mb-2">
          স্বাগতম, রহিম উদ্দিন
        </h1>
        <p className="text-sky-600">
          আপনার স্বাস্থ্য তথ্য এবং অ্যাপয়েন্টমেন্ট ব্যবস্থাপনা
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
                  <p className="text-sky-100">আসন্ন অ্যাপয়েন্টমেন্ট</p>
                  <p className="text-2xl font-bold">২</p>
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
                  <p className="text-green-100">মোট প্রেসক্রিপশন</p>
                  <p className="text-2xl font-bold">১২</p>
                </div>
                <FileText className="w-8 h-8 text-green-200" />
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
                  <p className="text-purple-100">প্রিয় ডাক্তার</p>
                  <p className="text-2xl font-bold">৫</p>
                </div>
                <User className="w-8 h-8 text-purple-200" />
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
                  <p className="text-orange-100">রিমাইন্ডার</p>
                  <p className="text-2xl font-bold">৩</p>
                </div>
                <Clock className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-sky-800">
                <Calendar className="w-5 h-5 mr-2" />
                আসন্ন অ্যাপয়েন্টমেন্ট
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-sky-800">
                        {appointment.doctor}
                      </h4>
                      <p className="text-sm text-sky-600">
                        {appointment.specialty}
                      </p>
                    </div>
                    <Badge
                      variant={
                        appointment.type === "টেলিমেডিসিন"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {appointment.type}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-sky-600 mb-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {appointment.date} - {appointment.time}
                  </div>
                  <div className="flex items-center text-sm text-sky-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {appointment.hospital}
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline">
                      বাতিল করুন
                    </Button>
                    <Button size="sm" variant="outline">
                      সময় পরিবর্তন
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

        {/* Recent Prescriptions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-sky-800">
                <FileText className="w-5 h-5 mr-2" />
                সর্বশেষ প্রেসক্রিপশন
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="p-4 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-sky-800">
                        {prescription.doctor}
                      </h4>
                      <p className="text-sm text-sky-600">
                        {prescription.date}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      ডাউনলোড
                    </Button>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm font-medium text-sky-700">
                      রোগ নির্ণয়:
                    </p>
                    <p className="text-sm text-sky-600">
                      {prescription.diagnosis}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-sky-700">ওষুধ:</p>
                    <ul className="text-sm text-sky-600">
                      {prescription.medicines.map((medicine, index) => (
                        <li key={index}>• {medicine}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-sky-500 hover:bg-sky-600">
                সব প্রেসক্রিপশন দেখুন
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Nearby Hospitals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-sky-800">
              <MapPin className="w-5 h-5 mr-2" />
              নিকটবর্তী হাসপাতাল
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nearbyHospitals.map((hospital, index) => (
                <div
                  key={index}
                  className="p-4 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sky-800">
                      {hospital.name}
                    </h4>
                    {hospital.emergency && (
                      <Badge variant="destructive" className="text-xs">
                        জরুরি
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-sky-600 mb-3">
                    {hospital.distance} দূরে
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-1" />
                      কল করুন
                    </Button>
                    <Button size="sm" variant="outline">
                      <MapPin className="w-4 h-4 mr-1" />
                      দিকনির্দেশ
                    </Button>
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
                <Calendar className="w-6 h-6 mb-2" />
                নতুন অ্যাপয়েন্টমেন্ট
              </Button>
              <Button className="h-20 flex flex-col bg-green-500 hover:bg-green-600">
                <FileText className="w-6 h-6 mb-2" />
                রিপোর্ট আপলোড
              </Button>
              <Button className="h-20 flex flex-col bg-purple-500 hover:bg-purple-600">
                <User className="w-6 h-6 mb-2" />
                ডাক্তার খুঁজুন
              </Button>
              <Button className="h-20 flex flex-col bg-orange-500 hover:bg-orange-600">
                <Phone className="w-6 h-6 mb-2" />
                জরুরি সেবা
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
