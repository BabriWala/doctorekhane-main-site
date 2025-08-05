import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-r from-sky-100 to-blue-100 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center space-y-6">
          <Skeleton className="w-16 h-16 rounded-full mx-auto" />
          <Skeleton className="h-12 w-96 mx-auto" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 space-y-16">
        {/* Vision & Mission Skeleton */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-80 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <Card key={i} className="bg-white/80">
                <CardHeader className="text-center space-y-4">
                  <Skeleton className="w-12 h-12 rounded-full mx-auto" />
                  <Skeleton className="h-8 w-40 mx-auto" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section Skeleton */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-60 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white/80">
                <CardHeader className="text-center space-y-4">
                  <Skeleton className="w-24 h-24 rounded-full mx-auto" />
                  <Skeleton className="h-6 w-40 mx-auto" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section Skeleton */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-48 mx-auto" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <Card className="bg-white/80">
            <CardContent className="p-6 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Contact Form Skeleton */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-60 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <Card className="bg-white/80">
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>

        {/* Support Section Skeleton */}
        <div className="space-y-8">
          <Skeleton className="h-10 w-80 mx-auto" />
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <Card key={i} className="bg-white/80">
                <CardHeader className="text-center space-y-4">
                  <Skeleton className="w-12 h-12 rounded-full mx-auto" />
                  <Skeleton className="h-6 w-40 mx-auto" />
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <Skeleton className="h-8 w-32 mx-auto" />
                  <Skeleton className="h-4 w-48 mx-auto" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map Section Skeleton */}
        <div className="space-y-8">
          <Skeleton className="h-10 w-60 mx-auto" />
          <Card className="bg-white/80">
            <CardContent className="p-0">
              <Skeleton className="h-64 md:h-96 w-full" />
              <div className="p-6 text-center space-y-2">
                <Skeleton className="h-6 w-40 mx-auto" />
                <Skeleton className="h-4 w-80 mx-auto" />
                <Skeleton className="h-4 w-60 mx-auto" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
