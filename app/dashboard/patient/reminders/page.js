"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Calendar, Clock, Pill, Plus, Trash2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

const reminders = [
  {
    id: 1,
    title: "এমলোডিপিন সেবন",
    type: "medicine",
    time: "৮:০০ AM",
    frequency: "প্রতিদিন",
    description: "উচ্চ রক্তচাপের ওষুধ",
    active: true,
    nextDue: "আজ ৮:০০ AM",
    doctor: "ডা. রহিম উদ্দিন",
  },
  {
    id: 2,
    title: "ডায়াবেটিস চেকআপ",
    type: "appointment",
    time: "১০:০০ AM",
    frequency: "৩ মাস পর পর",
    description: "নিয়মিত ডায়াবেটিস পরীক্ষা",
    active: true,
    nextDue: "৫ জানুয়ারি, ২০২৫",
    doctor: "ডা. নাসির উদ্দিন",
  },
  {
    id: 3,
    title: "রক্তচাপ মাপা",
    type: "checkup",
    time: "৬:০০ PM",
    frequency: "সপ্তাহে ২ বার",
    description: "বাড়িতে রক্তচাপ পরিমাপ",
    active: true,
    nextDue: "আজ ৬:০০ PM",
    doctor: "ডা. রহিম উদ্দিন",
  },
  {
    id: 4,
    title: "ব্যায়াম করা",
    type: "exercise",
    time: "৬:০০ AM",
    frequency: "প্রতিদিন",
    description: "৩০ মিনিট হাঁটা",
    active: false,
    nextDue: "আগামীকাল ৬:০০ AM",
    doctor: "ডা. রহিম উদ্দিন",
  },
];

const reminderTypes = [
  { value: "medicine", label: "ওষুধ সেবন", icon: Pill },
  { value: "appointment", label: "অ্যাপয়েন্টমেন্ট", icon: Calendar },
  { value: "checkup", label: "চেকআপ", icon: Check },
  { value: "exercise", label: "ব্যায়াম", icon: Clock },
];

export default function RemindersPage() {
  const [reminderList, setReminderList] = useState(reminders);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    type: "",
    time: "",
    frequency: "",
    description: "",
    doctor: "",
  });

  const toggleReminder = (id) => {
    setReminderList(
      reminderList.map((reminder) =>
        reminder.id === id
          ? { ...reminder, active: !reminder.active }
          : reminder
      )
    );
  };

  const deleteReminder = (id) => {
    setReminderList(reminderList.filter((reminder) => reminder.id !== id));
  };

  const addReminder = () => {
    if (newReminder.title && newReminder.type && newReminder.time) {
      const reminder = {
        id: Date.now(),
        ...newReminder,
        active: true,
        nextDue: "আগামীকাল " + newReminder.time,
      };
      setReminderList([...reminderList, reminder]);
      setNewReminder({
        title: "",
        type: "",
        time: "",
        frequency: "",
        description: "",
        doctor: "",
      });
      setShowAddDialog(false);
    }
  };

  const getTypeIcon = (type) => {
    const typeData = reminderTypes.find((t) => t.value === type);
    return typeData ? typeData.icon : Bell;
  };

  const getTypeBadge = (type) => {
    const colors = {
      medicine: "bg-blue-100 text-blue-800",
      appointment: "bg-green-100 text-green-800",
      checkup: "bg-purple-100 text-purple-800",
      exercise: "bg-orange-100 text-orange-800",
    };
    const labels = {
      medicine: "ওষুধ",
      appointment: "অ্যাপয়েন্টমেন্ট",
      checkup: "চেকআপ",
      exercise: "ব্যায়াম",
    };
    return (
      <Badge className={colors[type] || "bg-gray-100 text-gray-800"}>
        {labels[type] || type}
      </Badge>
    );
  };

  const activeReminders = reminderList.filter((r) => r.active);
  const inactiveReminders = reminderList.filter((r) => !r.active);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-sky-800 mb-2">রিমাইন্ডার</h1>
            <p className="text-sky-600">
              আপনার স্বাস্থ্য সংক্রান্ত রিমাইন্ডার পরিচালনা করুন
            </p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-sky-500 hover:bg-sky-600">
                <Plus className="w-4 h-4 mr-2" />
                নতুন রিমাইন্ডার
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-sky-800">
                  নতুন রিমাইন্ডার যোগ করুন
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">শিরোনাম</Label>
                  <Input
                    id="title"
                    value={newReminder.title}
                    onChange={(e) =>
                      setNewReminder({ ...newReminder, title: e.target.value })
                    }
                    placeholder="রিমাইন্ডারের শিরোনাম"
                  />
                </div>
                <div>
                  <Label htmlFor="type">ধরন</Label>
                  <Select
                    value={newReminder.type}
                    onValueChange={(value) =>
                      setNewReminder({ ...newReminder, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="রিমাইন্ডারের ধরন নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {reminderTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="time">সময়</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newReminder.time}
                    onChange={(e) =>
                      setNewReminder({ ...newReminder, time: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">ফ্রিকোয়েন্সি</Label>
                  <Select
                    value={newReminder.frequency}
                    onValueChange={(value) =>
                      setNewReminder({ ...newReminder, frequency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="কত ঘন ঘন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="প্রতিদিন">প্রতিদিন</SelectItem>
                      <SelectItem value="সপ্তাহে ১ বার">
                        সপ্তাহে ১ বার
                      </SelectItem>
                      <SelectItem value="সপ্তাহে ২ বার">
                        সপ্তাহে ২ বার
                      </SelectItem>
                      <SelectItem value="মাসে ১ বার">মাসে ১ বার</SelectItem>
                      <SelectItem value="৩ মাস পর পর">৩ মাস পর পর</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">বিবরণ</Label>
                  <Textarea
                    id="description"
                    value={newReminder.description}
                    onChange={(e) =>
                      setNewReminder({
                        ...newReminder,
                        description: e.target.value,
                      })
                    }
                    placeholder="অতিরিক্ত তথ্য"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="doctor">ডাক্তার (ঐচ্ছিক)</Label>
                  <Input
                    id="doctor"
                    value={newReminder.doctor}
                    onChange={(e) =>
                      setNewReminder({ ...newReminder, doctor: e.target.value })
                    }
                    placeholder="ডাক্তারের নাম"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={addReminder}
                    className="flex-1 bg-sky-500 hover:bg-sky-600"
                  >
                    যোগ করুন
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddDialog(false)}
                    className="flex-1"
                  >
                    বাতিল
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-sky-500 to-blue-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sky-100">সক্রিয় রিমাইন্ডার</p>
                  <p className="text-2xl font-bold">{activeReminders.length}</p>
                </div>
                <Bell className="w-8 h-8 text-sky-200" />
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
                  <p className="text-green-100">আজকের রিমাইন্ডার</p>
                  <p className="text-2xl font-bold">
                    {
                      activeReminders.filter((r) => r.nextDue.includes("আজ"))
                        .length
                    }
                  </p>
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
                  <p className="text-purple-100">মোট রিমাইন্ডার</p>
                  <p className="text-2xl font-bold">{reminderList.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Active Reminders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sky-800">সক্রিয় রিমাইন্ডার</CardTitle>
          </CardHeader>
          <CardContent>
            {activeReminders.length > 0 ? (
              <div className="space-y-4">
                {activeReminders.map((reminder) => {
                  const IconComponent = getTypeIcon(reminder.type);
                  return (
                    <motion.div
                      key={reminder.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="p-2 bg-sky-100 rounded-lg">
                            <IconComponent className="w-5 h-5 text-sky-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-medium text-sky-800">
                                {reminder.title}
                              </h3>
                              {getTypeBadge(reminder.type)}
                            </div>
                            <p className="text-sm text-sky-600 mb-1">
                              {reminder.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-sky-600">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {reminder.time}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {reminder.frequency}
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="text-sm font-medium text-sky-700">
                                পরবর্তী:{" "}
                              </span>
                              <span className="text-sm text-sky-600">
                                {reminder.nextDue}
                              </span>
                            </div>
                            {reminder.doctor && (
                              <div className="mt-1">
                                <span className="text-sm text-sky-500">
                                  ডাক্তার: {reminder.doctor}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={reminder.active}
                            onCheckedChange={() => toggleReminder(reminder.id)}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteReminder(reminder.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">কোন সক্রিয় রিমাইন্ডার নেই</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Inactive Reminders */}
      {inactiveReminders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sky-800">
                নিষ্ক্রিয় রিমাইন্ডার
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inactiveReminders.map((reminder) => {
                  const IconComponent = getTypeIcon(reminder.type);
                  return (
                    <div
                      key={reminder.id}
                      className="p-4 border border-gray-200 rounded-lg bg-gray-50 opacity-60"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="p-2 bg-gray-200 rounded-lg">
                            <IconComponent className="w-5 h-5 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-medium text-gray-700">
                                {reminder.title}
                              </h3>
                              {getTypeBadge(reminder.type)}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {reminder.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {reminder.time}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {reminder.frequency}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={reminder.active}
                            onCheckedChange={() => toggleReminder(reminder.id)}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteReminder(reminder.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
