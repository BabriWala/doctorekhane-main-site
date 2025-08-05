"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Download,
  Search,
  Calendar,
  User,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const prescriptions = [
  {
    id: 1,
    patient: "রহিম উদ্দিন",
    date: "২৩ ডিসেম্বর, ২০২৪",
    diagnosis: "উচ্চ রক্তচাপ",
    medicines: [
      { name: "এমলোডিপিন ৫ মিগ্রা", dosage: "দিনে ১ বার", duration: "৩০ দিন" },
      { name: "লসার্টান ৫০ মিগ্রা", dosage: "দিনে ১ বার", duration: "৩০ দিন" },
    ],
    instructions: "নিয়মিত রক্তচাপ পরিমাপ করুন। লবণ কম খান।",
    nextVisit: "২৩ জানুয়ারি, ২০২৫",
    status: "সক্রিয়",
  },
  {
    id: 2,
    patient: "ফাতেমা খাতুন",
    date: "২২ ডিসেম্বর, ২০২৪",
    diagnosis: "ডায়াবেটিস টাইপ ২",
    medicines: [
      { name: "মেটফরমিন ৫০০ মিগ্রা", dosage: "দিনে ২ বার", duration: "৩০ দিন" },
      {
        name: "গ্লিমেপিরাইড ২ মিগ্রা",
        dosage: "দিনে ১ বার",
        duration: "৩০ দিন",
      },
    ],
    instructions: "খাবারের আগে ওষুধ খান। নিয়মিত ব্যায়াম করুন।",
    nextVisit: "২২ জানুয়ারি, ২০২৫",
    status: "সক্রিয়",
  },
  {
    id: 3,
    patient: "করিম আহমেদ",
    date: "২০ ডিসেম্বর, ২০২৪",
    diagnosis: "হৃদরোগ",
    medicines: [
      {
        name: "এটোরভাস্ট্যাটিন ২০ মিগ্রা",
        dosage: "দিনে ১ বার",
        duration: "৩০ দিন",
      },
      {
        name: "ক্লোপিডোগ্রেল ৭৫ মিগ্রা",
        dosage: "দিনে ১ বার",
        duration: "৩০ দিন",
      },
    ],
    instructions: "চর্বিযুক্ত খাবার এড়িয়ে চলুন। নিয়মিত হাঁটাহাঁটি করুন।",
    nextVisit: "২০ জানুয়ারি, ২০২৫",
    status: "সম্পূর্ণ",
  },
];

export default function DoctorPrescriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("সব");
  const [showNewPrescription, setShowNewPrescription] = useState(false);

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "সব" || prescription.status === statusFilter;
    return matchesSearch && matchesStatus;
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
            <h1 className="text-2xl font-bold text-sky-800">
              প্রেসক্রিপশন আপলোড
            </h1>
            <p className="text-sky-600">
              রোগীদের প্রেসক্রিপশন তৈরি এবং পরিচালনা করুন
            </p>
          </div>
          <Button
            className="bg-sky-500 hover:bg-sky-600"
            onClick={() => setShowNewPrescription(!showNewPrescription)}
          >
            <Plus className="w-4 h-4 mr-2" />
            নতুন প্রেসক্রিপশন
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
                  <p className="text-blue-100">মোট প্রেসক্রিপশন</p>
                  <p className="text-2xl font-bold">{prescriptions.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-200" />
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
                  <p className="text-green-100">সক্রিয় প্রেসক্রিপশন</p>
                  <p className="text-2xl font-bold">
                    {prescriptions.filter((p) => p.status === "সক্রিয়").length}
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
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">এই মাসে</p>
                  <p className="text-2xl font-bold">১৮</p>
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
                  <p className="text-orange-100">সম্পূর্ণ</p>
                  <p className="text-2xl font-bold">
                    {
                      prescriptions.filter((p) => p.status === "সম্পূর্ণ")
                        .length
                    }
                  </p>
                </div>
                <FileText className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* New Prescription Form */}
      {showNewPrescription && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sky-800">
                নতুন প্রেসক্রিপশন তৈরি করুন
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patient">রোগীর নাম</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="রোগী নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rahim">রহিম উদ্দিন</SelectItem>
                      <SelectItem value="fatema">ফাতেমা খাতুন</SelectItem>
                      <SelectItem value="karim">করিম আহমেদ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="diagnosis">রোগ নির্ণয়</Label>
                  <Input placeholder="রোগের নাম লিখুন" />
                </div>
              </div>

              <div>
                <Label htmlFor="medicines">ওষুধের তালিকা</Label>
                <Textarea
                  placeholder="ওষুধের নাম, মাত্রা এবং সেবনবিধি লিখুন"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="instructions">নির্দেশনা</Label>
                <Textarea
                  placeholder="রোগীর জন্য বিশেষ নির্দেশনা লিখুন"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nextVisit">পরবর্তী ভিজিট</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label htmlFor="file">প্রেসক্রিপশন ফাইল আপলোড</Label>
                  <Input type="file" accept=".pdf,.jpg,.png" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="bg-sky-500 hover:bg-sky-600">
                  <Upload className="w-4 h-4 mr-2" />
                  সংরক্ষণ করুন
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewPrescription(false)}
                >
                  বাতিল
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

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
                    placeholder="রোগীর নাম বা রোগ খুঁজুন..."
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
                  <SelectItem value="সক্রিয়">সক্রিয়</SelectItem>
                  <SelectItem value="সম্পূর্ণ">সম্পূর্ণ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Prescriptions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="space-y-4">
          {filteredPrescriptions.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 text-sky-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-sky-800 mb-2">
                  কোন প্রেসক্রিপশন পাওয়া যায়নি
                </h3>
                <p className="text-sky-600">
                  আপনার অনুসন্ধানের সাথে মিলে এমন কোন প্রেসক্রিপশন নেই।
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPrescriptions.map((prescription) => (
              <Card
                key={prescription.id}
                className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-sky-800 text-lg flex items-center gap-2">
                            <User className="w-5 h-5" />
                            {prescription.patient}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-sky-600">
                            <Calendar className="w-4 h-4" />
                            {prescription.date}
                          </div>
                        </div>
                        <Badge
                          className={
                            prescription.status === "সক্রিয়"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {prescription.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sky-700 mb-1">
                            রোগ নির্ণয়:
                          </h4>
                          <p className="text-sky-600">
                            {prescription.diagnosis}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sky-700 mb-2">
                            ওষুধের তালিকা:
                          </h4>
                          <div className="space-y-1">
                            {prescription.medicines.map((medicine, index) => (
                              <div
                                key={index}
                                className="bg-sky-50 p-2 rounded text-sm"
                              >
                                <span className="font-medium">
                                  {medicine.name}
                                </span>{" "}
                                -
                                <span className="text-sky-600">
                                  {" "}
                                  {medicine.dosage}, {medicine.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sky-700 mb-1">
                            নির্দেশনা:
                          </h4>
                          <p className="text-sky-600">
                            {prescription.instructions}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sky-700 mb-1">
                            পরবর্তী ভিজিট:
                          </h4>
                          <p className="text-sky-600">
                            {prescription.nextVisit}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:w-48">
                      <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
                        <Eye className="w-4 h-4 mr-1" />
                        বিস্তারিত দেখুন
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        সম্পাদনা
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        ডাউনলোড
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        মুছে ফেলুন
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
