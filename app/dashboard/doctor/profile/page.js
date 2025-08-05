"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Award, Clock, Camera, Save, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const doctorProfile = {
  name: "ডা. রহিম উদ্দিন",
  specialty: "হৃদরোগ বিশেষজ্ঞ",
  email: "dr.rahim@email.com",
  phone: "০১৭১২৩৪৫৬৭৮",
  address: "ঢাকা মেডিকেল কলেজ হাসপাতাল, ঢাকা",
  experience: "১৫ বছর",
  education: "এমবিবিএস, এমডি (কার্ডিওলজি)",
  registration: "বিএমডিসি-১২৩৪৫",
  about:
    "আমি একজন অভিজ্ঞ হৃদরোগ বিশেষজ্ঞ। গত ১৫ বছর ধরে হৃদরোগীদের চিকিৎসা সেবা প্রদান করে আসছি। আমার লক্ষ্য হলো প্রতিটি রোগীকে সর্বোচ্চ মানের চিকিৎসা সেবা প্রদান করা।",
  consultationFee: "১৫০০",
  followupFee: "১০০০",
  languages: ["বাংলা", "ইংরেজি", "হিন্দি"],
  awards: [
    "সেরা হৃদরোগ বিশেষজ্ঞ পুরস্কার ২০২২",
    "চিকিৎসা সেবায় অবদানের জন্য সম্মাননা ২০২০",
    "গবেষণায় শ্রেষ্ঠত্বের পুরস্কার ২০১৯",
  ],
  workingHours: {
    morning: "৯:০০ AM - ১:০০ PM",
    evening: "৩:০০ PM - ৭:০০ PM",
  },
  offDays: ["শুক্রবার"],
};

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(doctorProfile);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
  };

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
              প্রোফাইল সম্পাদনা
            </h1>
            <p className="text-sky-600">
              আপনার ব্যক্তিগত এবং পেশাগত তথ্য আপডেট করুন
            </p>
          </div>
          <Button
            className={
              isEditing
                ? "bg-green-500 hover:bg-green-600"
                : "bg-sky-500 hover:bg-sky-600"
            }
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                সংরক্ষণ করুন
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                সম্পাদনা করুন
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="w-32 h-32 mx-auto">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" />
                  <AvatarFallback className="bg-sky-100 text-sky-800 text-2xl">
                    {formData.name.split(" ")[1]?.charAt(0) || "ডা"}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <h2 className="text-xl font-bold text-sky-800 mb-1">
                {formData.name}
              </h2>
              <p className="text-sky-600 mb-4">{formData.specialty}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2 text-sky-700">
                  <Award className="w-4 h-4" />
                  <span>{formData.experience} অভিজ্ঞতা</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sky-700">
                  <User className="w-4 h-4" />
                  <span>{formData.registration}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-sky-200">
                <h3 className="font-medium text-sky-800 mb-2">ভাষা</h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {formData.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-sky-800">
                  <User className="w-5 h-5 mr-2" />
                  ব্যক্তিগত তথ্য
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">পূর্ণ নাম</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialty">বিশেষত্ব</Label>
                    <Input
                      id="specialty"
                      value={formData.specialty}
                      onChange={(e) =>
                        handleInputChange("specialty", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">ইমেইল</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">ফোন নম্বর</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">ঠিকানা</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="about">সম্পর্কে</Label>
                  <Textarea
                    id="about"
                    value={formData.about}
                    onChange={(e) => handleInputChange("about", e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Professional Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-sky-800">
                  <Award className="w-5 h-5 mr-2" />
                  পেশাগত তথ্য
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="education">শিক্ষাগত যোগ্যতা</Label>
                    <Input
                      id="education"
                      value={formData.education}
                      onChange={(e) =>
                        handleInputChange("education", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">অভিজ্ঞতা</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) =>
                        handleInputChange("experience", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="registration">রেজিস্ট্রেশন নম্বর</Label>
                    <Input
                      id="registration"
                      value={formData.registration}
                      onChange={(e) =>
                        handleInputChange("registration", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="consultationFee">পরামর্শ ফি (৳)</Label>
                    <Input
                      id="consultationFee"
                      value={formData.consultationFee}
                      onChange={(e) =>
                        handleInputChange("consultationFee", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="followupFee">ফলোআপ ফি (৳)</Label>
                  <Input
                    id="followupFee"
                    value={formData.followupFee}
                    onChange={(e) =>
                      handleInputChange("followupFee", e.target.value)
                    }
                    disabled={!isEditing}
                    className="md:w-1/2"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Working Hours */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-sky-800">
                  <Clock className="w-5 h-5 mr-2" />
                  কর্মসময়
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="morning">সকালের সময়</Label>
                    <Input
                      id="morning"
                      value={formData.workingHours.morning}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="evening">বিকালের সময়</Label>
                    <Input
                      id="evening"
                      value={formData.workingHours.evening}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label>ছুটির দিন</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.offDays.map((day, index) => (
                      <Badge key={index} variant="secondary">
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Awards & Recognition */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-sky-800">
                  <Award className="w-5 h-5 mr-2" />
                  পুরস্কার ও সম্মাননা
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {formData.awards.map((award, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 border border-sky-200 rounded-lg"
                    >
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-sky-800">{award}</span>
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <Button variant="outline" className="mt-4 bg-transparent">
                    <Award className="w-4 h-4 mr-2" />
                    নতুন পুরস্কার যোগ করুন
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          <Button
            className="bg-green-500 hover:bg-green-600"
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-2" />
            পরিবর্তন সংরক্ষণ করুন
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsEditing(false);
              setFormData(doctorProfile); // Reset to original data
            }}
          >
            বাতিল করুন
          </Button>
        </motion.div>
      )}
    </div>
  );
}
