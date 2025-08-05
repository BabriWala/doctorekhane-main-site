"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, User, MessageSquare, ThumbsUp, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

const reviews = [
  {
    id: 1,
    patient: "রহিম উদ্দিন",
    rating: 5,
    date: "২৩ ডিসেম্বর, ২০২৪",
    comment:
      "অসাধারণ চিকিৎসক। খুবই ধৈর্য সহকারে রোগীর কথা শোনেন এবং সঠিক চিকিৎসা দেন। আমি খুবই সন্তুষ্ট।",
    helpful: 12,
    replied: false,
  },
  {
    id: 2,
    patient: "ফাতেমা খাতুন",
    rating: 4,
    date: "২২ ডিসেম্বর, ২০২৪",
    comment:
      "ভালো ডাক্তার। তবে অপেক্ষার সময় একটু বেশি ছিল। চিকিৎসা ভালো পেয়েছি।",
    helpful: 8,
    replied: true,
    reply:
      "ধন্যবাদ আপনার মূল্যবান মতামতের জন্য। অপেক্ষার সময় কমানোর চেষ্টা করব।",
  },
  {
    id: 3,
    patient: "করিম আহমেদ",
    rating: 5,
    date: "২০ ডিসেম্বর, ২০২৪",
    comment:
      "দুর্দান্ত অভিজ্ঞতা। ডাক্তার সাহেব খুবই বিনয়ী এবং অভিজ্ঞ। আমার সমস্যার সমাধান পেয়েছি।",
    helpful: 15,
    replied: true,
    reply: "আপনার আস্থার জন্য ধন্যবাদ। সুস্থ থাকুন।",
  },
  {
    id: 4,
    patient: "সালমা বেগম",
    rating: 3,
    date: "১৮ ডিসেম্বর, ২০২৪",
    comment:
      "চিকিৎসা ভালো কিন্তু ফি একটু বেশি মনে হয়েছে। তবে সেবা ভালো পেয়েছি।",
    helpful: 5,
    replied: false,
  },
];

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`w-4 h-4 ${
        index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
      }`}
    />
  ));
};

export default function DoctorReviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("সব");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === "সব" || review.rating.toString() === ratingFilter;
    return matchesSearch && matchesRating;
  });

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100,
  }));

  const handleReply = (reviewId) => {
    // Handle reply submission
    setReplyingTo(null);
    setReplyText("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sky-800">রেটিং ও মন্তব্য</h1>
          <p className="text-sky-600">রোগীদের মতামত দেখুন এবং উত্তর দিন</p>
        </div>
      </motion.div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <div className="text-3xl font-bold mb-1">
                {averageRating.toFixed(1)}
              </div>
              <div className="text-yellow-100">গড় রেটিং</div>
              <div className="text-sm text-yellow-100 mt-2">
                {totalReviews} টি রিভিউ
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sky-800 text-lg">
                রেটিং বিতরণ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm text-sky-700">{rating}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-sky-600 w-8">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-4">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">ইতিবাচক রিভিউ</p>
                    <p className="text-2xl font-bold">
                      {reviews.filter((r) => r.rating >= 4).length}
                    </p>
                  </div>
                  <ThumbsUp className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-500 to-sky-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">উত্তর দেওয়া</p>
                    <p className="text-2xl font-bold">
                      {reviews.filter((r) => r.replied).length}
                    </p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-4 h-4" />
                  <Input
                    placeholder="রোগীর নাম বা মন্তব্য খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="রেটিং ফিল্টার" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="সব">সব রেটিং</SelectItem>
                  <SelectItem value="5">৫ স্টার</SelectItem>
                  <SelectItem value="4">৪ স্টার</SelectItem>
                  <SelectItem value="3">৩ স্টার</SelectItem>
                  <SelectItem value="2">২ স্টার</SelectItem>
                  <SelectItem value="1">১ স্��ার</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reviews List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-sky-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-sky-800 mb-2">
                  কোন রিভিউ পাওয়া যায়নি
                </h3>
                <p className="text-sky-600">
                  আপনার অনুসন্ধানের সাথে মিলে এমন কোন রিভিউ নেই।
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredReviews.map((review) => (
              <Card
                key={review.id}
                className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage
                        src={`/placeholder.svg?height=40&width=40&text=${review.patient.charAt(
                          0
                        )}`}
                      />
                      <AvatarFallback className="bg-sky-100 text-sky-800">
                        {review.patient.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sky-800">
                            {review.patient}
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-sky-600">•</span>
                            <span className="text-sm text-sky-600">
                              {review.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={review.replied ? "default" : "secondary"}
                          >
                            {review.replied
                              ? "উত্তর দেওয়া হয়েছে"
                              : "উত্তর প্রয়োজন"}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sky-700 mb-3">{review.comment}</p>

                      {review.replied && review.reply && (
                        <div className="bg-sky-50 p-3 rounded-lg mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 text-sky-600" />
                            <span className="text-sm font-medium text-sky-800">
                              আপনার উত্তর:
                            </span>
                          </div>
                          <p className="text-sky-700 text-sm">{review.reply}</p>
                        </div>
                      )}

                      {replyingTo === review.id ? (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="আপনার উত্তর লিখুন..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-sky-500 hover:bg-sky-600"
                              onClick={() => handleReply(review.id)}
                            >
                              উত্তর পাঠান
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setReplyingTo(null)}
                            >
                              বাতিল
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-sky-600">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{review.helpful} জন সহায়ক মনে করেছেন</span>
                            </div>
                          </div>
                          {!review.replied && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setReplyingTo(review.id)}
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              উত্তর দিন
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
