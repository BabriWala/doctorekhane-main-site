"use client";

import { useState } from "react";
import {
  Calendar,
  FileText,
  History,
  Download,
  MessageCircle,
  Heart,
  User,
  Clock,
  MapPin,
  Phone,
  Star,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const sidebarItems = [
  { id: "dashboard", label: "ড্যাশবোর্ড", icon: User },
  { id: "appointments", label: "অ্যাপয়েন্টমেন্টসমূহ", icon: Calendar },
  { id: "prescriptions", label: "প্রেসক্রিপশন", icon: FileText },
  { id: "history", label: "চিকিৎসা ইতিহাস", icon: History },
  { id: "reports", label: "রিপোর্ট ডাউনলোড", icon: Download },
  { id: "messages", label: "বার্তা / চ্যাট", icon: MessageCircle },
  { id: "favorites", label: "প্রিয় ডাক্তার/হাসপাতাল", icon: Heart },
  { id: "reminders", label: "রিমাইন্ডার", icon: Bell },
];

const upcomingAppointments = [
  {
    id: 1,
    doctor: "ডা. রাজেশ কুমার",
    specialty: "হৃদরোগ বিশেষজ্ঞ",
    date: "২৫ ডিসেম্বর, ২০২৪",
    time: "১০:৩০ সকাল",
    hospital: "শিলিগুড়ি মেডিকেল কলেজ",
    status: "নিশ্চিত",
  },
  {
    id: 2,
    doctor: "ডা. প্রিয়া সরকার",
    specialty: "শিশু বিশেষজ্ঞ",
    date: "২৮ ডিসেম্বর, ২০২৪",
    time: "২:০০ বিকাল",
    hospital: "নর্থ বেঙ্গল হাসপাতাল",
    status: "অপেক্ষমাণ",
  },
];

const prescriptions = [
  {
    id: 1,
    doctor: "ডা. অমিত দাস",
    date: "২০ ডিসেম্বর, ২০২৪",
    diagnosis: "পিঠের ব্যথা",
    medicines: ["প্যারাসিটামল ৫০০mg", "আইবুপ্রোফেন ২০০mg"],
    instructions: "দিনে ৩ বার খাবারের পর",
  },
  {
    id: 2,
    doctor: "ডা. সুমিত্রা ব্যানার্জী",
    date: "১৫ ডিসেম্বর, ২০২৪",
    diagnosis: "সাধারণ জ্বর",
    medicines: ["প্যারাসিটামল ৫০০mg", "ভিটামিন সি"],
    instructions: "জ্বর থাকলে ৬ ঘণ্টা পর পর",
  },
];

const messages = [
  {
    id: 1,
    doctor: "ডা. রাজেশ কুমার",
    message: "আপনার পরীক্ষার রিপোর্ট ভালো এসেছে। নিয়মিত ওষুধ খেতে থাকুন।",
    time: "২ ঘণ্টা আগে",
    unread: true,
  },
  {
    id: 2,
    doctor: "ডা. প্রিয়া সরকার",
    message: "আগামীকালের অ্যাপয়েন্টমেন্টের জন্য খালি পেটে আসবেন।",
    time: "১ দিন আগে",
    unread: false,
  },
];

const favoriteDoctors = [
  {
    id: 1,
    name: "ডা. রাজেশ কুমার",
    specialty: "হৃদরোগ বিশেষজ্ঞ",
    hospital: "শিলিগুড়ি মেডিকেল কলেজ",
    rating: 4.8,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "ডা. প্রিয়া সরকার",
    specialty: "শিশু বিশেষজ্ঞ",
    hospital: "নর্থ বেঙ্গল হাসপাতাল",
    rating: 4.9,
    image: "/placeholder.svg?height=60&width=60",
  },
];

function AppSidebar() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>সৌ</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sky-800">সৌমেন সরকার</p>
            <p className="text-sm text-sky-600">রোগী ID: P001234</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator className="my-4" />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>সেটিংস</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LogOut className="h-4 w-4" />
                  <span>লগ আউট</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [newMessage, setNewMessage] = useState("");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-sky-800">
                  স্বাগতম, সৌমেন সরকার
                </h1>
                <p className="text-sky-600">
                  আপনার স্বাস্থ্য তথ্য এক নজরে দেখুন
                </p>
              </div>
              <Button className="bg-sky-600 hover:bg-sky-700">
                <Bell className="h-4 w-4 mr-2" />
                নোটিফিকেশন
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-sky-50 to-blue-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sky-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    আসন্ন অ্যাপয়েন্টমেন্ট
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.slice(0, 1).map((appointment) => (
                    <div key={appointment.id} className="space-y-2">
                      <p className="font-medium text-sky-800">
                        {appointment.doctor}
                      </p>
                      <p className="text-sm text-sky-600">
                        {appointment.specialty}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-sky-600">
                        <Clock className="h-4 w-4" />
                        {appointment.date} - {appointment.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-sky-600">
                        <MapPin className="h-4 w-4" />
                        {appointment.hospital}
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    সর্বশেষ প্রেসক্রিপশন
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {prescriptions.slice(0, 1).map((prescription) => (
                    <div key={prescription.id} className="space-y-2">
                      <p className="font-medium text-green-800">
                        {prescription.doctor}
                      </p>
                      <p className="text-sm text-green-600">
                        {prescription.diagnosis}
                      </p>
                      <p className="text-sm text-green-600">
                        {prescription.date}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-700 border-green-300 bg-transparent"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        ডাউনলোড
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-purple-800 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    নতুন বার্তা
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium text-purple-800">
                      ডা. রাজেশ কুমার
                    </p>
                    <p className="text-sm text-purple-600">
                      আপনার পরীক্ষার রিপোর্ট ভালো এসেছে...
                    </p>
                    <p className="text-xs text-purple-500">২ ঘণ্টা আগে</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-purple-700 border-purple-300 bg-transparent"
                    >
                      উত্তর দিন
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sky-800">দ্রুত অ্যাকশন</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                  >
                    <Calendar className="h-6 w-6" />
                    নতুন অ্যাপয়েন্টমেন্ট
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                  >
                    <Download className="h-6 w-6" />
                    রিপোর্ট ডাউনলোড
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                  >
                    <MessageCircle className="h-6 w-6" />
                    ডাক্তারকে বার্তা
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                  >
                    <Heart className="h-6 w-6" />
                    প্রিয় তালিকা
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "appointments":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-sky-800">
                অ্যাপয়েন্টমেন্টসমূহ
              </h1>
              <Button className="bg-sky-600 hover:bg-sky-700">
                নতুন অ্যাপয়েন্টমেন্ট বুক করুন
              </Button>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">আসন্ন</TabsTrigger>
                <TabsTrigger value="completed">সম্পন্ন</TabsTrigger>
                <TabsTrigger value="cancelled">বাতিল</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-sky-800">
                            {appointment.doctor}
                          </h3>
                          <p className="text-sky-600">
                            {appointment.specialty}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-sky-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {appointment.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {appointment.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {appointment.hospital}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              appointment.status === "নিশ্চিত"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              appointment.status === "নিশ্চিত"
                                ? "bg-green-100 text-green-800"
                                : ""
                            }
                          >
                            {appointment.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            সময় পরিবর্তন
                          </Button>
                          <Button variant="destructive" size="sm">
                            বাতিল
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        );

      case "prescriptions":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-sky-800">প্রেসক্রিপশন</h1>
            <div className="grid gap-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-sky-800">
                            {prescription.doctor}
                          </h3>
                          <p className="text-sky-600">{prescription.date}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sky-800">
                            রোগ নির্ণয়: {prescription.diagnosis}
                          </p>
                          <div className="mt-2">
                            <p className="text-sm font-medium text-sky-700">
                              ওষুধসমূহ:
                            </p>
                            <ul className="list-disc list-inside text-sm text-sky-600 mt-1">
                              {prescription.medicines.map((medicine, index) => (
                                <li key={index}>{medicine}</li>
                              ))}
                            </ul>
                          </div>
                          <p className="text-sm text-sky-600 mt-2">
                            <span className="font-medium">নির্দেশনা:</span>{" "}
                            {prescription.instructions}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          ডাউনলোড
                        </Button>
                        <Button variant="outline" size="sm">
                          শেয়ার করুন
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "messages":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-sky-800">বার্তা / চ্যাট</h1>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sky-800">কথোপকথন</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className="p-4 border-b hover:bg-sky-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>ডা</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sky-800">
                              {message.doctor}
                            </p>
                            <p className="text-sm text-sky-600 truncate">
                              {message.message}
                            </p>
                            <p className="text-xs text-sky-500">
                              {message.time}
                            </p>
                          </div>
                          {message.unread && (
                            <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-2">
                <Card className="h-96">
                  <CardHeader>
                    <CardTitle className="text-sky-800">
                      ডা. রাজেশ কুমার
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 space-y-4 mb-4">
                      <div className="bg-sky-100 p-3 rounded-lg max-w-xs">
                        <p className="text-sky-800">
                          আপনার পরীক্ষার রিপোর্ট ভালো এসেছে। নিয়মিত ওষুধ খেতে
                          থাকুন।
                        </p>
                        <p className="text-xs text-sky-600 mt-1">২ ঘণ্টা আগে</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="আপনার বার্তা লিখুন..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                        rows={2}
                      />
                      <Button className="bg-sky-600 hover:bg-sky-700">
                        পাঠান
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case "favorites":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-sky-800">
              প্রিয় ডাক্তার ও হাসপাতাল
            </h1>
            <div className="grid md:grid-cols-2 gap-6">
              {favoriteDoctors.map((doctor) => (
                <Card key={doctor.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={doctor.image || "/placeholder.svg"} />
                        <AvatarFallback>ডা</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sky-800">
                          {doctor.name}
                        </h3>
                        <p className="text-sky-600">{doctor.specialty}</p>
                        <p className="text-sm text-sky-500">
                          {doctor.hospital}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-sky-600">
                            {doctor.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          className="bg-sky-600 hover:bg-sky-700"
                        >
                          অ্যাপয়েন্টমেন্ট
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          কল করুন
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-sky-600">এই বিভাগটি শীঘ্রই আসছে...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <SidebarProvider>
        <div className="flex h-screen">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-sky-800">রোগী ড্যাশবোর্ড</h2>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
