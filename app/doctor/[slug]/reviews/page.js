"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  Filter,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  CheckCircle,
  Calendar,
  User,
  ChevronLeft,
  Send,
  Heart,
  Flag,
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function DoctorReviewsPage() {
  const [reviewFilter, setReviewFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    comment: "",
    patientName: "",
    visitDate: "",
    treatmentType: "",
    wouldRecommend: true,
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState({});

  // Mock doctor data
  const doctor = {
    id: "1",
    name: "ডা. রাহুল সরকার",
    specialty: "হৃদরোগ বিশেষজ্ঞ",
    rating: 4.8,
    reviewCount: 245,
    image:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=120&width=120",
  };

  // Mock reviews data
  const allReviews = [
    {
      id: 1,
      patientName: "রমেশ চন্দ্র দাস",
      patientInitial: "র",
      rating: 5,
      title: "অসাধারণ চিকিৎসক",
      comment:
        "ডাক্তার খুবই আন্তরিক ও সময়মতো দেখেছেন। হৃদরোগের সমস্যার জন্য খুব ভালো পরামর্শ দিয়েছেন। তার পরামর্শ অনুযায়ী চিকিৎসা নিয়ে অনেক উপকার পেয়েছি।",
      date: "১৫ নভেম্বর, ২০২৪",
      visitDate: "১০ নভেম্বর, ২০২৪",
      treatmentType: "হার্ট চেকআপ",
      verified: true,
      helpful: 12,
      notHelpful: 1,
      wouldRecommend: true,
      response: {
        doctorName: "ডা. রাহুল সরকার",
        message:
          "ধন্যবাদ রমেশবাবু। আপনার স্বাস্থ্যের উন্নতি দেখে আমি খুশি। নিয়মিত ওষুধ খান এবং পরবর্তী চেকআপে আসবেন।",
        date: "১৬ নভেম্বর, ২০২৪",
      },
    },
    {
      id: 2,
      patientName: "সুমিত্রা রায়",
      patientInitial: "স",
      rating: 5,
      title: "ধৈর্যশীল ও দক্ষ ডাক্তার",
      comment:
        "অসাধারণ চিকিৎসক। ধৈর্য সহকারে সব কিছু বুঝিয়ে বলেছেন। রোগের কারণ ও চিকিৎসা পদ্ধতি সম্পর্কে বিস্তারিত জানিয়েছেন। অবশ্যই সুপারিশ করব।",
      date: "১০ নভেম্বর, ২০২৪",
      visitDate: "৮ নভেম্বর, ২০২৪",
      treatmentType: "বুকে ব্যথার চিকিৎসা",
      verified: true,
      helpful: 8,
      notHelpful: 0,
      wouldRecommend: true,
    },
    {
      id: 3,
      patientName: "অনিল কুমার",
      patientInitial: "অ",
      rating: 4,
      title: "ভালো চিকিৎসা, তবে অপেক্ষা বেশি",
      comment:
        "ভালো ডাক্তার, তবে অপেক্ষার সময় একটু বেশি ছিল। চিকিৎসা ভালো হয়েছে। ওষুধ কার্যকর হয়েছে।",
      date: "৫ নভেম্বর, ২০২৪",
      visitDate: "৩ নভেম্বর, ২০২৪",
      treatmentType: "হাই প্রেশার",
      verified: true,
      helpful: 5,
      notHelpful: 2,
      wouldRecommend: true,
    },
    {
      id: 4,
      patientName: "প্রিয়া শর্মা",
      patientInitial: "প",
      rating: 5,
      title: "পরিবারের জন্য বিশ্বস্ত ডাক্তার",
      comment:
        "বাবার হার্টের সমস্যার জন্য দেখিয়েছিলাম। খুব যত্নসহকারে চিকিৎসা করেছেন। পরিবারের সবার জন্য এখন তিনিই আমাদের পছন্দের ডাক্তার।",
      date: "১ নভেম্বর, ২০২৪",
      visitDate: "২৮ অক্টোবর, ২০২৪",
      treatmentType: "হার্ট ব্লকেজ",
      verified: true,
      helpful: 15,
      notHelpful: 0,
      wouldRecommend: true,
    },
    {
      id: 5,
      patientName: "মিনা দেবী",
      patientInitial: "মি",
      rating: 3,
      title: "গড় অভিজ্ঞতা",
      comment:
        "ডাক্তার ভালো কিন্তু চেম্বারের পরিবেশ উন্নত করা যেতে পারে। অপেক্ষার ব্যবস্থা ভালো নয়।",
      date: "২৫ অক্টোবর, ২০২৪",
      visitDate: "২৩ অক্টোবর, ২০২৪",
      treatmentType: "নিয়মিত চেকআপ",
      verified: true,
      helpful: 3,
      notHelpful: 4,
      wouldRecommend: false,
    },
  ];

  // Filter and sort reviews
  const filteredReviews = allReviews
    .filter((review) => {
      if (reviewFilter === "all") return true;
      return review.rating === Number.parseInt(reviewFilter);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        case "helpful":
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: allReviews.filter((review) => review.rating === rating).length,
    percentage:
      (allReviews.filter((review) => review.rating === rating).length /
        allReviews.length) *
      100,
  }));

  const handleSubmitReview = async () => {
    if (newReview.rating === 0 || !newReview.comment.trim()) {
      return;
    }

    setSubmittingReview(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmittingReview(false);
    setShowReviewForm(false);
    setNewReview({
      rating: 0,
      title: "",
      comment: "",
      patientName: "",
      visitDate: "",
      treatmentType: "",
      wouldRecommend: true,
    });
  };

  const handleHelpfulVote = (reviewId, isHelpful) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [reviewId]: isHelpful,
    }));
  };

  const renderStars = (rating, size = "md") => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderInteractiveStars = (currentRating, onRatingChange) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onRatingChange(i + 1)}
            className="transition-colors hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                i < currentRating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300 hover:text-yellow-200"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 font-hind-siliguri">
      {/* Header */}
      <motion.div
        className="bg-white border-b border-sky-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/doctor/${doctor.id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="text-sky-600 hover:text-sky-700"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                ফিরে যান
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={
                    doctor.image ||
                    "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                  }
                  alt={doctor.name}
                />
                <AvatarFallback className="bg-sky-100 text-sky-700">
                  {doctor.name.split(" ")[1]?.[0] || "ড"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-sky-900">
                  {doctor.name}
                </h1>
                <p className="text-sky-600">{doctor.specialty}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Reviews Overview */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-sky-900 flex items-center gap-2">
                <Star className="w-6 h-6" />
                রোগীদের মতামত ও রেটিং
              </CardTitle>
              <CardDescription className="text-sky-600">
                মোট {doctor.reviewCount}টি রিভিউ • গড় রেটিং {doctor.rating}/৫
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Rating Summary */}
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-sky-900 mb-2">
                      {doctor.rating}
                    </div>
                    {renderStars(Math.floor(doctor.rating), "lg")}
                    <p className="text-sky-600 mt-2">
                      {doctor.reviewCount} রিভিউর ভিত্তিতে
                    </p>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-3">
                  {ratingDistribution.map((item) => (
                    <div key={item.rating} className="flex items-center gap-3">
                      <span className="text-sm text-sky-700 w-8">
                        {item.rating} ⭐
                      </span>
                      <div className="flex-1 bg-sky-100 rounded-full h-2">
                        <div
                          className="bg-sky-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-sky-600 w-8">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-sky-100">
                <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
                  <DialogTrigger asChild>
                    <Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-full">
                      <Star className="w-4 h-4 mr-2" />
                      রিভিউ লিখুন
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-sky-900">
                        রিভিউ লিখুন
                      </DialogTitle>
                      <DialogDescription className="text-sky-600">
                        আপনার অভিজ্ঞতা শেয়ার করুন এবং অন্যদের সাহায্য করুন
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      {/* Rating */}
                      <div className="space-y-2">
                        <Label className="text-sky-800 font-medium">
                          রেটিং দিন *
                        </Label>
                        <div className="flex items-center gap-2">
                          {renderInteractiveStars(newReview.rating, (rating) =>
                            setNewReview((prev) => ({ ...prev, rating }))
                          )}
                          <span className="text-sky-600 ml-2">
                            {newReview.rating > 0 && `${newReview.rating}/৫`}
                          </span>
                        </div>
                      </div>

                      {/* Review Title */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="reviewTitle"
                          className="text-sky-800 font-medium"
                        >
                          রিভিউর শিরোনাম
                        </Label>
                        <Input
                          id="reviewTitle"
                          value={newReview.title}
                          onChange={(e) =>
                            setNewReview((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          placeholder="যেমন: অসাধারণ চিকিৎসক"
                          className="border-sky-200 focus:border-sky-400"
                        />
                      </div>

                      {/* Patient Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="patientName"
                            className="text-sky-800 font-medium"
                          >
                            আপনার নাম *
                          </Label>
                          <Input
                            id="patientName"
                            value={newReview.patientName}
                            onChange={(e) =>
                              setNewReview((prev) => ({
                                ...prev,
                                patientName: e.target.value,
                              }))
                            }
                            placeholder="পূর্ণ নাম"
                            className="border-sky-200 focus:border-sky-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="visitDate"
                            className="text-sky-800 font-medium"
                          >
                            ভিজিটের তারিখ
                          </Label>
                          <Input
                            id="visitDate"
                            type="date"
                            value={newReview.visitDate}
                            onChange={(e) =>
                              setNewReview((prev) => ({
                                ...prev,
                                visitDate: e.target.value,
                              }))
                            }
                            className="border-sky-200 focus:border-sky-400"
                          />
                        </div>
                      </div>

                      {/* Treatment Type */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="treatmentType"
                          className="text-sky-800 font-medium"
                        >
                          চিকিৎসার ধরন
                        </Label>
                        <Select
                          value={newReview.treatmentType}
                          onValueChange={(value) =>
                            setNewReview((prev) => ({
                              ...prev,
                              treatmentType: value,
                            }))
                          }
                        >
                          <SelectTrigger className="border-sky-200 focus:border-sky-400">
                            <SelectValue placeholder="চিকিৎসার ধরন নির্বাচন করুন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checkup">
                              নিয়মিত চেকআপ
                            </SelectItem>
                            <SelectItem value="heart">
                              হার্টের সমস্যা
                            </SelectItem>
                            <SelectItem value="pressure">
                              উচ্চ রক্তচাপ
                            </SelectItem>
                            <SelectItem value="chest-pain">
                              বুকে ব্যথা
                            </SelectItem>
                            <SelectItem value="emergency">
                              জরুরি চিকিৎসা
                            </SelectItem>
                            <SelectItem value="other">অন্যান্য</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Review Comment */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="reviewComment"
                          className="text-sky-800 font-medium"
                        >
                          আপনার অভিজ্ঞতা লিখুন *
                        </Label>
                        <Textarea
                          id="reviewComment"
                          value={newReview.comment}
                          onChange={(e) =>
                            setNewReview((prev) => ({
                              ...prev,
                              comment: e.target.value,
                            }))
                          }
                          placeholder="ডাক্তারের সাথে আপনার অভিজ্ঞতা বিস্তারিত লিখুন..."
                          rows={4}
                          className="border-sky-200 focus:border-sky-400"
                        />
                      </div>

                      {/* Recommendation */}
                      <div className="space-y-2">
                        <Label className="text-sky-800 font-medium">
                          আপনি কি এই ডাক্তারকে সুপারিশ করবেন?
                        </Label>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() =>
                              setNewReview((prev) => ({
                                ...prev,
                                wouldRecommend: true,
                              }))
                            }
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                              newReview.wouldRecommend
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-sky-200 text-sky-600 hover:border-sky-300"
                            }`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            হ্যাঁ, সুপারিশ করব
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setNewReview((prev) => ({
                                ...prev,
                                wouldRecommend: false,
                              }))
                            }
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                              !newReview.wouldRecommend
                                ? "border-red-500 bg-red-50 text-red-700"
                                : "border-sky-200 text-sky-600 hover:border-sky-300"
                            }`}
                          >
                            <ThumbsDown className="w-4 h-4" />
                            না, সুপারিশ করব না
                          </button>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSubmitReview}
                          disabled={
                            submittingReview ||
                            newReview.rating === 0 ||
                            !newReview.comment.trim()
                          }
                          className="flex-1 bg-sky-500 hover:bg-sky-600 text-white rounded-full"
                        >
                          {submittingReview ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              জমা দিচ্ছি...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              রিভিউ জমা দিন
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowReviewForm(false)}
                          className="border-sky-200 text-sky-700 hover:bg-sky-50"
                        >
                          বাতিল
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  className="border-sky-200 text-sky-700 hover:bg-sky-50 rounded-full bg-transparent"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  প্রশ্ন করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Sorting */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-sky-600" />
                    <Label className="text-sky-800 font-medium">ফিল্টার:</Label>
                  </div>
                  <Select value={reviewFilter} onValueChange={setReviewFilter}>
                    <SelectTrigger className="w-40 border-sky-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব রিভিউ</SelectItem>
                      <SelectItem value="5">৫ তারকা</SelectItem>
                      <SelectItem value="4">৪ তারকা</SelectItem>
                      <SelectItem value="3">৩ তারকা</SelectItem>
                      <SelectItem value="2">২ তারকা</SelectItem>
                      <SelectItem value="1">১ তারকা</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-4">
                  <Label className="text-sky-800 font-medium">সাজান:</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 border-sky-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">নতুন আগে</SelectItem>
                      <SelectItem value="oldest">পুরাতন আগে</SelectItem>
                      <SelectItem value="highest">উচ্চ রেটিং</SelectItem>
                      <SelectItem value="lowest">নিম্ন রেটিং</SelectItem>
                      <SelectItem value="helpful">সহায়ক</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reviews List */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-6"
        >
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Review Header */}
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-sky-100 text-sky-700 font-semibold">
                          {review.patientInitial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-sky-900">
                                {review.patientName}
                              </h4>
                              {review.verified && (
                                <Badge className="bg-green-100 text-green-700 text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  যাচাইকৃত
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(review.rating, "sm")}
                              <span className="text-sm text-sky-600">
                                • {review.date}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {review.wouldRecommend ? (
                              <Badge className="bg-green-100 text-green-700">
                                <Heart className="w-3 h-3 mr-1" />
                                সুপারিশ করেছেন
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="bg-gray-100 text-gray-700"
                              >
                                সুপারিশ করেননি
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="space-y-3">
                      {review.title && (
                        <h5 className="font-semibold text-sky-800 text-lg">
                          {review.title}
                        </h5>
                      )}
                      <p className="text-sky-700 leading-relaxed italic">
                        "{review.comment}"
                      </p>

                      {/* Visit Details */}
                      <div className="flex flex-wrap gap-4 text-sm text-sky-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>ভিজিট: {review.visitDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>চিকিৎসা: {review.treatmentType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Doctor Response */}
                    {review.response && (
                      <div className="bg-sky-50 rounded-lg p-4 border-l-4 border-sky-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={
                                doctor.image ||
                                "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                              }
                              alt={doctor.name}
                            />
                            <AvatarFallback className="bg-sky-200 text-sky-700 text-sm">
                              ড
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-sky-900 text-sm">
                              {review.response.doctorName}
                            </p>
                            <p className="text-xs text-sky-600">
                              {review.response.date}
                            </p>
                          </div>
                        </div>
                        <p className="text-sky-700 text-sm italic">
                          "{review.response.message}"
                        </p>
                      </div>
                    )}

                    {/* Review Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-sky-100">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleHelpfulVote(review.id, true)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                            helpfulVotes[review.id] === true
                              ? "bg-green-100 text-green-700"
                              : "text-sky-600 hover:bg-sky-100"
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          সহায়ক ({review.helpful})
                        </button>
                        <button
                          onClick={() => handleHelpfulVote(review.id, false)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                            helpfulVotes[review.id] === false
                              ? "bg-red-100 text-red-700"
                              : "text-sky-600 hover:bg-sky-100"
                          }`}
                        >
                          <ThumbsDown className="w-4 h-4" />
                          সহায়ক নয় ({review.notHelpful})
                        </button>
                      </div>
                      <button className="flex items-center gap-1 px-3 py-1 rounded-full text-sm text-sky-600 hover:bg-sky-100 transition-colors">
                        <Flag className="w-4 h-4" />
                        রিপোর্ট করুন
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center"
        >
          <Button
            variant="outline"
            className="border-sky-200 text-sky-700 hover:bg-sky-50 rounded-full px-8 bg-transparent"
          >
            আরও রিভিউ দেখুন
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
