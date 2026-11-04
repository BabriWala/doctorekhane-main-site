"use client";
import { SITE_PHONE, SITE_EMAIL, SITE_ADDRESS, EMERGENCY_PHONE } from "@/lib/contact";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  Target,
  Award,
  Send,
  CheckCircle,
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const teamMembers = [
    {
      name: "ডাঃ রাহুল চক্রবর্তী",
      position: "প্রতিষ্ঠাতা ও চিকিৎসা পরিচালক",
      bio: "২০ বছরের অভিজ্ঞতা সহ কার্ডিওলজিস্ট। স্বাস্থ্যসেবায় প্রযুক্তির ব্যবহারে অগ্রণী।",
      avatar:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=100&width=100&text=ডাঃ+রাহুল",
      initials: "রচ",
    },
    {
      name: "সুমন ঘোষ",
      position: "প্রযুক্তি প্রধান",
      bio: "সফটওয়্যার ইঞ্জিনিয়ার। স্বাস্থ্যসেবা প্রযুক্তিতে বিশেষজ্ঞ।",
      avatar:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=100&width=100&text=সুমন",
      initials: "সঘ",
    },
    {
      name: "প্রিয়া দাস",
      position: "রোগী সেবা প্রধান",
      bio: "নার্সিং ব্যাকগ্রাউন্ড। রোগী যত্ন ও সেবায় দক্ষ।",
      avatar:
        "https://preview-bengali-healthcare-website-kzmgclyv9m6gyaguxqo4.vusercontent.net/placeholder.svg?height=100&width=100&text=প্রিয়া",
      initials: "প্রদ",
    },
  ];

  const faqs = [
    {
      question: "অ্যাপয়েন্টমেন্ট কীভাবে নেব?",
      answer:
        'আমাদের ওয়েবসাইটে গিয়ে "ডাক্তার খুঁজুন" সেকশনে যান। আপনার পছন্দের ডাক্তার নির্বাচন করুন এবং উপলব্ধ সময় দেখে অ্যাপয়েন্টমেন্ট বুক করুন। আপনি ফোনেও যোগাযোগ করতে পারেন।',
    },
    {
      question: "রক্তদাতা নিবন্ধন পদ্ধতি কী?",
      answer:
        '"রক্তদাতা" পেজে গিয়ে "নিবন্ধন করুন" বাটনে ক্লিক করুন। আপনার ব্যক্তিগত তথ্য, রক্তের গ্রুপ এবং যোগাযোগের তথ্য দিন। আমরা আপনার তথ্য যাচাই করে নিবন্ধন সম্পূর্ণ করব।',
    },
    {
      question: "আমি কীভাবে আমার ডাক্তার পরিবর্তন করব?",
      answer:
        'আপনার ড্যাশবোর্ডে লগইন করুন। "আমার অ্যাপয়েন্টমেন্ট" সেকশনে গিয়ে বিদ্যমান অ্যাপয়েন্টমেন্ট বাতিল করুন এবং নতুন ডাক্তারের সাথে অ্যাপয়েন্টমেন্ট নিন।',
    },
    {
      question: "জরুরি অবস্থায় কী করব?",
      answer:
        "জরুরি অ্যাম্বুলেন্স সহায়তার জন্য জাতীয় জরুরি সেবা ৯৯৯ নম্বরে কল করুন। এই সরকারি সেবা ২৪ ঘণ্টা চালু থাকে।",
    },
    {
      question: "অনলাইন পেমেন্ট নিরাপদ কি?",
      answer:
        "হ্যাঁ, আমাদের পেমেন্ট সিস্টেম সম্পূর্ণ নিরাপদ। আমরা SSL এনক্রিপশন ব্যবহার করি এবং আপনার কার্ডের তথ্য সংরক্ষণ করি না। সকল লেনদেন ব্যাংক-গ্রেড নিরাপত্তার মাধ্যমে সম্পন্ন হয়।",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      {/* Hero Header Section */}
      <motion.section
        className="relative bg-gradient-to-r from-sky-100 to-blue-100 py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="relative max-w-5xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Heart className="w-16 h-16 text-sky-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-sky-900 mb-4">
              আমাদের সম্পর্কে
            </h1>
            <p className="text-xl md:text-2xl text-sky-700 max-w-3xl mx-auto">
              আমরা কেন এই প্ল্যাটফর্ম তৈরি করেছি
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 space-y-16">
        {/* Vision & Mission Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
              আমাদের লক্ষ্য ও উদ্দেশ্য
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-white/80 backdrop-blur-sm border-sky-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <Target className="w-12 h-12 text-sky-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-sky-900">
                    আমাদের লক্ষ্য
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg text-sky-800 leading-relaxed">
                    উত্তরবঙ্গের প্রতিটি মানুষের কাছে সহজে স্বাস্থ্যসেবা পৌঁছে
                    দেওয়া। আমরা চাই প্রযুক্তির মাধ্যমে স্বাস্থ্যসেবাকে আরও
                    সহজলভ্য এবং কার্যকর করতে।
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-white/80 backdrop-blur-sm border-sky-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <Award className="w-12 h-12 text-sky-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-sky-900">
                    আমাদের উদ্দেশ্য
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg text-sky-800 leading-relaxed">
                    স্থানীয় স্বাস্থ্যসেবায় মানুষের আস্থা, সচেতনতা এবং
                    প্রবেশাধিকার বৃদ্ধি করা। ডাক্তার ও রোগীর মধ্যে একটি
                    নির্ভরযোগ্য সেতু তৈরি করা।
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
              প্রশ্নোত্তর
            </h2>
            <p className="text-lg text-sky-700">
              সচরাচর জিজ্ঞাসিত প্রশ্নের উত্তর
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="bg-white/80 backdrop-blur-sm border-sky-200 shadow-lg">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-sky-200"
                    >
                      <AccordionTrigger className="text-left text-sky-900 hover:text-sky-700 font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sky-800 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Contact Form Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
              যোগাযোগ করুন
            </h2>
            <p className="text-lg text-sky-700">
              আপনার যেকোনো প্রশ্ন বা মতামত আমাদের জানান
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="bg-white/80 backdrop-blur-sm border-sky-200 shadow-lg">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-700 mb-2">
                      সফলভাবে পাঠানো হয়েছে!
                    </h3>
                    <p className="text-green-600">
                      আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে
                      যোগাযোগ করব।
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-sky-900"
                        >
                          নাম *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="border-sky-300 focus:border-sky-500"
                          placeholder="আপনার পূর্ণ নাম লিখুন"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-sky-900"
                        >
                          ইমেইল *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="border-sky-300 focus:border-sky-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium text-sky-900"
                      >
                        মোবাইল নম্বর
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border-sky-300 focus:border-sky-500"
                        placeholder="০১৭xxxxxxxx"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-sky-900"
                      >
                        বার্তা *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="border-sky-300 focus:border-sky-500"
                        placeholder="আপনার বার্তা বা প্রশ্ন লিখুন..."
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          পাঠানো হচ্ছে...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          বার্তা পাঠান
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Support Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
              সহায়তা ও জরুরি যোগাযোগ
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp}>
              <Card className="bg-white/80 backdrop-blur-sm border-sky-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <Phone className="w-12 h-12 text-sky-600 mx-auto mb-4" />
                  <CardTitle className="text-xl text-sky-900">
                    সাধারণ সহায়তা
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-2xl font-bold text-sky-800">
                    {SITE_PHONE}
                  </div>
                  <p className="text-sky-700">সকাল ৯টা থেকে রাত ৯টা পর্যন্ত</p>
                  <Button asChild className="w-full bg-sky-600 hover:bg-sky-700"><a href={`tel:${SITE_PHONE}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    এখনই কল করুন
                  </a></Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-white/80 backdrop-blur-sm border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <Phone className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <CardTitle className="text-xl text-red-900">
                    জরুরি অ্যাম্বুলেন্স
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-2xl font-bold text-red-800">
                    {EMERGENCY_PHONE}
                  </div>
                  <Badge variant="destructive" className="text-sm">
                    ২৪/৭ উপলব্ধ
                  </Badge>
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700"><a href={`tel:${EMERGENCY_PHONE}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    জরুরি কল
                  </a></Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="text-center">
            <Card className="bg-white/80 backdrop-blur-sm border-sky-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-4">
                  <Mail className="w-6 h-6 text-sky-600" />
                  <div>
                    <p className="text-sky-900 font-medium">ইমেইল সহায়তা</p>
                    <p className="text-sky-700">{SITE_EMAIL}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Google Map Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
              আমাদের অবস্থান
            </h2>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="bg-white/80 backdrop-blur-sm border-sky-200 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64 md:h-96 bg-sky-100">
                  <iframe
                    src="https://www.google.com/maps?q=Khulna+Sadar,+Khulna,+Bangladesh&output=embed" title="খুলনা সদর, খুলনা"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-sky-600" />
                    <h3 className="text-lg font-semibold text-sky-900">
                      আমাদের ঠিকানা
                    </h3>
                  </div>
                  <p className="text-sky-800">
                    {SITE_ADDRESS}
                  </p>
                  <p className="text-sky-700 text-sm mt-2">
                    বাংলাদেশ
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-sky-900 text-white py-12 mt-16"
      >
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">আপনার স্বাস্থ্য</h3>
              <p className="text-sky-200">
                উত্তরবঙ্গের সবচেয়ে বিশ্বস্ত স্বাস্থ্যসেবা প্ল্যাটফর্ম
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">দ্রুত লিংক</h4>
              <div className="space-y-2 text-sky-200">
                <p>
                  <a href="/" className="hover:text-white transition-colors">
                    হোম
                  </a>
                </p>
                <p>
                  <a
                    href="/doctors"
                    className="hover:text-white transition-colors"
                  >
                    ডাক্তার
                  </a>
                </p>
                <p>
                  <a
                    href="/hospitals"
                    className="hover:text-white transition-colors"
                  >
                    হাসপাতাল
                  </a>
                </p>
                <p>
                  <a
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    ব্লগ
                  </a>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">সেবাসমূহ</h4>
              <div className="space-y-2 text-sky-200">
                <p>অ্যাপয়েন্টমেন্ট</p>
                <p>রক্তদাতা</p>
                <p>অ্যাম্বুলেন্স</p>
                <p>স্বাস্থ্য পরামর্শ</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">যোগাযোগ</h4>
              <div className="space-y-2 text-sky-200">
                <p>📞 {SITE_PHONE}</p>
                <p>📧 {SITE_EMAIL}</p>
                <p>📍 {SITE_ADDRESS}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-sky-800 mt-8 pt-8 text-center text-sky-200">
            <p>© ২০২৫ আপনার স্বাস্থ্য. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
