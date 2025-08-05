"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const monthlyData = [
  { month: "জানুয়ারি", patients: 85, revenue: 127500, appointments: 92 },
  { month: "ফেব্রুয়ারি", patients: 92, revenue: 138000, appointments: 98 },
  { month: "মার্চ", patients: 78, revenue: 117000, appointments: 85 },
  { month: "এপ্রিল", patients: 105, revenue: 157500, appointments: 112 },
  { month: "মে", patients: 98, revenue: 147000, appointments: 105 },
  { month: "জুন", patients: 112, revenue: 168000, appointments: 118 },
  { month: "জুলাই", patients: 125, revenue: 187500, appointments: 132 },
  { month: "আগস্ট", patients: 118, revenue: 177000, appointments: 125 },
  { month: "সেপ্টেম্বর", patients: 135, revenue: 202500, appointments: 142 },
  { month: "অক্টোবর", patients: 142, revenue: 213000, appointments: 148 },
  { month: "নভেম্বর", patients: 128, revenue: 192000, appointments: 135 },
  { month: "ডিসেম্বর", patients: 155, revenue: 232500, appointments: 162 },
];

const patientTypes = [
  { type: "নিয়মিত রোগী", count: 245, percentage: 65, color: "bg-blue-500" },
  { type: "নতুন রোগী", count: 89, percentage: 24, color: "bg-green-500" },
  { type: "জরুরি রোগী", count: 42, percentage: 11, color: "bg-red-500" },
];

const topConditions = [
  { condition: "উচ্চ রক্তচাপ", patients: 78, percentage: 32 },
  { condition: "ডায়াবেটিস", patients: 65, percentage: 27 },
  { condition: "হৃদরোগ", patients: 45, percentage: 18 },
  { condition: "শ্বাসকষ্ট", patients: 32, percentage: 13 },
  { condition: "অন্যান্য", patients: 25, percentage: 10 },
];

const weeklyStats = [
  { day: "রবি", appointments: 18, revenue: 27000 },
  { day: "সোম", appointments: 22, revenue: 33000 },
  { day: "মঙ্গল", appointments: 20, revenue: 30000 },
  { day: "বুধ", appointments: 25, revenue: 37500 },
  { day: "বৃহ", appointments: 19, revenue: 28500 },
  { day: "শুক্র", appointments: 0, revenue: 0 },
  { day: "শনি", appointments: 15, revenue: 22500 },
];

export default function DoctorAnalytics() {
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];

  const patientGrowth = (
    ((currentMonth.patients - previousMonth.patients) /
      previousMonth.patients) *
    100
  ).toFixed(1);
  const revenueGrowth = (
    ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) *
    100
  ).toFixed(1);
  const appointmentGrowth = (
    ((currentMonth.appointments - previousMonth.appointments) /
      previousMonth.appointments) *
    100
  ).toFixed(1);

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
              পরিসংখ্যান ও আয়
            </h1>
            <p className="text-sky-600">
              আপনার প্র্যাকটিসের বিস্তারিত বিশ্লেষণ
            </p>
          </div>
          <Select defaultValue="এই মাস">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="সময়কাল নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="এই সপ্তাহ">এই সপ্তাহ</SelectItem>
              <SelectItem value="এই মাস">এই মাস</SelectItem>
              <SelectItem value="গত ৩ মাস">গত ৩ মাস</SelectItem>
              <SelectItem value="এই বছর">এই বছর</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Key Metrics */}
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
                  <p className="text-2xl font-bold">{currentMonth.patients}</p>
                  <p className="text-xs text-blue-200">
                    {patientGrowth > 0 ? "+" : ""}
                    {patientGrowth}% গত মাস থেকে
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
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
                  <p className="text-green-100">মাসিক আয়</p>
                  <p className="text-2xl font-bold">
                    ৳{currentMonth.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-200">
                    {revenueGrowth > 0 ? "+" : ""}
                    {revenueGrowth}% গত মাস থেকে
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-200" />
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
                  <p className="text-purple-100">অ্যাপয়েন্টমেন্ট</p>
                  <p className="text-2xl font-bold">
                    {currentMonth.appointments}
                  </p>
                  <p className="text-xs text-purple-200">
                    {appointmentGrowth > 0 ? "+" : ""}
                    {appointmentGrowth}% গত মাস থেকে
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-200" />
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
                  <p className="text-orange-100">গড় ফি</p>
                  <p className="text-2xl font-bold">
                    ৳
                    {Math.round(
                      currentMonth.revenue / currentMonth.appointments
                    )}
                  </p>
                  <p className="text-xs text-orange-200">
                    প্রতি অ্যাপয়েন্টমেন্ট
                  </p>
                </div>
                <Activity className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-sky-800">
                <TrendingUp className="w-5 h-5 mr-2" />
                মাসিক প্রবণতা
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.slice(-6).map((data, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-sky-200 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-sky-800">{data.month}</h4>
                      <p className="text-sm text-sky-600">
                        {data.patients} রোগী
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">
                        ৳{data.revenue.toLocaleString()}
                      </p>
                      <p className="text-sm text-sky-600">
                        {data.appointments} অ্যাপয়েন্টমেন্ট
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Patient Types */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-sky-800">
                <PieChart className="w-5 h-5 mr-2" />
                রোগীর ধরন
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientTypes.map((type, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sky-800 font-medium">
                        {type.type}
                      </span>
                      <span className="text-sky-600">{type.count} জন</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${type.color} h-2 rounded-full`}
                        style={{ width: `${type.percentage}%` }}
                      />
                    </div>
                    <div className="text-right text-sm text-sky-600">
                      {type.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Conditions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-sky-800">
                <BarChart3 className="w-5 h-5 mr-2" />
                প্রধান রোগসমূহ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topConditions.map((condition, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sky-800 font-medium">
                        {condition.condition}
                      </span>
                      <span className="text-sky-600">
                        {condition.patients} জন
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-sky-500 h-2 rounded-full"
                        style={{ width: `${condition.percentage}%` }}
                      />
                    </div>
                    <div className="text-right text-sm text-sky-600">
                      {condition.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-sky-800">
                <Clock className="w-5 h-5 mr-2" />
                সাপ্তাহিক পারফরমেন্স
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weeklyStats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center p-3 rounded-lg transition-colors ${
                      stat.appointments === 0
                        ? "bg-red-50 border border-red-200"
                        : "bg-sky-50 border border-sky-200 hover:bg-sky-100"
                    }`}
                  >
                    <div className="text-sm font-medium text-sky-800 mb-1">
                      {stat.day}
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-sky-700">
                        {stat.appointments}
                      </div>
                      <div className="text-xs text-sky-600">
                        অ্যাপয়েন্টমেন্ট
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        {stat.revenue === 0
                          ? "বন্ধ"
                          : `৳${stat.revenue.toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <CardContent className="p-4 text-center">
              <h3 className="font-medium mb-2">বার্ষিক লক্ষ্য</h3>
              <div className="text-2xl font-bold mb-1">৭৫%</div>
              <p className="text-sm text-indigo-200">
                ১২০০ রোগীর মধ্যে ৯০০ সম্পন্ন
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
            <CardContent className="p-4 text-center">
              <h3 className="font-medium mb-2">রোগী সন্তুষ্টি</h3>
              <div className="text-2xl font-bold mb-1">৪.৮/৫</div>
              <p className="text-sm text-teal-200">২৪৫ টি রিভিউর ভিত্তিতে</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
            <CardContent className="p-4 text-center">
              <h3 className="font-medium mb-2">গড় অপেক্ষার সময়</h3>
              <div className="text-2xl font-bold mb-1">১৫ মিনিট</div>
              <p className="text-sm text-rose-200">
                গত মাসের তুলনায় ৫ মিনিট কম
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
