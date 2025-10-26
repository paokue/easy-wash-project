import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CustomersLoading() {
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
                  <Skeleton className="w-24 h-6 mb-1" />
                  <Skeleton className="w-32 h-3" />
                </div>
              </div>
            </div>
            <Skeleton className="w-32 h-10" />
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
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-16 h-8" />
                    <Skeleton className="w-24 h-3" />
                  </div>
                  <Skeleton className="w-12 h-12 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search Skeleton */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Skeleton className="flex-1 h-10" />
              <Skeleton className="w-20 h-10" />
            </div>
          </CardContent>
        </Card>

        {/* Customers List Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="w-40 h-6 mb-2" />
            <Skeleton className="w-60 h-4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="w-32 h-5" />
                      <Skeleton className="w-48 h-4" />
                      <Skeleton className="w-56 h-3" />
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex gap-4">
                      <Skeleton className="w-12 h-8" />
                      <Skeleton className="w-16 h-8" />
                      <Skeleton className="w-12 h-8" />
                    </div>
                    <Skeleton className="w-24 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
