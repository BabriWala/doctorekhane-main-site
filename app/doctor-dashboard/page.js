"use client";

import { useState } from "react";
import {
  Calendar,
  Users,
  FileText,
  Clock,
  Phone,
  Star,
  Settings,
  LogOut,
  Upload,
  Edit,
  Eye,
  BarChart3,
  DollarSign,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  { id: "dashboard", label: "ড্যাশবোর্ড", icon: Activity },
  {
    id: "appointments",
    label: "অ্যাপয়েন্টমেন্ট ম্যানেজ করুন",
    icon: Calendar,
  },
  { id: "patients", label: "রোগীর তথ্য", icon: Users },
  { id: "prescriptions", label: "প্রেসক্রিপশন আপলোড", icon: FileText },
  { id: "profile", label: "প্রোফাইল সম্পাদনা", icon: Edit },
  { id: "analytics", label: "পরিসংখ্যান", icon: BarChart3 },
];

const todayAppointments = [
  {
    id: 1,
    patient: "সৌমেন সরকার",
    time: "১০:৩০ সকাল",
    type: "চেম্বার",
    status: "নিশ্চিত",
    problem: "বুকে ব্যথা",
  },
  {
    id: 2,
    patient: "রিতা দাস",
    time: "১১:০০ সকাল",
    type: "টেলিমেডিসিন",
    status: "অপেক্ষমাণ",
    problem: "উচ্চ রক্তচাপ",
  },
  {
    id: 3,
    patient: "অমিত রায়",
    time: "২:৩০ বিকাল",
    type: "চেম্বার",
    status: "নিশ্চিত",
    problem: "ডায়াবেটিস চেকআপ",
  },
];

const patients = [
  {
    id: 1,
    name: "সৌমেন সরকার",
    age: 45,
    lastVisit: "২০ ডিসেম্বর, ২০২৪",
    condition: "হৃদরোগ",
    phone: "৯৮৩০০০০০০১",
  },
  {
    id: 2,
    name: "রিতা দাস",
    age: 38,
    lastVisit: "১৮ ডিসেম্বর, ২০২৪",
    condition: "উচ্চ রক্তচাপ",
    phone: "৯৮৩০০০০০০২",
  },
  {
    id: 3,
    name: "অমিত রায়",
    age: 52,
    lastVisit: "১৫ ডিসেম্বর, ২০২৪",
    condition: "ডায়াবেটিস",
    phone: "৯৮৩০০০০০০৩",
  },
];

const reviews = [
  {
    id: 1,
    patient: "সৌমেন সরকার",
    rating: 5,
    comment: "খুবই ভালো ডাক্তার। ধৈর্য সহকারে সব কিছু বুঝিয়ে দেন।",
    date: "২২ ডিসেম্বর, ২০২৪",
  },
  {
    id: 2,
    patient: "রিতা দাস",
    rating: 4,
    comment: "সময়মতো দেখেন এবং ভালো পরামর্শ দেন।",
    date: "২০ ডিসেম্বর, ২০২৪",
  },
];

function AppSidebar() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" />
            <AvatarFallback>ডা</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sky-800">ডা. রাজেশ কুমার</p>
            <p className="text-sm text-sky-600">হৃদরোগ বিশেষজ্ঞ</p>
            <p className="text-xs text-sky-500">MBBS, MD (কার্ডিওলজি)</p>
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

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [prescriptionText, setPrescriptionText] = useState("");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-sky-800">
                  স্বাগতম, ডা. রাজেশ কুমার
                </h1>
                <p className="text-sky-600">আজকের কার্যক্রম এবং পরিসংখ্যান</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">চেম্বার সময় হালনাগাদ করুন</Button>
                <Button className="bg-sky-600 hover:bg-sky-700">
                  নতুন প্রেসক্রিপশন যুক্ত করুন
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-sky-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sky-600 text-sm font-medium">
                        আজকের অ্যাপয়েন্টমেন্ট
                      </p>
                      <p className="text-2xl font-bold text-sky-800">১২</p>
                    </div>
                    <Calendar className="h-8 w-8 text-sky-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">
                        মোট রোগী
                      </p>
                      <p className="text-2xl font-bold text-green-800">২৪৮</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">
                        এই মাসের আয়
                      </p>
                      <p className="text-2xl font-bold text-purple-800">
                        ৮৫,০০০ ৳
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">
                        গড় রেটিং
                      </p>
                      <p className="text-2xl font-bold text-orange-800">৪.৮</p>
                    </div>
                    <Star className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sky-800">
                  আজকের অ্যাপয়েন্টমেন্ট
                </CardTitle>
                <CardDescription>
                  আপনার আজকের সকল অ্যাপয়েন্টমেন্টের তালিকা
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-sky-50"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {appointment.patient.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sky-800">
                            {appointment.patient}
                          </p>
                          <p className="text-sm text-sky-600">
                            {appointment.problem}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-sky-500">
                            <Clock className="h-3 w-3" />
                            {appointment.time}
                            <Badge variant="outline" className="text-xs">
                              {appointment.type}
                            </Badge>
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
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          দেখুন
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sky-800">সাম্প্রতিক রিভিউ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {review.patient.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sky-800">
                              {review.patient}
                            </p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-sky-600 mt-1">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-sky-500">{review.date}</p>
                      </div>
                    </div>
                  ))}
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
                অ্যাপয়েন্টমেন্ট ম্যানেজমেন্ট
              </h1>
              <Button className="bg-sky-600 hover:bg-sky-700">
                নতুন স্লট যুক্ত করুন
              </Button>
            </div>

            <Tabs defaultValue="today" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="today">আজ</TabsTrigger>
                <TabsTrigger value="upcoming">আসন্ন</TabsTrigger>
                <TabsTrigger value="completed">সম্পন্ন</TabsTrigger>
                <TabsTrigger value="schedule">সময়সূচি</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="space-y-4">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>রোগীর নাম</TableHead>
                          <TableHead>সময়</TableHead>
                          <TableHead>ধরন</TableHead>
                          <TableHead>সমস্যা</TableHead>
                          <TableHead>স্ট্যাটাস</TableHead>
                          <TableHead>অ্যাকশন</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {todayAppointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium">
                              {appointment.patient}
                            </TableCell>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {appointment.type}
                              </Badge>
                            </TableCell>
                            <TableCell>{appointment.problem}</TableCell>
                            <TableCell>
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
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  সম্পাদনা
                                </Button>
                                <Button size="sm" variant="destructive">
                                  বাতিল
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sky-800">
                      আপনার সপ্তাহিক সময়সূচি নির্ধারণ করুন
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        "রবিবার",
                        "সোমবার",
                        "মঙ্গলবার",
                        "বুধবার",
                        "বৃহস্পতিবার",
                        "শুক্রবার",
                        "শনিবার",
                      ].map((day) => (
                        <div key={day} className="space-y-2">
                          <Label className="text-sky-700 font-medium">
                            {day}
                          </Label>
                          <div className="flex gap-2">
                            <Input placeholder="শুরুর সময়" type="time" />
                            <Input placeholder="শেষ সময়" type="time" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="bg-sky-600 hover:bg-sky-700">
                      সময়সূচি সংরক্ষণ করুন
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      case "patients":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-sky-800">রোগীর তথ্য</h1>
              <div className="flex gap-2">
                <Input placeholder="রোগী খুঁজুন..." className="w-64" />
                <Button variant="outline">খুঁজুন</Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>নাম</TableHead>
                      <TableHead>বয়স</TableHead>
                      <TableHead>শেষ ভিজিট</TableHead>
                      <TableHead>অবস্থা</TableHead>
                      <TableHead>ফোন</TableHead>
                      <TableHead>অ্যাকশন</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">
                          {patient.name}
                        </TableCell>
                        <TableCell>{patient.age} বছর</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{patient.condition}</Badge>
                        </TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              দেখুন
                            </Button>
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4 mr-2" />
                              কল
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "prescriptions":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-sky-800">
              প্রেসক্রিপশন আপলোড
            </h1>

            <Card>
              <CardHeader>
                <CardTitle className="text-sky-800">
                  নতুন প্রেসক্রিপশন তৈরি করুন
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label
                    htmlFor="patient-select"
                    className="text-sky-700 font-medium"
                  >
                    রোগী নির্বাচন করুন
                  </Label>
                  <Select
                    value={selectedPatient}
                    onValueChange={setSelectedPatient}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="রোগী নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem
                          key={patient.id}
                          value={patient.id.toString()}
                        >
                          {patient.name} - {patient.condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="prescription"
                    className="text-sky-700 font-medium"
                  >
                    প্রেসক্রিপশন ও পরামর্শ
                  </Label>
                  <Textarea
                    id="prescription"
                    value={prescriptionText}
                    onChange={(e) => setPrescriptionText(e.target.value)}
                    placeholder="ওষুধের নাম, ডোজ, খাওয়ার নিয়ম এবং পরামর্শ লিখুন..."
                    className="mt-2"
                    rows={8}
                  />
                </div>

                <div>
                  <Label className="text-sky-700 font-medium">
                    ফাইল আপলোড (ঐচ্ছিক)
                  </Label>
                  <div className="mt-2 border-2 border-dashed border-sky-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-sky-400 mx-auto mb-2" />
                    <p className="text-sky-600">PDF বা ছবি আপলোড করুন</p>
                    <Button variant="outline" className="mt-2 bg-transparent">
                      ফাইল নির্বাচন করুন
                    </Button>
                  </div>
                </div>

                <Button className="bg-sky-600 hover:bg-sky-700">
                  প্রেসক্রিপশন সংরক্ষণ করুন
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-sky-800">
              পরিসংখ্যান ও বিশ্লেষণ
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sky-800">মাসিক রোগী</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-sky-800 mb-2">
                    ১২৪
                  </div>
                  <p className="text-sm text-green-600">
                    +১২% গত মাসের তুলনায়
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sky-800">
                    সর্বোচ্চ ব্যস্ত দিন
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-sky-800 mb-2">
                    মঙ্গলবার
                  </div>
                  <p className="text-sm text-sky-600">
                    গড়ে ১৮টি অ্যাপয়েন্টমেন্ট
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sky-800">
                    সর্বোচ্চ ব্যস্ত সময়
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-sky-800 mb-2">
                    ১০-১২ সকাল
                  </div>
                  <p className="text-sm text-sky-600">৪৫% অ্যাপয়েন্টমেন্ট</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sky-800">
                  রোগের ধরন অনুযায়ী বিভাজন
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sky-700">হৃদরোগ</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-sky-200 rounded-full h-2">
                        <div
                          className="bg-sky-600 h-2 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-sky-600">৪৫%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sky-700">ডায়াবেটিস</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-sky-200 rounded-full h-2">
                        <div
                          className="bg-sky-600 h-2 rounded-full"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-sky-600">৩০%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sky-700">উচ্চ রক্তচাপ</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-sky-200 rounded-full h-2">
                        <div
                          className="bg-sky-600 h-2 rounded-full"
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-sky-600">২৫%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-sky-800">
              প্রোফাইল সম্পাদনা
            </h1>

            <Card>
              <CardHeader>
                <CardTitle className="text-sky-800">ব্যক্তিগত তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback>ডা</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">ছবি পরিবর্তন করুন</Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sky-700 font-medium">
                      নাম
                    </Label>
                    <Input
                      id="name"
                      defaultValue="ডা. রাজেশ কুমার"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="specialty"
                      className="text-sky-700 font-medium"
                    >
                      বিশেষত্ব
                    </Label>
                    <Input
                      id="specialty"
                      defaultValue="হৃদরোগ বিশেষজ্ঞ"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="qualification"
                      className="text-sky-700 font-medium"
                    >
                      যোগ্যতা
                    </Label>
                    <Input
                      id="qualification"
                      defaultValue="MBBS, MD (কার্ডিওলজি)"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="experience"
                      className="text-sky-700 font-medium"
                    >
                      অভিজ্ঞতা
                    </Label>
                    <Input
                      id="experience"
                      defaultValue="১৫ বছর"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sky-700 font-medium">
                      ফোন নম্বর
                    </Label>
                    <Input
                      id="phone"
                      defaultValue="৯৮৩০০০০০০০"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sky-700 font-medium">
                      ইমেইল
                    </Label>
                    <Input
                      id="email"
                      defaultValue="dr.rajesh@hospital.com"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-sky-700 font-medium">
                    সংক্ষিপ্ত পরিচয়
                  </Label>
                  <Textarea
                    id="bio"
                    defaultValue="১৫ বছরের অভিজ্ঞতা সম্পন্ন হৃদরোগ বিশেষজ্ঞ। শিলিগুড়ি মেডিকেল কলেজে কর্মরত।"
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label className="text-sky-700 font-medium">
                    হাসপাতাল সংযুক্তি
                  </Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>শিলিগুড়ি মেডিকেল কলেজ</span>
                      <Button size="sm" variant="outline">
                        সরান
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      নতুন হাসপাতাল যুক্ত করুন
                    </Button>
                  </div>
                </div>

                <Button className="bg-sky-600 hover:bg-sky-700">
                  প্রোফাইল সংরক্ষণ করুন
                </Button>
              </CardContent>
            </Card>
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
                <h2 className="font-semibold text-sky-800">
                  ডাক্তার ড্যাশবোর্ড
                </h2>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
