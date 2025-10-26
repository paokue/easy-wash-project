import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ReportsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="w-5 h-5" />
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <div>
                  <Skeleton className="w-40 h-6 mb-1" />
                  <Skeleton className="w-48 h-3" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="w-32 h-10" />
              <Skeleton className="w-24 h-10" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-20 h-8" />
                    <Skeleton className="w-32 h-3" />
                  </div>
                  <Skeleton className="w-12 h-12 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {Array.from({ length: 2 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="w-32 h-6 mb-2" />
                <Skeleton className="w-48 h-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full h-[300px]" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bar Chart Skeleton */}
        <Card className="mb-8">
          <CardHeader>
            <Skeleton className="w-40 h-6 mb-2" />
            <Skeleton className="w-56 h-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-[300px]" />
          </CardContent>
        </Card>

        {/* Bottom Cards Skeleton */}
        <div className="grid lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="w-32 h-6 mb-2" />
                <Skeleton className="w-48 h-4" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="space-y-2">
                        <Skeleton className="w-24 h-5" />
                        <Skeleton className="w-16 h-4" />
                      </div>
                      <div className="text-right space-y-2">
                        <Skeleton className="w-16 h-5" />
                        <Skeleton className="w-12 h-6" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
