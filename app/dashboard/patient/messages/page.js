"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Search, Phone, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const conversations = [
  {
    id: 1,
    doctor: "ডা. রহিম উদ্দিন",
    specialty: "হৃদরোগ বিশেষজ্ঞ",
    lastMessage: "আপনার রিপোর্ট দেখেছি। সব স্বাভাবিক আছে।",
    timestamp: "২ ঘন্টা আগে",
    unread: 0,
    online: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    doctor: "ডা. ফাতেমা খাতুন",
    specialty: "শিশু বিশেষজ্ঞ",
    lastMessage: "ওষুধ নিয়মিত খাওয়ান। কোন সমস্যা হলে জানাবেন।",
    timestamp: "১ দিন আগে",
    unread: 2,
    online: false,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    doctor: "ডা. করিম আহমেদ",
    specialty: "অর্থোপেডিক সার্জন",
    lastMessage: "ফিজিওথেরাপি চালিয়ে যান। ২ সপ্তাহ পর দেখা করবেন।",
    timestamp: "৩ দিন আগে",
    unread: 0,
    online: false,
    image: "/placeholder.svg?height=40&width=40",
  },
];

const messages = [
  {
    id: 1,
    sender: "patient",
    message: "ডাক্তার সাহেব, আমার বুকে ব্যথা হচ্ছে। কি করব?",
    timestamp: "১০:৩০ AM",
    date: "আজ",
  },
  {
    id: 2,
    sender: "doctor",
    message:
      "চিন্তার কিছু নেই। আপনার রিপোর্ট অনুযায়ী সব স্বাভাবিক। তবে নিয়মিত ওষুধ খান।",
    timestamp: "১০:৪৫ AM",
    date: "আজ",
  },
  {
    id: 3,
    sender: "patient",
    message: "ধন্যবাদ ডাক্তার সাহেব। ওষুধ নিয়মিত খাচ্ছি।",
    timestamp: "১১:০০ AM",
    date: "আজ",
  },
  {
    id: 4,
    sender: "doctor",
    message:
      "খুব ভাল। আর কোন সমস্যা হলে জানাবেন। পরবর্তী অ্যাপয়েন্টমেন্ট ১ মাস পর।",
    timestamp: "১১:১৫ AM",
    date: "আজ",
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-sky-800 mb-2">বার্তা</h1>
        <p className="text-sky-600">ডাক্তারদের সাথে যোগাযোগ করুন</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="bg-white/80 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle className="flex items-center text-sky-800">
                <MessageCircle className="w-5 h-5 mr-2" />
                কথোপকথন
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="ডাক্তার খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto">
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 cursor-pointer hover:bg-sky-50 transition-colors border-l-4 ${
                      selectedConversation.id === conversation.id
                        ? "bg-sky-50 border-sky-500"
                        : "border-transparent"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage
                            src={conversation.image || "/placeholder.svg"}
                          />
                          <AvatarFallback className="bg-sky-100 text-sky-800">
                            {conversation.doctor.split(" ")[1]?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sky-800 truncate">
                            {conversation.doctor}
                          </h4>
                          {conversation.unread > 0 && (
                            <Badge className="bg-red-500 text-white text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-sky-600 mb-1">
                          {conversation.specialty}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {conversation.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-white/80 backdrop-blur-sm h-full flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b border-sky-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage
                        src={selectedConversation.image || "/placeholder.svg"}
                      />
                      <AvatarFallback className="bg-sky-100 text-sky-800">
                        {selectedConversation.doctor.split(" ")[1]?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-sky-800">
                      {selectedConversation.doctor}
                    </h3>
                    <p className="text-sm text-sky-600">
                      {selectedConversation.specialty}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.online ? "অনলাইনে আছেন" : "অফলাইন"}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "patient"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === "patient"
                        ? "bg-sky-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span
                        className={`text-xs ${
                          message.sender === "patient"
                            ? "text-sky-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="border-t border-sky-100 p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="আপনার বার্তা লিখুন..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  className="bg-sky-500 hover:bg-sky-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
