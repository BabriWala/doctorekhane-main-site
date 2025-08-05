"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  FileText,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Download,
  PrinterIcon as Print,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { bn } from "date-fns/locale";

const steps = [
  { id: 1, title: "ডাক্তার/হাসপাতাল নির্বাচন", icon: User },
  { id: 2, title: "তারিখ ও সময়", icon: Calendar },
  { id: 3, title: "রোগীর তথ্য", icon: FileText },
  { id: 4, title: "ভিজিট টাইপ", icon: Clock },
  { id: 5, title: "পেমেন্ট", icon: CreditCard },
  { id: 6, title: "নিশ্চিতকরণ", icon: CheckCircle },
];

const doctors = [
  {
    id: 1,
    name: "ডা. রহিম উদ্দিন",
    specialty: "হৃদরোগ বিশেষজ্ঞ",
    hospital: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
  },
  {
    id: 2,
    name: "ডা. ফাতেমা খাতুন",
    specialty: "শিশু বিশেষজ্ঞ",
    hospital: "বারডেম হাসপাতাল",
  },
  {
    id: 3,
    name: "ডা. করিম আহমেদ",
    specialty: "অর্থোপেডিক সার্জন",
    hospital: "স্কয়ার হাসপাতাল",
  },
];

const timeSlots = [
  "৯:০০ AM",
  "৯:৩০ AM",
  "১০:০০ AM",
  "১০:৩০ AM",
  "২:০০ PM",
  "২:৩০ PM",
  "৩:০০ PM",
  "৩:ৃ০ PM",
];

export default function AppointmentBooking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState("");
  const [patientData, setPatientData] = useState({
    name: "",
    phone: "",
    age: "",
    problem: "",
  });
  const [visitType, setVisitType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmAppointment = () => {
    setIsConfirmed(true);
    setShowConfirmation(true);
  };

  const selectedDoctorData = doctors.find(
    (d) => d.id.toString() === selectedDoctor
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-sky-800 mb-2">
            অ্যাপয়েন্টমেন্ট বুকিং
          </h1>
          <p className="text-sky-600">
            আপনার সুবিধামত ডাক্তারের সাথে অ্যাপয়েন্টমেন্ট নিন
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 overflow-x-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center min-w-0 flex-1"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= step.id
                    ? "bg-sky-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span
                className={`text-xs text-center ${
                  currentStep >= step.id
                    ? "text-sky-800 font-medium"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`hidden md:block w-full h-0.5 mt-5 ${
                    currentStep > step.id ? "bg-sky-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Doctor/Hospital Selection */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <Label className="text-sky-800 font-medium mb-3 block">
                      ডাক্তার নির্বাচন করুন
                    </Label>
                    <Select
                      value={selectedDoctor}
                      onValueChange={setSelectedDoctor}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="ডাক্তার খুঁজুন..." />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem
                            key={doctor.id}
                            value={doctor.id.toString()}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{doctor.name}</span>
                              <span className="text-sm text-gray-500">
                                {doctor.specialty} - {doctor.hospital}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedDoctorData && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-sky-50 rounded-lg border border-sky-200"
                    >
                      <h3 className="font-medium text-sky-800">
                        {selectedDoctorData.name}
                      </h3>
                      <p className="text-sky-600">
                        {selectedDoctorData.specialty}
                      </p>
                      <p className="text-sm text-sky-500">
                        {selectedDoctorData.hospital}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Date & Time Selection */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <Label className="text-sky-800 font-medium mb-3 block">
                      আপনার সুবিধাজনক সময় নির্বাচন করুন
                    </Label>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm text-sky-700 mb-2 block">
                          তারিখ নির্বাচন করুন
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left bg-transparent"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {selectedDate
                                ? format(selectedDate, "PPP", { locale: bn })
                                : "তারিখ নির্বাচন করুন"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label className="text-sm text-sky-700 mb-2 block">
                          সময় নির্বাচন করুন
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={
                                selectedTime === time ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              className={
                                selectedTime === time
                                  ? "bg-sky-500 hover:bg-sky-600"
                                  : ""
                              }
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Patient Details */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sky-800">
                        নাম
                      </Label>
                      <Input
                        id="name"
                        value={patientData.name}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            name: e.target.value,
                          })
                        }
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sky-800">
                        মোবাইল নম্বর
                      </Label>
                      <Input
                        id="phone"
                        value={patientData.phone}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            phone: e.target.value,
                          })
                        }
                        placeholder="০১৭xxxxxxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="age" className="text-sky-800">
                      বয়স
                    </Label>
                    <Input
                      id="age"
                      value={patientData.age}
                      onChange={(e) =>
                        setPatientData({ ...patientData, age: e.target.value })
                      }
                      placeholder="আপনার বয়স"
                      className="max-w-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="problem" className="text-sky-800">
                      সমস্যা / রোগের বিবরণ
                    </Label>
                    <Textarea
                      id="problem"
                      value={patientData.problem}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          problem: e.target.value,
                        })
                      }
                      placeholder="আপনার স্বাস্থ্য সমস্যার বিস্তারিত লিখুন..."
                      rows={4}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Visit Type */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <Label className="text-sky-800 font-medium">
                    ভিজিট টাইপ নির্বাচন করুন
                  </Label>
                  <RadioGroup value={visitType} onValueChange={setVisitType}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-sky-50">
                      <RadioGroupItem value="chamber" id="chamber" />
                      <Label
                        htmlFor="chamber"
                        className="flex-1 cursor-pointer"
                      >
                        <div>
                          <div className="font-medium text-sky-800">
                            সরাসরি চেম্বারে
                          </div>
                          <div className="text-sm text-sky-600">
                            ডাক্তারের চেম্বারে সরাসরি দেখা করুন
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-sky-50">
                      <RadioGroupItem value="telemedicine" id="telemedicine" />
                      <Label
                        htmlFor="telemedicine"
                        className="flex-1 cursor-pointer"
                      >
                        <div>
                          <div className="font-medium text-sky-800">
                            টেলিমেডিসিন (ভিডিও কল)
                          </div>
                          <div className="text-sm text-sky-600">
                            ঘরে বসে ভিডিও কলের মাধ্যমে পরামর্শ নিন
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>
              )}

              {/* Step 5: Payment */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <Label className="text-sky-800 font-medium">
                    পেমেন্ট পদ্ধতি নির্বাচন করুন
                  </Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-sky-50">
                      <RadioGroupItem value="bkash" id="bkash" />
                      <Label htmlFor="bkash" className="flex-1 cursor-pointer">
                        বিকাশ
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-sky-50">
                      <RadioGroupItem value="nagad" id="nagad" />
                      <Label htmlFor="nagad" className="flex-1 cursor-pointer">
                        নগদ
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-sky-50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        ক্রেডিট/ডেবিট কার্ড
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-sky-50">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        নগদ অর্থ (চেম্বারে)
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="text-center">
                    <Button variant="outline" onClick={nextStep}>
                      পেমেন্ট এড়িয়ে যান
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 6: Confirmation */}
              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-sky-800 mb-4">
                      অ্যাপয়েন্টমেন্ট সারসংক্ষেপ
                    </h3>
                  </div>

                  <div className="space-y-4 p-4 bg-sky-50 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-sky-700">ডাক্তার:</span>
                      <span className="font-medium text-sky-800">
                        {selectedDoctorData?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sky-700">তারিখ:</span>
                      <span className="font-medium text-sky-800">
                        {selectedDate
                          ? format(selectedDate, "PPP", { locale: bn })
                          : ""}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sky-700">সময়:</span>
                      <span className="font-medium text-sky-800">
                        {selectedTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sky-700">রোগীর নাম:</span>
                      <span className="font-medium text-sky-800">
                        {patientData.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sky-700">ভিজিট টাইপ:</span>
                      <span className="font-medium text-sky-800">
                        {visitType === "chamber"
                          ? "সরাসরি চেম্বারে"
                          : "টেলিমেডিসিন"}
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={handleConfirmAppointment}
                      className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3"
                      size="lg"
                    >
                      অ্যাপয়েন্টমেন্ট নিশ্চিত করুন
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 6 && (
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  পূর্ববর্তী
                </Button>

                <Button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !selectedDoctor) ||
                    (currentStep === 2 && (!selectedDate || !selectedTime)) ||
                    (currentStep === 3 &&
                      (!patientData.name || !patientData.phone)) ||
                    (currentStep === 4 && !visitType)
                  }
                  className="bg-sky-500 hover:bg-sky-600 flex items-center"
                >
                  পরবর্তী
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <AlertDialogTitle className="text-green-800">
                আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center space-y-2">
                <p>
                  অ্যাপয়েন্টমেন্ট ID:{" "}
                  <strong>
                    APT-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </strong>
                </p>
                <p className="text-sm text-gray-600">
                  আপনার মোবাইলে SMS এবং ইমেইলে নিশ্চিতকরণ পাঠানো হয়েছে
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col space-y-2">
              <div className="flex space-x-2 w-full">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  ডাউনলোড
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Print className="w-4 h-4 mr-2" />
                  প্রিন্ট
                </Button>
              </div>
              <div className="flex space-x-2 w-full">
                <Button
                  variant="outline"
                  className="flex-1 text-red-600 hover:text-red-700 bg-transparent"
                >
                  অ্যাপয়েন্টমেন্ট বাতিল করুন
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  সময় পরিবর্তন করুন
                </Button>
              </div>
              <AlertDialogAction className="w-full bg-sky-500 hover:bg-sky-600">
                সম্পন্ন
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
