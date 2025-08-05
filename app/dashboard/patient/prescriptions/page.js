"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Upload, Eye, Calendar, Search } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const prescriptions = [
  {
    id: 1,
    doctor: "ডা. রহিম উদ্দিন",
    specialty: "হৃদরোগ বিশেষজ্ঞ",
    date: "২০ ডিসেম্বর, ২০২৪",
    diagnosis: "উচ্চ রক্তচাপ",
    medicines: [
      {
        name: "এমলোডিপিন",
        dosage: "৫mg",
        frequency: "দিনে ১ বার",
        duration: "৩০ দিন",
      },
      {
        name: "হাইড্রোক্লোরোথায়াজাইড",
        dosage: "২৫mg",
        frequency: "দিনে ১ বার",
        duration: "৩০ দিন",
      },
    ],
    advice: "নিয়মিত ব্যায়াম করুন এবং লবণ কম খান",
    nextVisit: "২০ জানুয়ারি, ২০২৫",
    type: "prescription",
  },
  {
    id: 2,
    doctor: "ডা. ফাতেমা খাতুন",
    specialty: "শিশু বিশেষজ্ঞ",
    date: "১৫ ডিসেম্বর, ২০২৪",
    diagnosis: "ভাইরাল জ্বর",
    medicines: [
      {
        name: "প্যারাসিটামল",
        dosage: "৫০০mg",
        frequency: "দিনে ৩ বার",
        duration: "৫ দিন",
      },
      {
        name: "ভিটামিন সি",
        dosage: "৫০০mg",
        frequency: "দিনে ১ বার",
        duration: "১০ দিন",
      },
    ],
    advice: "প্রচুর পানি পান করুন এবং বিশ্রাম নিন",
    nextVisit: "প্রয়োজন অনুযায়ী",
    type: "prescription",
  },
  {
    id: 3,
    doctor: "ডা. করিম আহমেদ",
    specialty: "অর্থোপেডিক সার্জন",
    date: "১০ ডিসেম্বর, ২০২৪",
    diagnosis: "হাঁটুর ব্যথা",
    testName: "এক্স-রে রিপোর্ট - হাঁটু",
    result: "স্বাভাবিক",
    advice: "ফিজিওথেরাপি চালিয়ে যান",
    type: "report",
  },
];

const labReports = [
  {
    id: 1,
    testName: "রক্ত পরীক্ষা (CBC)",
    date: "১৮ ডিসেম্বর, ২০২৪",
    hospital: "ল্যাব এইড",
    status: "সম্পন্ন",
    result: "স্বাভাবিক",
  },
  {
    id: 2,
    testName: "ডায়াবেটিস টেস্ট (HbA1c)",
    date: "১২ ডিসেম্বর, ২০২৪",
    hospital: "পপুলার ডায়াগনস্টিক",
    status: "সম্পন্ন",
    result: "৬.৮%",
  },
];

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const filteredPrescriptions = prescriptions.filter((item) => {
    const matchesSearch =
      item.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-sky-800 mb-2">
          প্রেসক্রিপশন ও রিপোর্ট
        </h1>
        <p className="text-sky-600">
          আপনার সকল প্রেসক্রিপশন এবং মেডিকেল রিপোর্ট দেখুন
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="ডাক্তার বা রোগের নাম দিয়ে খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="টাইপ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব ধরনের</SelectItem>
                  <SelectItem value="prescription">প্রেসক্রিপশন</SelectItem>
                  <SelectItem value="report">রিপোর্ট</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-sky-500 hover:bg-sky-600">
                <Upload className="w-4 h-4 mr-2" />
                রিপোর্ট আপলোড
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Prescriptions and Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid gap-4">
          {filteredPrescriptions.map((item) => (
            <Card
              key={item.id}
              className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-sky-800">
                        {item.doctor}
                      </h3>
                      <Badge
                        variant={
                          item.type === "prescription" ? "default" : "secondary"
                        }
                      >
                        {item.type === "prescription"
                          ? "প্রেসক্রিপশন"
                          : "রিপোর্ট"}
                      </Badge>
                    </div>
                    <p className="text-sm text-sky-600 mb-1">
                      {item.specialty}
                    </p>
                    <div className="flex items-center text-sm text-sky-600 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.date}
                    </div>
                    <div className="mb-3">
                      <span className="text-sm font-medium text-sky-700">
                        {item.type === "prescription"
                          ? "রোগ নির্ণয়:"
                          : "পরীক্ষা:"}
                      </span>
                      <span className="text-sm text-sky-600 ml-2">
                        {item.type === "prescription"
                          ? item.diagnosis
                          : item.testName}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedPrescription(item)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          দেখুন
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-sky-800">
                            {item.type === "prescription"
                              ? "প্রেসক্রিপশন বিস্তারিত"
                              : "রিপোর্ট বিস্তারিত"}
                          </DialogTitle>
                        </DialogHeader>
                        {selectedPrescription && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 p-4 bg-sky-50 rounded-lg">
                              <div>
                                <span className="text-sm font-medium text-sky-700">
                                  ডাক্তার:
                                </span>
                                <p className="text-sky-800">
                                  {selectedPrescription.doctor}
                                </p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-sky-700">
                                  তারিখ:
                                </span>
                                <p className="text-sky-800">
                                  {selectedPrescription.date}
                                </p>
                              </div>
                            </div>

                            {selectedPrescription.type === "prescription" ? (
                              <>
                                <div>
                                  <h4 className="font-medium text-sky-800 mb-2">
                                    রোগ নির্ণয়:
                                  </h4>
                                  <p className="text-sky-600">
                                    {selectedPrescription.diagnosis}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-medium text-sky-800 mb-2">
                                    ওষুধের তালিকা:
                                  </h4>
                                  <div className="space-y-3">
                                    {selectedPrescription.medicines.map(
                                      (medicine, index) => (
                                        <div
                                          key={index}
                                          className="p-3 border border-sky-200 rounded-lg"
                                        >
                                          <div className="font-medium text-sky-800">
                                            {medicine.name}
                                          </div>
                                          <div className="text-sm text-sky-600 mt-1">
                                            <span>ডোজ: {medicine.dosage}</span>{" "}
                                            •
                                            <span>
                                              {" "}
                                              সেবনবিধি: {medicine.frequency}
                                            </span>{" "}
                                            •
                                            <span>
                                              {" "}
                                              মেয়াদ: {medicine.duration}
                                            </span>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium text-sky-800 mb-2">
                                    পরামর্শ:
                                  </h4>
                                  <p className="text-sky-600">
                                    {selectedPrescription.advice}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-medium text-sky-800 mb-2">
                                    পরবর্তী ভিজিট:
                                  </h4>
                                  <p className="text-sky-600">
                                    {selectedPrescription.nextVisit}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <h4 className="font-medium text-sky-800 mb-2">
                                    পরীক্ষার নাম:
                                  </h4>
                                  <p className="text-sky-600">
                                    {selectedPrescription.testName}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-medium text-sky-800 mb-2">
                                    ফলাফল:
                                  </h4>
                                  <p className="text-sky-600">
                                    {selectedPrescription.result}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-medium text-sky-800 mb-2">
                                    পরামর্শ:
                                  </h4>
                                  <p className="text-sky-600">
                                    {selectedPrescription.advice}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      ডাউনলোড
                    </Button>
                  </div>
                </div>

                {/* Quick preview */}
                {item.type === "prescription" && (
                  <div className="border-t border-sky-100 pt-3">
                    <div className="text-sm text-sky-600">
                      <span className="font-medium">ওষুধ:</span>
                      {item.medicines.slice(0, 2).map((medicine, index) => (
                        <span key={index}>
                          {index > 0 && ", "}
                          {medicine.name}
                        </span>
                      ))}
                      {item.medicines.length > 2 &&
                        ` এবং আরও ${item.medicines.length - 2}টি`}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Lab Reports Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sky-800">
              সাম্প্রতিক ল্যাব রিপোর্ট
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {labReports.map((report) => (
                <div
                  key={report.id}
                  className="flex justify-between items-center p-4 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-sky-800">
                      {report.testName}
                    </h4>
                    <div className="flex items-center text-sm text-sky-600 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {report.date} • {report.hospital}
                    </div>
                    <div className="mt-1">
                      <Badge
                        variant={
                          report.status === "সম্পন্ন" ? "default" : "secondary"
                        }
                      >
                        {report.status}
                      </Badge>
                      <span className="text-sm text-sky-600 ml-2">
                        ফলাফল: {report.result}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      দেখুন
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      ডাউনলোড
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sky-800">
              নতুন রিপোর্ট আপলোড করুন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-sky-300 rounded-lg p-8 text-center hover:border-sky-400 transition-colors">
              <Upload className="w-12 h-12 text-sky-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-sky-800 mb-2">
                ফাইল আপলোড করুন
              </h3>
              <p className="text-sky-600 mb-4">
                PDF, JPG, PNG ফরম্যাটে রিপোর্ট আপলোড করুন
              </p>
              <Button className="bg-sky-500 hover:bg-sky-600">
                ফাইল নির্বাচন করুন
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
