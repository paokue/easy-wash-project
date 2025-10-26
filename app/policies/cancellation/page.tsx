import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, X } from "lucide-react"
import Link from "next/link"

export default function CancellationPage() {
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
              <X className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Cancellation Policy</h1>
          </div>
          <p className="text-muted-foreground">Flexible cancellation options for orders and subscriptions</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Cancellations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Orders can be cancelled up to 1 hour before scheduled pickup time without charge. This gives you
                flexibility while allowing us to optimize our routes.
              </p>
              <h3 className="font-semibold text-lg mt-6">Cancellation Timeline</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>More than 1 hour before pickup: Free cancellation</li>
                <li>Less than 1 hour before pickup: $5 cancellation fee</li>
                <li>After pickup has occurred: Full service charge applies</li>
              </ul>
              <h3 className="font-semibold text-lg mt-6">How to Cancel</h3>
              <p>
                Cancel through the mobile app, website, or by calling our customer service line. You'll receive
                immediate confirmation of your cancellation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Cancellations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Monthly subscriptions can be cancelled anytime with 30 days notice. No cancellation fees apply, and
                you'll continue to receive service through your current billing period.
              </p>
              <h3 className="font-semibold text-lg mt-6">Subscription Terms</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>30-day notice required for cancellation</li>
                <li>Service continues through current billing period</li>
                <li>No early termination fees</li>
                <li>Easy reactivation available</li>
              </ul>
              <h3 className="font-semibold text-lg mt-6">Refunds</h3>
              <p>Unused subscription credits are refunded on a pro-rated basis. Processing takes 5-7 business days.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
