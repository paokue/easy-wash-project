"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { MapPin, Truck, CreditCard, Bell, User, Star, CheckCircle, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CustomerApp() {
  const [activeOrder, setActiveOrder] = useState(null)
  const [selectedService, setSelectedService] = useState("wash-fold")

  const orders = [
    {
      id: "EW-001",
      status: "in-progress",
      items: 8,
      total: 24.5,
      pickup: "Today, 2:00 PM",
      delivery: "Tomorrow, 4:00 PM",
      progress: 60,
      stage: "Washing",
    },
    {
      id: "EW-002",
      status: "completed",
      items: 12,
      total: 36.0,
      pickup: "Dec 20, 10:00 AM",
      delivery: "Dec 21, 3:00 PM",
      progress: 100,
      stage: "Delivered",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-foreground">Easywash</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-md">
        <Tabs defaultValue="order" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="order" className="text-xs">
              Order
            </TabsTrigger>
            <TabsTrigger value="track" className="text-xs">
              Track
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs">
              History
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs">
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Order Tab */}
          <TabsContent value="order" className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">New Order</h1>
              <p className="text-sm text-muted-foreground">Schedule your laundry pickup</p>
            </div>

            {/* Service Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedService === "wash-fold"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                      }`}
                    onClick={() => setSelectedService("wash-fold")}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm">Wash & Fold</h3>
                        <p className="text-xs text-muted-foreground">Standard cleaning service</p>
                      </div>
                      <span className="text-sm font-semibold">$2.50/lb</span>
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedService === "dry-clean"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                      }`}
                    onClick={() => setSelectedService("dry-clean")}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm">Dry Cleaning</h3>
                        <p className="text-xs text-muted-foreground">Professional dry cleaning</p>
                      </div>
                      <span className="text-sm font-semibold">$8.99/item</span>
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedService === "premium"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                      }`}
                    onClick={() => setSelectedService("premium")}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm">Premium Care</h3>
                        <p className="text-xs text-muted-foreground">Delicate items & special care</p>
                      </div>
                      <span className="text-sm font-semibold">$4.99/lb</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pickup Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm">
                    Pickup Address
                  </Label>
                  <Input id="address" placeholder="123 Main St, City, State" className="text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm">
                      Date
                    </Label>
                    <Select>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="day-after">Day After</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm">
                      Time
                    </Label>
                    <Select>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9am">9:00 AM</SelectItem>
                        <SelectItem value="11am">11:00 AM</SelectItem>
                        <SelectItem value="2pm">2:00 PM</SelectItem>
                        <SelectItem value="4pm">4:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions" className="text-sm">
                    Special Instructions
                  </Label>
                  <Textarea
                    id="instructions"
                    placeholder="Any special care instructions..."
                    className="text-sm resize-none"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/27</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Change
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg">
              Schedule Pickup
            </Button>
          </TabsContent>

          {/* Track Tab */}
          <TabsContent value="track" className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Track Order</h1>
              <p className="text-sm text-muted-foreground">Real-time order tracking</p>
            </div>

            {orders
              .filter((order) => order.status === "in-progress")
              .map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Order {order.id}</CardTitle>
                        <CardDescription className="text-xs">
                          {order.items} items • ${order.total}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {order.stage}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{order.progress}%</span>
                      </div>
                      <Progress value={order.progress} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Picked Up</p>
                          <p className="text-xs text-muted-foreground">{order.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-sm font-medium">In Progress</p>
                          <p className="text-xs text-muted-foreground">Currently {order.stage.toLowerCase()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <Truck className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Delivery</p>
                          <p className="text-xs text-muted-foreground">{order.delivery}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Order History</h1>
              <p className="text-sm text-muted-foreground">Your past orders</p>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-sm">Order {order.id}</h3>
                        <p className="text-xs text-muted-foreground">{order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">${order.total}</p>
                        <Badge
                          variant={order.status === "completed" ? "default" : "secondary"}
                          className="text-xs mt-1"
                        >
                          {order.status === "completed" ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Pickup: {order.pickup}</span>
                      <span>Delivery: {order.delivery}</span>
                    </div>
                    {order.status === "completed" && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                          Reorder
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Profile</h1>
              <p className="text-sm text-muted-foreground">Manage your account</p>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">Addresses</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">Payment Methods</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">Notifications</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">Rate Your Experience</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button variant="outline" className="w-full text-sm bg-transparent">
              Sign Out
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
