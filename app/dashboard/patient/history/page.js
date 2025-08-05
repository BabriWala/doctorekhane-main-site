"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  User,
  MapPin,
  FileText,
  Clock,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const medicalHistory = [
  {
    id: 1,
    date: "২০ ডিসেম্বর, ২০২৪",
    doctor: "ডা. রহিম উদ্দিন",
    specialty: "হৃদরোগ বিশেষজ্ঞ",
    hospital: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
    diagnosis: "উচ্চ রক্তচাপ",
    symptoms: ["বুকে ব্যথা", "শ্বাসকষ্ট", "মাথা ঘোরা"],
    treatment: "ওষুধ প্রদান ও জীবনযাত্রার পরিবর্তন",
    followUp: "১ মাস পর",
    severity: "মাঝারি",
  },
  {
    id: 2,
    date: "১৫ ডিসেম্বর, ২০২৪",
    doctor: "ডা. ফাতেমা খাতুন",
    specialty: "শিশু বিশেষজ্ঞ",
    hospital: "বারডেম হাসপাতাল",
    diagnosis: "ভাইরাল জ্বর",
    symptoms: ["জ্বর", "গলা ব্যথা", "কাশি"],
    treatment: "প্যারাসিটামল ও বিশ্রাম",
    followUp: "প্রয়োজন অনুযায়ী",
    severity: "হালকা",
  },
  {
    id: 3,
    date: "১০ ডিসেম্বর, ২০২৪",
    doctor: "ডা. করিম আহমেদ",
    specialty: "অর্থোপেডিক সার্জন",
    hospital: "স্কয়ার হাসপাতাল",
    diagnosis: "হাঁটুর ব্যথা",
    symptoms: ["হাঁটুতে ব্যথা", "ফোলা", "চলাফেরায় অসুবিধা"],
    treatment: "ফিজিওথেরাপি ও ব্যথানাশক",
    followUp: "২ সপ্তাহ পর",
    severity: "মাঝারি",
  },
  {
    id: 4,
    date: "৫ ডিসেম্বর, ২০২৪",
    doctor: "ডা. নাসির উদ্দিন",
    specialty: "ডায়াবেটিস বিশেষজ্ঞ",
    hospital: "বারড��ম হাসপাতাল",
    diagnosis: "ডায়াবেটিস নিয়ন্ত্রণ",
    symptoms: ["ঘন ঘন প্রস্রাব", "তৃষ্ণা", "ক্লান্তি"],
    treatment: "ইনসুলিন ডোজ সমন্বয়",
    followUp: "৩ মাস পর",
    severity: "গুরুতর",
  },
];

const chronicConditions = [
  {
    condition: "উচ্চ রক্তচাপ",
    diagnosedDate: "জানুয়ারি ২০২৩",
    status: "নিয়ন্ত্রণে",
    lastCheckup: "২০ ডিসেম্বর, ২০২৪",
  },
  {
    condition: "ডায়াবেটিস টাইপ ২",
    diagnosedDate: "মার্চ ২০২২",
    status: "নিয়ন্ত্রণে",
    lastCheckup: "৫ ডিসেম্বর, ২০২৪",
  },
];

const allergies = [
  { allergen: "পেনিসিলিন", reaction: "র‍্যাশ", severity: "মাঝারি" },
  { allergen: "চিংড়ি", reaction: "শ্বাসকষ্ট", severity: "গুরুতর" },
];

export default function HistoryPage() {
  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "হালকা":
        return <Badge className="bg-green-100 text-green-800">হালকা</Badge>;
      case "মাঝারি":
        return <Badge className="bg-yellow-100 text-yellow-800">মাঝারি</Badge>;
      case "গুরুতর":
        return <Badge className="bg-red-100 text-red-800">গুরুতর</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    return status === "নিয়ন্ত্রণে" ? (
      <Badge className="bg-green-100 text-green-800">নিয়ন্ত্রণে</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">অনিয়ন্ত্রিত</Badge>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-sky-800 mb-2">রোগীর ইতিহাস</h1>
        <p className="text-sky-600">
          আপনার সম্পূর্ণ চিকিৎসা ইতিহাস এবং স্বাস্থ্য তথ্য
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-sky-500 to-blue-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sky-100">মোট ভিজিট</p>
                  <p className="text-2xl font-bold">{medicalHistory.length}</p>
                </div>
                <Activity className="w-8 h-8 text-sky-200" />
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
                  <p className="text-green-100">দীর্ঘমেয়াদী রোগ</p>
                  <p className="text-2xl font-bold">
                    {chronicConditions.length}
                  </p>
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
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">অ্যালার্জি</p>
                  <p className="text-2xl font-bold">{allergies.length}</p>
                </div>
                <Activity className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medical History Timeline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-sky-800">
                <Clock className="w-5 h-5 mr-2" />
                চিকিৎসা ইতিহাস
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {medicalHistory.map((record, index) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="relative pl-8 pb-6 border-l-2 border-sky-200 last:border-l-0"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-sky-500 rounded-full"></div>

                  <div className="bg-sky-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Calendar className="w-4 h-4 text-sky-600" />
                          <span className="text-sm font-medium text-sky-800">
                            {record.date}
                          </span>
                        </div>
                        <h3 className="font-medium text-sky-800">
                          {record.diagnosis}
                        </h3>
                      </div>
                      {getSeverityBadge(record.severity)}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="flex items-center text-sm text-sky-600 mb-1">
                          <User className="w-4 h-4 mr-1" />
                          {record.doctor}
                        </div>
                        <p className="text-xs text-sky-500">
                          {record.specialty}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center text-sm text-sky-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {record.hospital}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-sky-700">
                          লক্ষণসমূহ:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {record.symptoms.map((symptom, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-sky-700">
                          চিকিৎসা:
                        </span>
                        <p className="text-sm text-sky-600">
                          {record.treatment}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-sky-700">
                          পরবর্তী ভিজিট:
                        </span>
                        <p className="text-sm text-sky-600">
                          {record.followUp}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar with Chronic Conditions and Allergies */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {/* Chronic Conditions */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sky-800">দীর্ঘমেয়াদী রোগ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {chronicConditions.map((condition, index) => (
                <div
                  key={index}
                  className="p-3 border border-sky-200 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sky-800">
                      {condition.condition}
                    </h4>
                    {getStatusBadge(condition.status)}
                  </div>
                  <div className="text-sm text-sky-600 space-y-1">
                    <p>নির্ণয়: {condition.diagnosedDate}</p>
                    <p>শেষ চেকআপ: {condition.lastCheckup}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Allergies */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sky-800">অ্যালার্জি</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {allergies.map((allergy, index) => (
                <div
                  key={index}
                  className="p-3 border border-red-200 rounded-lg bg-red-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-red-800">
                      {allergy.allergen}
                    </h4>
                    {getSeverityBadge(allergy.severity)}
                  </div>
                  <p className="text-sm text-red-600">
                    প্রতিক্রিয়া: {allergy.reaction}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sky-800">দ্রুত কাজ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-sky-500 hover:bg-sky-600">
                <FileText className="w-4 h-4 mr-2" />
                সম্পূর্ণ রিপোর্ট ডাউনলোড
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <User className="w-4 h-4 mr-2" />
                ডাক্তারের সাথে শেয়ার করুন
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                নতুন অ্যাপয়েন্টমেন্ট
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
