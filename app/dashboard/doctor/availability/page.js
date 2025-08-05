"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const weekDays = [
  { key: "sunday", name: "রবিবার", enabled: true },
  { key: "monday", name: "সোমবার", enabled: true },
  { key: "tuesday", name: "মঙ্গলবার", enabled: true },
  { key: "wednesday", name: "বুধবার", enabled: true },
  { key: "thursday", name: "বৃহস্পতিবার", enabled: true },
  { key: "friday", name: "শুক্রবার", enabled: false },
  { key: "saturday", name: "শনিবার", enabled: true },
];

const timeSlots = [
  {
    id: 1,
    day: "রবিবার",
    startTime: "09:00",
    endTime: "13:00",
    type: "সকাল",
    maxPatients: 20,
  },
  {
    id: 2,
    day: "রবিবার",
    startTime: "15:00",
    endTime: "19:00",
    type: "বিকাল",
    maxPatients: 15,
  },
  {
    id: 3,
    day: "সোমবার",
    startTime: "09:00",
    endTime: "13:00",
    type: "সকাল",
    maxPatients: 20,
  },
  {
    id: 4,
    day: "সোমবার",
    startTime: "15:00",
    endTime: "19:00",
    type: "বিকাল",
    maxPatients: 15,
  },
  {
    id: 5,
    day: "মঙ্গলবার",
    startTime: "09:00",
    endTime: "13:00",
    type: "সকাল",
    maxPatients: 20,
  },
  {
    id: 6,
    day: "বুধবার",
    startTime: "09:00",
    endTime: "13:00",
    type: "সকাল",
    maxPatients: 20,
  },
  {
    id: 7,
    day: "বুধবার",
    startTime: "15:00",
    endTime: "19:00",
    type: "বিকাল",
    maxPatients: 15,
  },
  {
    id: 8,
    day: "বৃহস্পতিবার",
    startTime: "09:00",
    endTime: "13:00",
    type: "সকাল",
    maxPatients: 20,
  },
  {
    id: 9,
    day: "শনিবার",
    startTime: "09:00",
    endTime: "12:00",
    type: "সকাল",
    maxPatients: 10,
  },
];

export default function DoctorAvailability() {
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [daySettings, setDaySettings] = useState(weekDays);

  const toggleDay = (dayKey) => {
    setDaySettings((prev) =>
      prev.map((day) =>
        day.key === dayKey ? { ...day, enabled: !day.enabled } : day
      )
    );
  };

  const getSlotsByDay = (dayName) => {
    return timeSlots.filter((slot) => slot.day === dayName);
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
              উপস্থিতি সেট করুন
            </h1>
            <p className="text-sky-600">
              আপনার চেম্বারের সময় এবং রোগী সংখ্যা নির্ধারণ করুন
            </p>
          </div>
          <Button
            className="bg-sky-500 hover:bg-sky-600"
            onClick={() => setShowAddSlot(!showAddSlot)}
          >
            <Plus className="w-4 h-4 mr-2" />
            নতুন সময় যোগ করুন
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
                  <p className="text-blue-100">সক্রিয় দিন</p>
                  <p className="text-2xl font-bold">
                    {daySettings.filter((d) => d.enabled).length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-200" />
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
                  <p className="text-green-100">মোট স্লট</p>
                  <p className="text-2xl font-bold">{timeSlots.length}</p>
                </div>
                <Clock className="w-8 h-8 text-green-200" />
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
                  <p className="text-purple-100">সাপ্তাহিক ঘন্টা</p>
                  <p className="text-2xl font-bold">৪২</p>
                </div>
                <Clock className="w-8 h-8 text-purple-200" />
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
                  <p className="text-orange-100">সর্বোচ্চ রোগী</p>
                  <p className="text-2xl font-bold">১৫৫</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Day Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sky-800">সাপ্তাহিক দিন সেটিংস</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {daySettings.map((day) => (
                <div
                  key={day.key}
                  className="flex items-center justify-between p-3 border border-sky-200 rounded-lg"
                >
                  <Label htmlFor={day.key} className="text-sky-800 font-medium">
                    {day.name}
                  </Label>
                  <Switch
                    id={day.key}
                    checked={day.enabled}
                    onCheckedChange={() => toggleDay(day.key)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add New Slot Form */}
      {showAddSlot && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sky-800">
                নতুন সময় স্লট যোগ করুন
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="day">দিন</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="দিন নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {daySettings
                        .filter((d) => d.enabled)
                        .map((day) => (
                          <SelectItem key={day.key} value={day.name}>
                            {day.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startTime">শুরুর সময়</Label>
                  <Input type="time" />
                </div>
                <div>
                  <Label htmlFor="endTime">শেষের সময়</Label>
                  <Input type="time" />
                </div>
                <div>
                  <Label htmlFor="maxPatients">সর্বোচ্চ রোগী</Label>
                  <Input type="number" placeholder="রোগী সংখ্যা" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="bg-sky-500 hover:bg-sky-600">
                  <Save className="w-4 h-4 mr-2" />
                  সংরক্ষণ করুন
                </Button>
                <Button variant="outline" onClick={() => setShowAddSlot(false)}>
                  <X className="w-4 h-4 mr-2" />
                  বাতিল
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Time Slots by Day */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="space-y-6">
          {daySettings
            .filter((d) => d.enabled)
            .map((day) => {
              const daySlots = getSlotsByDay(day.name);
              return (
                <Card key={day.key} className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-sky-800 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      {day.name}
                      <Badge variant="secondary" className="ml-2">
                        {daySlots.length} স্লট
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {daySlots.length === 0 ? (
                      <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-sky-300 mx-auto mb-4" />
                        <p className="text-sky-600">
                          এই দিনের জন্য কোন সময় স্লট নেই
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {daySlots.map((slot) => (
                          <div
                            key={slot.id}
                            className="border border-sky-200 rounded-lg p-4 hover:bg-sky-50 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-medium text-sky-800">
                                  {slot.type} সেশন
                                </h4>
                                <div className="flex items-center gap-1 text-sm text-sky-600">
                                  <Clock className="w-4 h-4" />
                                  {slot.startTime} - {slot.endTime}
                                </div>
                              </div>
                              <Badge className="bg-sky-100 text-sky-800">
                                সর্বোচ্চ {slot.maxPatients} জন
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingSlot(slot.id)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                সম্পাদনা
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                মুছুন
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </motion.div>

      {/* Quick Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sky-800">দ্রুত সেটিংস</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col bg-sky-500 hover:bg-sky-600">
                <Clock className="w-6 h-6 mb-2" />
                সাধারণ সময়সূচী
                <span className="text-xs">৯টা-১টা, ৩টা-৭টা</span>
              </Button>
              <Button className="h-20 flex flex-col bg-green-500 hover:bg-green-600">
                <Calendar className="w-6 h-6 mb-2" />
                সপ্তাহান্তে বন্ধ
                <span className="text-xs">শুক্র-শনি বন্ধ</span>
              </Button>
              <Button className="h-20 flex flex-col bg-purple-500 hover:bg-purple-600">
                <Clock className="w-6 h-6 mb-2" />
                জরুরি সময়
                <span className="text-xs">২৪/৭ উপলব্ধ</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
