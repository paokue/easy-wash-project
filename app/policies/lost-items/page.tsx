import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"

export default function LostItemsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Lost Items Policy</h1>
          </div>
          <p className="text-muted-foreground">Our tracking system and compensation for lost items</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Item Tracking & Recovery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Each order is tracked with a unique barcode system from pickup to delivery. In the unlikely event an item
              is lost, we'll compensate you for its fair market value.
            </p>
            <p>
              High-value items should be declared during pickup for proper insurance coverage and enhanced tracking.
            </p>
            <h3 className="font-semibold text-lg mt-6">Tracking System</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Unique barcode for each item</li>
              <li>Digital photos at pickup and delivery</li>
              <li>Real-time location tracking</li>
              <li>Chain of custody documentation</li>
            </ul>
            <h3 className="font-semibold text-lg mt-6">Compensation</h3>
            <p>Lost items are compensated at fair market value, determined by:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Original purchase price (with receipt)</li>
              <li>Current market value for similar items</li>
              <li>Age and condition of the item</li>
              <li>Brand and quality factors</li>
            </ul>
            <h3 className="font-semibold text-lg mt-6">Recovery Efforts</h3>
            <p>
              We conduct thorough searches at all facilities and work with delivery partners to locate missing items
              before processing compensation claims.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
