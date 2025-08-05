"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  MessageCircle,
  Tag,
  TrendingUp,
  BookOpen,
  Heart,
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const categories = [
  { id: "all", name: "সব", count: 24 },
  { id: "disease", name: "রোগ", count: 8 },
  { id: "health-tips", name: "স্বাস্থ্য টিপস", count: 6 },
  { id: "nutrition", name: "ডায়েট ও পুষ্টি", count: 5 },
  { id: "mental-health", name: "মানসিক স্বাস্থ্য", count: 5 },
];

const blogPosts = [
  {
    id: 1,
    title: "উচ্চ রক্তচাপ নিয়ন্ত্রণের ৫টি সহজ উপায়",
    summary:
      "উচ্চ রক্তচাপ একটি নীরব ঘাতক। জানুন কীভাবে প্রাকৃতিক উপায়ে এবং জীবনযাত্রার পরিবর্তনের মাধ্যমে রক্তচাপ নিয়ন্ত্রণে রাখা যায়।",
    author: "ডা. রাজেশ কুমার",
    authorImage:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=40&width=40",
    isDoctor: true,
    publishDate: "২৫ ডিসেম্বর, ২০২ৄ",
    readTime: "৫ মিনিট",
    views: 1250,
    comments: 23,
    category: "disease",
    tags: ["রক্তচাপ", "হৃদরোগ", "প্রতিরোধ"],
    thumbnail:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 2,
    title: "শিশুদের পুষ্টিকর খাবারের তালিকা",
    summary:
      "বাড়ন্ত শিশুদের সুস্থ বিকাশের জন্য প্রয়োজনীয় পুষ্টি উপাদান এবং সহজ রেসিপি। মায়েদের জন্য বিশেষ গাইড।",
    author: "ডা. প্রিয়া সরকার",
    authorImage:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=40&width=40",
    isDoctor: true,
    publishDate: "২৩ ডিসেম্বর, ২০২৪",
    readTime: "৭ মিনিট",
    views: 980,
    comments: 18,
    category: "nutrition",
    tags: ["শিশু", "পুষ্টি", "খাবার"],
    thumbnail:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 3,
    title: "ডায়াবেটিস রোগীদের জন্য ব্যায়ামের গুরুত্ব",
    summary:
      "ডায়াবেটিস নিয়ন্ত্রণে ব্যায়ামের ভূমিকা অপরিসীম। জানুন কোন ব্যায়াম কতটুকু করবেন এবং কখন করবেন।",
    author: "ডা. অমিত দাস",
    authorImage:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=40&width=40",
    isDoctor: true,
    publishDate: "২০ ডিসেম্বর, ২০২৪",
    readTime: "৬ মিনিট",
    views: 1450,
    comments: 31,
    category: "health-tips",
    tags: ["ডায়াবেটিস", "ব্যায়াম", "জীবনযাত্রা"],
    thumbnail:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 4,
    title: "মানসিক চাপ কমানোর কার্যকর পদ্ধতি",
    summary:
      "আধুনিক জীবনে মানসিক চাপ একটি সাধারণ সমস্যা। শিখুন প্রাকৃতিক উপায়ে মানসিক চাপ কমানোর কৌশল।",
    author: "ডা. সুমিত্রা ব্যানার্জী",
    authorImage:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=40&width=40",
    isDoctor: true,
    publishDate: "১৮ ডিসেম্বর, ২০২৪",
    readTime: "৮ মিনিট",
    views: 2100,
    comments: 45,
    category: "mental-health",
    tags: ["মানসিক_স্বাস্থ্য", "চাপ", "মেডিটেশন"],
    thumbnail:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 5,
    title: "গর্ভাবস্থায় যত্নের A টু Z",
    summary:
      "গর্ভকালীন সময়ে মা ও শিশুর সুস্থতার জন্য প্রয়োজনীয় যত্ন, খাবার এবং সতর্কতা সম্পর্কে বিস্তারিত।",
    author: "ডা. রীতা চক্রবর্তী",
    authorImage:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=40&width=40",
    isDoctor: true,
    publishDate: "১৫ ডিসেম্বর, ২০২৪",
    readTime: "১০ মিনিট",
    views: 1800,
    comments: 52,
    category: "health-tips",
    tags: ["গর্ভাবস্থা", "মাতৃত্ব", "যত্ন"],
    thumbnail:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 6,
    title: "হার্ট অ্যাটাকের লক্ষণ ও প্রাথমিক চিকিৎসা",
    summary:
      "হার্ট অ্যাটাকের প্রাথমিক লক্ষণগুলো চিনুন এবং জরুরি অবস্থায় কী করবেন তা জেনে নিন। এটি জীবন বাঁচাতে পারে।",
    author: "ডা. বিকাশ রায়",
    authorImage:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=40&width=40",
    isDoctor: true,
    publishDate: "১২ ডিসেম্বর, ২০২৪",
    readTime: "৫ মিনিট",
    views: 3200,
    comments: 67,
    category: "disease",
    tags: ["হৃদরোগ", "জরুরি", "প্রাথমিক_চিকিৎসা"],
    thumbnail:
      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=200&width=300",
    featured: false,
  },
];

const popularPosts = [
  { id: 1, title: "হার্ট অ্যাটাকের লক্ষণ ও প্রাথমিক চিকিৎসা", views: 3200 },
  { id: 4, title: "মানসিক চাপ কমানোর কার্যকর পদ্ধতি", views: 2100 },
  { id: 5, title: "গর্ভাবস্থায় যত্নের A টু Z", views: 1800 },
  { id: 3, title: "ডায়াবেটিস রোগীদের জন্য ব্যায়ামের গুরুত্ব", views: 1450 },
];

export default function HealthBlog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [emailSubscription, setEmailSubscription] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Email subscription:", emailSubscription);
    alert("সফলভাবে সাবস্ক্রাইব হয়েছে! আমরা নিয়মিত স্বাস্থ্য টিপস পাঠাব।");
    setEmailSubscription("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-sky-800">
                স্বাস্থ্য সম্পর্কিত ব্লগ
              </h1>
              <p className="text-sky-600 mt-2">
                রোগ, পুষ্টি, মানসিক স্বাস্থ্য ও আরও অনেক কিছু জানুন
              </p>
            </div>
            <nav className="text-sm text-sky-600">
              <span>হোম</span> <span className="mx-2">&gt;</span>{" "}
              <span className="text-sky-800">ব্লগ</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 h-5 w-5" />
              <Input
                placeholder="বিষয় বা লেখকের নাম লিখুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="md:w-auto bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              ফিল্টার
            </Button>
          </div>

          {/* Category Tabs */}
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-sm"
                >
                  {category.name} ({category.count})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {selectedCategory === "all" && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-sky-800 mb-6 flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  ফিচার্ড আর্টিকেল
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.slice(0, 2).map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
                        <div className="aspect-video bg-sky-100">
                          <img
                            src={
                              post.thumbnail ||
                              "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                            }
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge
                              variant="secondary"
                              className="bg-sky-100 text-sky-800"
                            >
                              {
                                categories.find((c) => c.id === post.category)
                                  ?.name
                              }
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-yellow-50 text-yellow-700 border-yellow-200"
                            >
                              ফিচার্ড
                            </Badge>
                          </div>
                          <h3 className="text-xl font-semibold text-sky-800 mb-3 line-clamp-2">
                            <Link
                              href={`/blog/${post.id}`}
                              className="hover:text-sky-600"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-sky-600 text-sm mb-4 line-clamp-3">
                            {post.summary}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={
                                    post.authorImage ||
                                    "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                                  }
                                />
                                <AvatarFallback>ডা</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-sky-800 flex items-center gap-1">
                                  {post.author}
                                  {post.isDoctor && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-green-50 text-green-700 border-green-200"
                                    >
                                      ডাক্তার
                                    </Badge>
                                  )}
                                </p>
                                <p className="text-xs text-sky-500">
                                  {post.publishDate}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              আরও পড়ুন
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-sky-800">
                  {selectedCategory === "all"
                    ? "সব আর্টিকেল"
                    : categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-sky-600">
                  {filteredPosts.length} টি আর্টিকেল পাওয়া গেছে
                </p>
              </div>

              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-64 flex-shrink-0">
                            <div className="aspect-video bg-sky-100 rounded-lg overflow-hidden">
                              <img
                                src={
                                  post.thumbnail ||
                                  "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                                }
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge
                                variant="secondary"
                                className="bg-sky-100 text-sky-800"
                              >
                                {
                                  categories.find((c) => c.id === post.category)
                                    ?.name
                                }
                              </Badge>
                              {post.featured && (
                                <Badge
                                  variant="outline"
                                  className="bg-yellow-50 text-yellow-700 border-yellow-200"
                                >
                                  ফিচার্ড
                                </Badge>
                              )}
                            </div>

                            <h3 className="text-xl font-semibold text-sky-800 mb-3">
                              <Link
                                href={`/blog/${post.id}`}
                                className="hover:text-sky-600"
                              >
                                {post.title}
                              </Link>
                            </h3>

                            <p className="text-sky-600 mb-4 line-clamp-2">
                              {post.summary}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={
                                      post.authorImage ||
                                      "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg"
                                    }
                                  />
                                  <AvatarFallback>ডা</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium text-sky-800 flex items-center gap-1">
                                    {post.author}
                                    {post.isDoctor && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs bg-green-50 text-green-700 border-green-200"
                                      >
                                        ডাক্তার
                                      </Badge>
                                    )}
                                  </p>
                                  <div className="flex items-center gap-4 text-xs text-sky-500">
                                    <span>{post.publishDate}</span>
                                    <span>{post.readTime} পড়তে</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-sky-600">
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  {post.views}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="h-4 w-4" />
                                  {post.comments}
                                </div>
                                <Button variant="outline" size="sm">
                                  আরও পড়ুন
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-sky-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-sky-700 mb-2">
                    কোনো আর্টিকেল পাওয়া যায়নি
                  </h3>
                  <p className="text-sky-600">
                    অন্য ক্যাটেগরি বা সার্চ টার্ম ব্যবহার করে আবার চেষ্টা করুন
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Popular Articles */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-sky-800 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  জনপ্রিয় আর্টিকেল
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {popularPosts.map((post, index) => (
                  <div key={post.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sky-600 text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-sky-800 line-clamp-2 mb-1">
                        <Link
                          href={`/blog/${post.id}`}
                          className="hover:text-sky-600"
                        >
                          {post.title}
                        </Link>
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-sky-500">
                        <Eye className="h-3 w-3" />
                        {post.views} ভিউ
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-sky-800">ক্যাটেগরি</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.slice(1).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-sky-100 text-sky-800"
                        : "hover:bg-sky-50 text-sky-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Subscription */}
            <Card className="bg-gradient-to-br from-sky-50 to-blue-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-sky-800 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  নিউজলেটার সাবস্ক্রিপশন
                </CardTitle>
                <CardDescription>
                  নিয়মিত স্বাস্থ্য টিপস ও আপডেট পেতে সাবস্ক্রাইব করুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="আপনার ইমেইল ঠিকানা"
                    value={emailSubscription}
                    onChange={(e) => setEmailSubscription(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700"
                  >
                    সাবস্ক্রাইব করুন
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Health Tips */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-sky-800">
                  দ্রুত স্বাস্থ্য টিপস
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-sky-50 rounded-lg">
                  <p className="text-sm text-sky-700">
                    💧 দিনে কমপক্ষে ৮ গ্লাস পানি পান করুন
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    🥗 প্রতিদিন ৫ ধরনের ফল ও সবজি খান
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700">
                    🧘 দৈনিক ১০ মিনিট মেডিটেশন করুন
                  </p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-700">
                    🚶 দিনে কমপক্ষে ৩০ মিনিট হাঁটুন
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
