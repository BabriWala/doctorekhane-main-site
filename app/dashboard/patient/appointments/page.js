"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  User,
  Phone,
  MoreHorizontal,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const appointments = [
  {
    id: 1,
    doctor: "ডা. রহিম উদ্দিন",
    specialty: "হৃদরোগ বিশেষজ্ঞ",
    date: "২৫ ডিসেম্বর, ২০২৪",
    time: "১০:৩০ AM",
    hospital: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
    type: "chamber",
    status: "upcoming",
    appointmentId: "APT-001",
  },
  {
    id: 2,
    doctor: "ডা. ফাতেমা খাতুন",
    specialty: "শিশু বিশেষজ্ঞ",
    date: "২৮ ডিসেম্বর, ২০২৪",
    time: "২:০০ PM",
    hospital: "বারডেম হাসপাতাল",
    type: "telemedicine",
    status: "upcoming",
    appointmentId: "APT-002",
  },
  {
    id: 3,
    doctor: "ডা. করিম আহমেদ",
    specialty: "অর্থোপেডিক সার্জন",
    date: "২০ ডিসেম্বর, ২০২৪",
    time: "৩:০০ PM",
    hospital: "স্কয়ার হাসপাতাল",
    type: "chamber",
    status: "completed",
    appointmentId: "APT-003",
  },
  {
    id: 4,
    doctor: "ডা. নাসির উদ্দিন",
    specialty: "ডায়াবেটিস বিশেষজ্ঞ",
    date: "১৫ ডিসেম্বর, ২০২৪",
    time: "১১:০০ AM",
    hospital: "বারডেম হাসপাতাল",
    type: "telemedicine",
    status: "completed",
    appointmentId: "APT-004",
  },
  {
    id: 5,
    doctor: "ডা. সালমা বেগম",
    specialty: "গাইনি বিশেষজ্ঞ",
    date: "১০ ডিসেম্বর, ২০২৪",
    time: "৪:৩০ PM",
    hospital: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
    type: "chamber",
    status: "cancelled",
    appointmentId: "APT-005",
  },
];

export default function AppointmentsPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const filteredAppointments = appointments.filter((appointment) => {
    const statusMatch =
      filterStatus === "all" || appointment.status === filterStatus;
    const typeMatch = filterType === "all" || appointment.type === filterType;
    return statusMatch && typeMatch;
  });

  const upcomingAppointments = filteredAppointments.filter(
    (apt) => apt.status === "upcoming"
  );
  const pastAppointments = filteredAppointments.filter(
    (apt) => apt.status === "completed"
  );
  const cancelledAppointments = filteredAppointments.filter(
    (apt) => apt.status === "cancelled"
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">আসন্ন</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">বাতিল</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type) => {
    return type === "telemedicine" ? (
      <Badge variant="outline" className="text-purple-600 border-purple-200">
        <Video className="w-3 h-3 mr-1" />
        টেলিমেডিসিন
      </Badge>
    ) : (
      <Badge variant="outline" className="text-sky-600 border-sky-200">
        <User className="w-3 h-3 mr-1" />
        চেম্বার
      </Badge>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-sky-800 mb-2">
          আমার অ্যাপয়েন্টমেন্ট
        </h1>
        <p className="text-sky-600">
          আপনার সকল অ্যাপয়েন্টমেন্ট দেখুন এবং পরিচালনা করুন
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-sky-600" />
                <span className="text-sm font-medium text-sky-800">
                  ফিল্টার:
                </span>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="স্ট্যাটাস" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                  <SelectItem value="upcoming">আসন্ন</SelectItem>
                  <SelectItem value="completed">সম্পন্ন</SelectItem>
                  <SelectItem value="cancelled">বাতিল</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="টাইপ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব টাইপ</SelectItem>
                  <SelectItem value="chamber">চেম্বার</SelectItem>
                  <SelectItem value="telemedicine">টেলিমেডিসিন</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Appointments Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">
              আসন্ন ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              পূর্ববর্তী ({pastAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              বাতিল ({cancelledAppointments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sky-800">
                  আসন্ন অ্যাপয়েন্টমেন্ট
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-medium text-sky-800">
                                {appointment.doctor}
                              </h3>
                              {getTypeBadge(appointment.type)}
                            </div>
                            <p className="text-sm text-sky-600 mb-1">
                              {appointment.specialty}
                            </p>
                            <div className="flex items-center text-sm text-sky-600 mb-1">
                              <Calendar className="w-4 h-4 mr-1" />
                              {appointment.date}
                            </div>
                            <div className="flex items-center text-sm text-sky-600 mb-1">
                              <Clock className="w-4 h-4 mr-1" />
                              {appointment.time}
                            </div>
                            <div className="flex items-center text-sm text-sky-600">
                              <MapPin className="w-4 h-4 mr-1" />
                              {appointment.hospital}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(appointment.status)}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  সময় পরিবর্তন করুন
                                </DropdownMenuItem>
                                <DropdownMenuItem>বাতিল করুন</DropdownMenuItem>
                                <DropdownMenuItem>
                                  বিস্তারিত দেখুন
                                </DropdownMenuItem>
                                {appointment.type === "telemedicine" && (
                                  <DropdownMenuItem>
                                    <Video className="w-4 h-4 mr-2" />
                                    ভিডিও কলে যোগ দিন
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4 mr-1" />
                            কল করুন
                          </Button>
                          <Button size="sm" variant="outline">
                            সময় পরিবর্তন
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            বাতিল করুন
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      কোন আসন্ন অ্যাপয়েন্টমেন্ট নেই
                    </p>
                    <Button className="mt-4 bg-sky-500 hover:bg-sky-600">
                      নতুন অ্যাপয়েন্টমেন্ট বুক করুন
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sky-800">
                  পূর্ববর্তী অ্যাপয়েন্টমেন্ট
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ডাক্তার</TableHead>
                      <TableHead>তারিখ ও সময়</TableHead>
                      <TableHead>হাসপাতাল</TableHead>
                      <TableHead>টাইপ</TableHead>
                      <TableHead>স্ট্যাটাস</TableHead>
                      <TableHead>কার্যক্রম</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sky-800">
                              {appointment.doctor}
                            </div>
                            <div className="text-sm text-sky-600">
                              {appointment.specialty}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{appointment.date}</div>
                            <div className="text-sky-600">
                              {appointment.time}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {appointment.hospital}
                        </TableCell>
                        <TableCell>{getTypeBadge(appointment.type)}</TableCell>
                        <TableCell>
                          {getStatusBadge(appointment.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              প্রেসক্রিপশন
                            </Button>
                            <Button size="sm" variant="outline">
                              পুনরায় বুক করুন
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

          <TabsContent value="cancelled">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sky-800">
                  বাতিল অ্যাপয়েন্টমেন্ট
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cancelledAppointments.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ডাক্তার</TableHead>
                        <TableHead>তারিখ ও সময়</TableHead>
                        <TableHead>হাসপাতাল</TableHead>
                        <TableHead>টাইপ</TableHead>
                        <TableHead>স্ট্যাটাস</TableHead>
                        <TableHead>কার্যক্রম</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cancelledAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sky-800">
                                {appointment.doctor}
                              </div>
                              <div className="text-sm text-sky-600">
                                {appointment.specialty}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{appointment.date}</div>
                              <div className="text-sky-600">
                                {appointment.time}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {appointment.hospital}
                          </TableCell>
                          <TableCell>
                            {getTypeBadge(appointment.type)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(appointment.status)}
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              পুনরায় বুক করুন
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      কোন বাতিল অ্যাপয়েন্টমেন্ট নেই
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
