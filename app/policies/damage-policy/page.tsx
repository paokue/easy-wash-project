import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function DamagePolicyPage() {
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
              <AlertTriangle className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Damage Policy</h1>
          </div>
          <p className="text-muted-foreground">How we handle the rare case of item damage</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Damage Compensation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              While rare, if an item is damaged during our care, we'll compensate you up to 10x the cleaning cost or the
              item's fair market value, whichever is greater.
            </p>
            <p>
              Items with existing damage should be noted during pickup to avoid confusion. Our drivers will document any
              pre-existing conditions.
            </p>
            <h3 className="font-semibold text-lg mt-6">Compensation Limits</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Standard items: Up to $500 per item</li>
              <li>Designer/luxury items: Up to $1,000 per item (with proof of value)</li>
              <li>Vintage or irreplaceable items: Case-by-case evaluation</li>
            </ul>
            <h3 className="font-semibold text-lg mt-6">Reporting Process</h3>
            <p>
              Report any damage within 24 hours of delivery. Include photos and original purchase receipts when
              possible. We'll investigate and respond within 48 hours.
            </p>
            <h3 className="font-semibold text-lg mt-6">Prevention Measures</h3>
            <p>
              We use gentle, professional-grade equipment and follow manufacturer care instructions. Items are sorted by
              fabric type and color to prevent damage.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
