"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Star,
  MapPin,
  Phone,
  Calendar,
  Trash2,
  User,
  Building,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const favoriteDoctors = [
  {
    id: 1,
    name: "ডা. রহিম উদ্দিন",
    specialty: "হৃদরোগ বিশেষজ্ঞ",
    hospital: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
    rating: 4.8,
    experience: "১৫ বছর",
    consultationFee: "১০০০",
    lastVisit: "২০ ডিসেম্বর, ২০২৪",
    totalVisits: 5,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "ডা. ফাতেমা খাতুন",
    specialty: "শিশু বিশেষজ্ঞ",
    hospital: "বারডেম হাসপাতাল",
    rating: 4.9,
    experience: "১২ বছর",
    consultationFee: "৮০০",
    lastVisit: "১৫ ডিসেম্বর, ২০২৪",
    totalVisits: 3,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "ডা. করিম আহমেদ",
    specialty: "অর্থোপেডিক সার্জন",
    hospital: "স্কয়ার হাসপাতাল",
    rating: 4.7,
    experience: "২০ বছর",
    consultationFee: "১৫০০",
    lastVisit: "১০ ডিসেম্বর, ২০২৪",
    totalVisits: 2,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
  },
];

const favoriteHospitals = [
  {
    id: 1,
    name: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
    location: "ঢাকা",
    rating: 4.5,
    distance: "২.৫ কিমি",
    departments: ["হৃদরোগ", "নিউরোলজি", "অর্থোপেডিক"],
    emergency: true,
    lastVisit: "২০ ডিসেম্বর, ২০২৪",
    totalVisits: 8,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "বারডেম হাসপাতাল",
    location: "ঢাকা",
    rating: 4.6,
    distance: "৩.২ কিমি",
    departments: ["ডায়াবেটিস", "শিশু", "গাইনি"],
    emergency: true,
    lastVisit: "১৫ ডিসেম্বর, ২০২৪",
    totalVisits: 5,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "স্কয়ার হাসপাতাল",
    location: "ঢাকা",
    rating: 4.8,
    distance: "৪.১ কিমি",
    departments: ["অর্থোপেডিক", "কার্ডিয়াক সার্জারি", "অনকোলজি"],
    emergency: false,
    lastVisit: "১০ ডিসেম্বর, ২০২৪",
    totalVisits: 3,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=60&width=60",
  },
];

export default function FavoritesPage() {
  const [favDoctors, setFavDoctors] = useState(favoriteDoctors);
  const [favHospitals, setFavHospitals] = useState(favoriteHospitals);

  const removeFavoriteDoctor = (id) => {
    setFavDoctors(favDoctors.filter((doctor) => doctor.id !== id));
  };

  const removeFavoriteHospital = (id) => {
    setFavHospitals(favHospitals.filter((hospital) => hospital.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-sky-800 mb-2">
          সংরক্ষিত ডাক্তার/হাসপাতাল
        </h1>
        <p className="text-sky-600">
          আপনার প্রিয় ডাক্তার এবং হাসপাতালের তালিকা
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-sky-500 to-blue-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sky-100">প্রিয় ডাক্তার</p>
                  <p className="text-2xl font-bold">{favDoctors.length}</p>
                </div>
                <User className="w-8 h-8 text-sky-200" />
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
                  <p className="text-green-100">প্রিয় হাসপাতাল</p>
                  <p className="text-2xl font-bold">{favHospitals.length}</p>
                </div>
                <Building className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Favorites Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="doctors" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="doctors">
              প্রিয় ডাক্তার ({favDoctors.length})
            </TabsTrigger>
            <TabsTrigger value="hospitals">
              প্রিয় হাসপাতাল ({favHospitals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="doctors">
            <div className="grid gap-4">
              {favDoctors.length > 0 ? (
                favDoctors.map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src={
                                doctor.image ||
                                "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                              }
                            />
                            <AvatarFallback className="bg-sky-100 text-sky-800">
                              {doctor.name.split(" ")[1]?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium text-sky-800 text-lg">
                                  {doctor.name}
                                </h3>
                                <p className="text-sky-600">
                                  {doctor.specialty}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-600 ml-1">
                                    {doctor.rating}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeFavoriteDoctor(doctor.id)
                                  }
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-sky-600">
                                  <Building className="w-4 h-4 mr-2" />
                                  {doctor.hospital}
                                </div>
                                <div className="flex items-center text-sm text-sky-600">
                                  <User className="w-4 h-4 mr-2" />
                                  অভিজ্ঞতা: {doctor.experience}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="text-sm text-sky-600">
                                  ফি: ৳{doctor.consultationFee}
                                </div>
                                <div className="text-sm text-sky-600">
                                  শেষ ভিজিট: {doctor.lastVisit}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex space-x-2">
                                <Badge variant="outline">
                                  মোট ভিজিট: {doctor.totalVisits}
                                </Badge>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Phone className="w-4 h-4 mr-1" />
                                  কল করুন
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-sky-500 hover:bg-sky-600"
                                >
                                  <Calendar className="w-4 h-4 mr-1" />
                                  অ্যাপয়েন্টমেন্ট
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">
                    কোন প্রিয় ডাক্তার নেই
                  </h3>
                  <p className="text-gray-400 mb-4">
                    আপনার পছন্দের ডাক্তারদের প্রিয় তালিকায় যোগ করুন
                  </p>
                  <Button className="bg-sky-500 hover:bg-sky-600">
                    ডাক্তার খুঁজুন
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="hospitals">
            <div className="grid gap-4">
              {favHospitals.length > 0 ? (
                favHospitals.map((hospital) => (
                  <motion.div
                    key={hospital.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src={
                                hospital.image ||
                                "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                              }
                            />
                            <AvatarFallback className="bg-sky-100 text-sky-800">
                              {hospital.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium text-sky-800 text-lg">
                                  {hospital.name}
                                </h3>
                                <div className="flex items-center text-sky-600">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {hospital.location} • {hospital.distance}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-600 ml-1">
                                    {hospital.rating}
                                  </span>
                                </div>
                                {hospital.emergency && (
                                  <Badge
                                    variant="destructive"
                                    className="text-xs"
                                  >
                                    জরুরি
                                  </Badge>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeFavoriteHospital(hospital.id)
                                  }
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="text-sm text-sky-600 mb-2">
                                বিভাগসমূহ:
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {hospital.departments.map((dept, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {dept}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex space-x-4 text-sm text-sky-600">
                                <span>শেষ ভিজিট: {hospital.lastVisit}</span>
                                <span>মোট ভিজিট: {hospital.totalVisits}</span>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Phone className="w-4 h-4 mr-1" />
                                  কল করুন
                                </Button>
                                <Button size="sm" variant="outline">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  দিকনির্দেশ
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-sky-500 hover:bg-sky-600"
                                >
                                  <Calendar className="w-4 h-4 mr-1" />
                                  অ্যাপয়েন্টমেন্ট
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">
                    কোন প্রিয় হাসপাতাল নেই
                  </h3>
                  <p className="text-gray-400 mb-4">
                    আপনার পছন্দের হাসপাতালগুলো প্রিয় তালিকায় যোগ করুন
                  </p>
                  <Button className="bg-sky-500 hover:bg-sky-600">
                    হাসপাতাল খুঁজুন
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
