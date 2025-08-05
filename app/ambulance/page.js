"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  Truck,
  Star,
  AlertTriangle,
  User,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const serviceTypes = [
  "ICU অ্যাম্বুলেন্স",
  "সাধারণ অ্যাম্বুলেন্স",
  "এয়ার অ্যাম্বুলেন্স",
  "নিওনেটাল অ্যাম্বুলেন্স",
];
const locations = [
  "শিলিগুড়ি",
  "জলপাইগুড়ি",
  "মালবাজার",
  "আলিপুরদুয়ার",
  "কোচবিহার",
  "দার্জিলিং",
];

const ambulanceProviders = [
  {
    id: 1,
    name: "এক্সপ্রেস অ্যাম্বুলেন্স",
    location: "শিলিগুড়ি",
    serviceArea: "শিলিগুড়ি, জলপাইগুড়ি",
    phone: "৯৮৩০০০০০০১",
    rating: 4.8,
    eta: "১৫ মিনিট",
    serviceType: "ICU অ্যাম্বুলেন্স",
    vehicleCount: 8,
    driverName: "রাজেশ কুমার",
    available: true,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "লাইফ সেভার অ্যাম্বুলেন্স",
    location: "জলপাইগুড়ি",
    serviceArea: "জলপাইগুড়ি, আলিপুরদুয়ার",
    phone: "৯৮৩০০০০০০২",
    rating: 4.6,
    eta: "২০ মিনিট",
    serviceType: "সাধারণ অ্যাম্বুলেন্স",
    vehicleCount: 5,
    driverName: "অমিত দাস",
    available: true,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "মেডিকেল এমার্জেন্সি",
    location: "মালবাজার",
    serviceArea: "মালবাজার, দার্জিলিং",
    phone: "৯৮৩০০০০০০৩",
    rating: 4.9,
    eta: "১০ মিনিট",
    serviceType: "ICU অ্যাম্বুলেন্স",
    vehicleCount: 12,
    driverName: "সুমিত্রা রায়",
    available: true,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "হেলথ কেয়ার অ্যাম্বুলেন্স",
    location: "কোচবিহার",
    serviceArea: "কোচবিহার, আলিপুরদুয়ার",
    phone: "৯৮৩০০০০০০৪",
    rating: 4.7,
    eta: "২৫ মিনিট",
    serviceType: "সাধারণ অ্যাম্বুলেন্স",
    vehicleCount: 6,
    driverName: "প্রিয়া ব্যানার্জী",
    available: false,
    image: "/placeholder.svg?height=60&width=60",
  },
];

const emergencyTips = [
  "রোগীকে শান্ত রাখুন এবং আতঙ্কিত হবেন না",
  "রোগীর শ্বাস-প্রশ্বাস ও নাড়ি পরীক্ষা করুন",
  "প্রয়োজনে প্রাথমিক চিকিৎসা দিন",
  "অ্যাম্বুলেন্স আসা পর্যন্ত রোগীর পাশে থাকুন",
  "রোগীর পরিচয়পত্র ও প্রয়োজনীয় কাগজপত্র প্রস্তুত রাখুন",
];

export default function AmbulanceServices() {
  const [bookingForm, setBookingForm] = useState({
    pickupLocation: "",
    dropLocation: "",
    serviceType: "",
    date: "",
    time: "",
    patientName: "",
    contactNumber: "",
    emergencyDetails: "",
  });

  const handleBooking = (e) => {
    e.preventDefault();
    console.log("Ambulance booking:", bookingForm);
    alert(
      "অ্যাম্বুলেন্স বুকিং সফল হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।"
    );
  };

  const handleEmergencyCall = () => {
    window.open("tel:9830000000");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-sky-800">
                অ্যাম্বুলেন্স সার্ভিস
              </h1>
              <p className="text-sky-600 mt-2">
                জরুরি অ্যাম্বুলেন্স কল করুন বা নির্ধারিত বুকিং করুন
              </p>
            </div>
            <nav className="text-sm text-sky-600">
              <span>হোম</span> <span className="mx-2">&gt;</span>{" "}
              <span className="text-sky-800">অ্যাম্বুলেন্স</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Emergency Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">জরুরি অবস্থায়</AlertTitle>
            <AlertDescription className="text-red-700">
              তাৎক্ষণিক সাহায্যের জন্য নিচের নম্বরে কল করুন
            </AlertDescription>
          </Alert>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Button
              onClick={handleEmergencyCall}
              className="bg-red-600 hover:bg-red-700 text-white text-lg py-6 flex-1"
            >
              <Phone className="h-6 w-6 mr-3" />
              জরুরি কল: ৯৮৩০০০০০০০
            </Button>
            <Button
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50 text-lg py-6 flex-1 bg-transparent"
            >
              <Phone className="h-6 w-6 mr-3" />
              ২৪×৭ সাপোর্ট: ১০২
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-sky-800 flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  অ্যাম্বুলেন্স বুকিং
                </CardTitle>
                <CardDescription>
                  আপনার প্রয়োজন অনুযায়ী অ্যাম্বুলেন্স বুক করুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="pickupLocation"
                        className="text-sky-700 font-medium"
                      >
                        পিকআপ লোকেশন
                      </Label>
                      <Input
                        id="pickupLocation"
                        value={bookingForm.pickupLocation}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            pickupLocation: e.target.value,
                          })
                        }
                        placeholder="পিকআপের ঠিকানা লিখুন"
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="dropLocation"
                        className="text-sky-700 font-medium"
                      >
                        ড্রপ লোকেশন
                      </Label>
                      <Input
                        id="dropLocation"
                        value={bookingForm.dropLocation}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            dropLocation: e.target.value,
                          })
                        }
                        placeholder="গন্তব্যের ঠিকানা লিখুন"
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sky-700 font-medium">
                      পরিষেবা ধরন
                    </Label>
                    <Select
                      value={bookingForm.serviceType}
                      onValueChange={(value) =>
                        setBookingForm({ ...bookingForm, serviceType: value })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="পরিষেবা ধরন নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="date"
                        className="text-sky-700 font-medium"
                      >
                        তারিখ নির্বাচন
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            date: e.target.value,
                          })
                        }
                        className="mt-2"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="time"
                        className="text-sky-700 font-medium"
                      >
                        সময় নির্বাচন
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={bookingForm.time}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            time: e.target.value,
                          })
                        }
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="patientName"
                        className="text-sky-700 font-medium"
                      >
                        রোগীর নাম
                      </Label>
                      <Input
                        id="patientName"
                        value={bookingForm.patientName}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            patientName: e.target.value,
                          })
                        }
                        placeholder="রোগীর পূর্ণ নাম লিখুন"
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="contactNumber"
                        className="text-sky-700 font-medium"
                      >
                        মোবাইল নম্বর
                      </Label>
                      <Input
                        id="contactNumber"
                        value={bookingForm.contactNumber}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            contactNumber: e.target.value,
                          })
                        }
                        placeholder="০১৭xxxxxxxx"
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="emergencyDetails"
                      className="text-sky-700 font-medium"
                    >
                      জরুরি অবস্থার বিবরণ (ঐচ্ছিক)
                    </Label>
                    <Textarea
                      id="emergencyDetails"
                      value={bookingForm.emergencyDetails}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          emergencyDetails: e.target.value,
                        })
                      }
                      placeholder="রোগীর অবস্থা বা বিশেষ প্রয়োজনীয়তা লিখুন"
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700 text-lg py-3"
                  >
                    অ্যাম্বুলেন্স বুক করুন
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Tips */}
          <div>
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-sky-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  জরুরি পরিস্থিতিতে করণীয়
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {emergencyTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sky-600 text-sm font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-sky-700 text-sm">{tip}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Available Ambulances */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-sky-800">
              উপলব্ধ অ্যাম্বুলেন্স সার্ভিস
            </h2>
            <Select defaultValue="eta">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eta">ETA অনুযায়ী</SelectItem>
                <SelectItem value="rating">রেটিং অনুযায়ী</SelectItem>
                <SelectItem value="location">এলাকা অনুযায়ী</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ambulanceProviders.map((provider) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 ${
                    !provider.available ? "opacity-75" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={provider.image || "/placeholder.svg"}
                        />
                        <AvatarFallback className="bg-sky-200 text-sky-800">
                          <Truck className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-sky-800 text-lg">
                              {provider.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant={
                                  provider.available ? "default" : "secondary"
                                }
                                className={
                                  provider.available
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-600"
                                }
                              >
                                {provider.available ? "উপলব্ধ" : "ব্যস্ত"}
                              </Badge>
                              <Badge variant="outline" className="text-sky-700">
                                {provider.serviceType}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-sky-700">
                              {provider.rating}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 mt-3 text-sm text-sky-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {provider.location} - {provider.serviceArea}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            ETA: {provider.eta}
                          </div>
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            {provider.vehicleCount}টি গাড়ি উপলব্ধ
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            চালক: {provider.driverName}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        className="flex-1 bg-sky-600 hover:bg-sky-700"
                        disabled={!provider.available}
                        onClick={() => window.open(`tel:${provider.phone}`)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        যোগাযোগ করুন
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        disabled={!provider.available}
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        লোকেশন দেখুন
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Provider Profiles Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-sky-800 mb-6">
            সার্ভিস প্রোভাইডার প্রোফাইল
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {ambulanceProviders.slice(0, 2).map((provider) => (
              <Card key={provider.id} className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sky-800">
                    {provider.name}
                  </CardTitle>
                  <CardDescription>
                    পেশাদার অ্যাম্বুলেন্স সেবা প্রদানকারী
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-sky-600">পরিষেবা এলাকা:</p>
                      <p className="font-medium text-sky-800">
                        {provider.serviceArea}
                      </p>
                    </div>
                    <div>
                      <p className="text-sky-600">ফোন নম্বর:</p>
                      <p className="font-medium text-sky-800">
                        {provider.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sky-600">গাড়ির সংখ্যা:</p>
                      <p className="font-medium text-sky-800">
                        {provider.vehicleCount}টি
                      </p>
                    </div>
                    <div>
                      <p className="text-sky-600">রেটিং:</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-sky-800">
                          {provider.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-sky-600 hover:bg-sky-700"
                      onClick={() => window.open(`tel:${provider.phone}`)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      কল করুন
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      বিস্তারিত দেখুন
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
