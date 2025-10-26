import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default function QualityGuaranteePage() {
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
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Quality Guarantee</h1>
          </div>
          <p className="text-muted-foreground">Our commitment to exceptional service quality</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>100% Satisfaction Guarantee</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We guarantee the quality of our service. If you're not satisfied with your order, we'll re-clean it for
              free or provide a full refund.
            </p>
            <p>
              All items are inspected before and after cleaning to ensure the highest quality standards. Our experienced
              team uses premium detergents and professional equipment to deliver exceptional results.
            </p>
            <h3 className="font-semibold text-lg mt-6">What's Covered</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Unsatisfactory cleaning results</li>
              <li>Stains not properly removed (when possible)</li>
              <li>Improper pressing or folding</li>
              <li>Odors not eliminated</li>
            </ul>
            <h3 className="font-semibold text-lg mt-6">How to Request</h3>
            <p>
              Contact us within 24 hours of delivery if you're not satisfied. We'll arrange for re-cleaning or provide a
              full refund based on your preference.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
