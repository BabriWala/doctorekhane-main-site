"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  Truck,
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
import api, { IMAGE_BASE_URL } from "@/lib/api";

export default function AmbulanceServices() {
  const [ambulanceProviders, setAmbulanceProviders] = useState([]);
  const [bookingProviders, setBookingProviders] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [pageSettings, setPageSettings] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [sortBy, setSortBy] = useState("availability");
  const [bookingForm, setBookingForm] = useState({
    ambulanceId: "",
    pickupLocation: "",
    dropLocation: "",
    serviceType: "",
    date: "",
    time: "",
    patientName: "",
    contactNumber: "",
    emergencyDetails: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    Promise.all([
      api.get("/ambulance", { params: { page, limit: 12 } }),
      api.get("/ambulance", { params: { page: 1, limit: 100, isAvailable: true } }),
      api.get("/ambulance-page-settings"),
    ]).then(([ambulancesResponse, availableResponse, settingsResponse]) => {
      const mapProvider = (item) => ({
        id: item._id,
        type: item.basicInfo?.type || "Basic",
        name: `${item.basicInfo?.type || "Basic"} Ambulance · ${item.basicInfo?.vehicleNumber || ""}`,
        location: item.address?.city || item.address?.area || "",
        serviceArea: item.address?.address || item.address?.city || "",
        phone: item.contact?.phone || "",
        serviceType: `${item.basicInfo?.type || "Basic"} Ambulance`,
        driverName: item.basicInfo?.driverName || "",
        availabilityNote: item.availability?.notes || "",
        available: Boolean(item.availability?.isAvailable),
        image: item.basicInfo?.profilePicture ? `${IMAGE_BASE_URL}${item.basicInfo.profilePicture}` : "",
      });
      setAmbulanceProviders((ambulancesResponse.data.ambulances || []).map(mapProvider));
      setBookingProviders((availableResponse.data.ambulances || []).map(mapProvider));
      setPagination(ambulancesResponse.data.pagination);
      setPageSettings(settingsResponse.data.data);
    }).catch(() => setLoadError("অ্যাম্বুলেন্সের তথ্য লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"));
  }, [page, refreshTick]);

  useEffect(() => { const timer = setInterval(() => setRefreshTick((value) => value + 1), 30000); return () => clearInterval(timer); }, []);

  const serviceTypes = useMemo(() => {
    return pageSettings?.serviceTypes || [];
  }, [pageSettings]);
  const emergencyProvider = bookingProviders.find((provider) => provider.phone);
  const emergencyPhone = pageSettings?.emergencyPhone || emergencyProvider?.phone;
  const sortedProviders = useMemo(() => [...ambulanceProviders].sort((a, b) => {
    if (sortBy === "location") return a.location.localeCompare(b.location);
    if (sortBy === "type") return a.type.localeCompare(b.type);
    return Number(b.available) - Number(a.available);
  }), [ambulanceProviders, sortBy]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true); setBookingMessage("");
    try {
      const { data } = await api.post("/ambulance-requests", {
        ambulanceId: bookingForm.ambulanceId || undefined,
        pickupLocation: bookingForm.pickupLocation,
        dropLocation: bookingForm.dropLocation,
        serviceType: bookingForm.serviceType,
        scheduledAt: new Date(`${bookingForm.date}T${bookingForm.time}`).toISOString(),
        patientName: bookingForm.patientName,
        contactNumber: bookingForm.contactNumber,
        emergencyDetails: bookingForm.emergencyDetails,
      });
      setBookingMessage(`অনুরোধ সফল হয়েছে। রেফারেন্স: ${data.data.requestNumber}`);
      setBookingForm({ ambulanceId: "", pickupLocation: "", dropLocation: "", serviceType: "", date: "", time: "", patientName: "", contactNumber: "", emergencyDetails: "" });
    } catch (error) { setBookingMessage(error.response?.data?.message || "অনুরোধ পাঠানো যায়নি। আবার চেষ্টা করুন।"); }
    finally { setSubmitting(false); }
  };

  const handleEmergencyCall = () => {
    if (emergencyPhone) window.open(`tel:${emergencyPhone}`);
  };

  if (loadError) return <div className="min-h-screen bg-sky-50 p-6"><Alert className="mx-auto max-w-3xl border-red-200 bg-red-50"><AlertTriangle className="h-4 w-4" /><AlertTitle>তথ্য পাওয়া যায়নি</AlertTitle><AlertDescription>{loadError}</AlertDescription></Alert></div>;
  if (!pageSettings) return <div className="min-h-screen bg-sky-50 p-10 text-center text-sky-800">অ্যাম্বুলেন্সের তথ্য লোড হচ্ছে...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-sky-800">
                {pageSettings.title}
              </h1>
              <p className="text-sky-600 mt-2">
                {pageSettings.subtitle}
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
            <AlertTitle className="text-red-800">{pageSettings.emergencyTitle}</AlertTitle>
            <AlertDescription className="text-red-700">
              {pageSettings.emergencyDescription}
            </AlertDescription>
          </Alert>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Button
              onClick={handleEmergencyCall}
              className="bg-red-600 hover:bg-red-700 text-white text-lg py-6 flex-1"
            >
              <Phone className="h-6 w-6 mr-3" />
              জরুরি কল: {emergencyPhone || "কোনো নম্বর উপলব্ধ নেই"}
            </Button>
            <Button
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50 text-lg py-6 flex-1 bg-transparent"
            >
              <Phone className="h-6 w-6 mr-3" />
              লাইভ উপলব্ধ: {bookingProviders.length}টি
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
                  {pageSettings.bookingTitle}
                </CardTitle>
                <CardDescription>
                  {pageSettings.bookingDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <Label className="text-sky-700 font-medium">পছন্দের অ্যাম্বুলেন্স (ঐচ্ছিক)</Label>
                    <Select value={bookingForm.ambulanceId} onValueChange={(value) => { const provider = ambulanceProviders.find((item) => item.id === value); setBookingForm({ ...bookingForm, ambulanceId: value, serviceType: provider?.type || bookingForm.serviceType }); }}>
                      <SelectTrigger className="mt-2"><SelectValue placeholder="স্বয়ংক্রিয়ভাবে নিকটতম অ্যাম্বুলেন্স" /></SelectTrigger>
                    <SelectContent>{bookingProviders.map((provider) => <SelectItem key={provider.id} value={provider.id}>{provider.name} — {provider.location}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
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
                            {type} Ambulance
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
                    disabled={submitting}
                  >
                    {submitting ? "অনুরোধ পাঠানো হচ্ছে..." : "অ্যাম্বুলেন্স বুক করুন"}
                  </Button>
                  {bookingMessage && <p role="status" className="rounded-md bg-sky-50 p-3 text-sm text-sky-800">{bookingMessage}</p>}
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
                  {pageSettings.tipsTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pageSettings.emergencyTips.map((tip, index) => (
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
              {pageSettings.providersTitle}
            </h2>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="availability">উপলব্ধতা অনুযায়ী</SelectItem>
                <SelectItem value="type">ধরন অনুযায়ী</SelectItem>
                <SelectItem value="location">এলাকা অনুযায়ী</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedProviders.map((provider) => (
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
                          src={
                            provider.image
                          }
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
                        </div>

                        <div className="space-y-2 mt-3 text-sm text-sky-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {provider.location} - {provider.serviceArea}
                          </div>
                          {provider.availabilityNote && <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{provider.availabilityNote}</div>}
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
                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(provider.serviceArea)}`, "_blank", "noopener,noreferrer")}
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
          {pagination.totalPages > 1 && <div className="mt-8 flex items-center justify-center gap-3"><Button variant="outline" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>আগের পৃষ্ঠা</Button><span className="text-sm text-sky-700">পৃষ্ঠা {pagination.currentPage} / {pagination.totalPages}</span><Button variant="outline" disabled={page >= pagination.totalPages} onClick={() => setPage((value) => value + 1)}>পরের পৃষ্ঠা</Button></div>}
        </div>

        {/* Provider Profiles Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-sky-800 mb-6">
            সার্ভিস প্রোভাইডার প্রোফাইল
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {sortedProviders.slice(0, 2).map((provider) => (
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
