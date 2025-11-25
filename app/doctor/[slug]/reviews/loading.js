"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 font-hind-siliguri">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-sky-100">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-20 h-8 rounded-full" />
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="w-40 h-5" />
                <Skeleton className="w-32 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Reviews Overview Skeleton */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="space-y-2">
              <Skeleton className="w-64 h-7" />
              <Skeleton className="w-48 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="text-center space-y-3">
                  <Skeleton className="w-20 h-16 mx-auto" />
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="w-6 h-6" />
                    ))}
                  </div>
                  <Skeleton className="w-32 h-4 mx-auto" />
                </div>
              </div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-8 h-4" />
                    <Skeleton className="flex-1 h-2 rounded-full" />
                    <Skeleton className="w-8 h-4" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-6 pt-6 border-t border-sky-100">
              <Skeleton className="w-32 h-10 rounded-full" />
              <Skeleton className="w-28 h-10 rounded-full" />
            </div>
          </CardContent>
        </Card>

        {/* Filters Skeleton */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-40 h-10" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-40 h-10" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List Skeleton */}
        <div className="space-y-6">
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Review Header */}
                    <div className="flex items-start gap-4">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Skeleton className="w-32 h-5" />
                              <Skeleton className="w-16 h-4 rounded-full" />
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Skeleton key={i} className="w-4 h-4" />
                                ))}
                              </div>
                              <Skeleton className="w-24 h-4" />
                            </div>
                          </div>
                          <Skeleton className="w-24 h-6 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="space-y-3">
                      <Skeleton className="w-48 h-6" />
                      <div className="space-y-2">
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="w-3/4 h-4" />
                      </div>
                      <div className="flex gap-4">
                        <Skeleton className="w-32 h-4" />
                        <Skeleton className="w-28 h-4" />
                      </div>
                    </div>

                    {/* Review Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-sky-100">
                      <div className="flex items-center gap-4">
                        <Skeleton className="w-20 h-8 rounded-full" />
                        <Skeleton className="w-24 h-8 rounded-full" />
                      </div>
                      <Skeleton className="w-20 h-8 rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More Skeleton */}
        <div className="text-center">
          <Skeleton className="w-40 h-10 rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
}
