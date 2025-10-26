"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  User,
  Package,
  CreditCard,
  Clock,
  Calendar,
  Star,
  Plus,
  Eye,
  Download,
  Search,
  Store,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function CustomerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 5
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false)
  const [isNewOrderOpen1, setIsNewOrderOpen1] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [selectedShop, setSelectedShop] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [estimatedCost, setEstimatedCost] = useState(25.0)

  const shops = [
    { id: "shop-1", name: "Clean & Fresh Laundry", address: "123 Main St", rating: 4.8, distance: "0.5 mi" },
    { id: "shop-2", name: "Sparkle Wash Center", address: "456 Oak Ave", rating: 4.6, distance: "1.2 mi" },
    { id: "shop-3", name: "Quick Clean Express", address: "789 Pine Rd", rating: 4.9, distance: "2.1 mi" },
    { id: "shop-4", name: "Premium Laundry Service", address: "321 Elm St", rating: 4.7, distance: "1.8 mi" },
  ]

  const customerInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    memberSince: "January 2023",
    totalOrders: 45,
    loyaltyPoints: 1250,
  }

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      items: ["2x Shirts", "1x Pants", "3x Underwear"],
      status: "completed",
      total: 25.5,
      pickupDate: "2024-01-17",
      rating: 5,
    },
    {
      id: "ORD-002",
      date: "2024-01-20",
      items: ["1x Dress", "2x Blouses"],
      status: "ready",
      total: 18.75,
      pickupDate: "2024-01-22",
      rating: null,
    },
    {
      id: "ORD-003",
      date: "2024-01-22",
      items: ["3x Shirts", "2x Pants"],
      status: "washing",
      total: 32.0,
      pickupDate: "2024-01-24",
      rating: null,
    },
    {
      id: "ORD-004",
      date: "2024-01-25",
      items: ["1x Suit", "2x Ties"],
      status: "pending",
      total: 45.0,
      pickupDate: "2024-01-27",
      rating: null,
    },
  ]

  const transactions = [
    {
      id: "TXN-001",
      date: "2024-01-15",
      description: "Laundry Service - ORD-001",
      amount: -25.5,
      method: "Credit Card",
      status: "completed",
    },
    {
      id: "TXN-002",
      date: "2024-01-20",
      description: "Laundry Service - ORD-002",
      amount: -18.75,
      method: "Debit Card",
      status: "completed",
    },
    {
      id: "TXN-003",
      date: "2024-01-22",
      description: "Loyalty Points Earned",
      amount: 32,
      method: "Points",
      status: "completed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "ready":
        return "bg-blue-100 text-blue-800"
      case "washing":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    const orderDate = new Date(order.date)
    const matchesStartDate = !startDate || orderDate >= new Date(startDate)
    const matchesEndDate = !endDate || orderDate <= new Date(endDate)

    return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate
  })

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const startIndex = (currentPage - 1) * ordersPerPage
  const endIndex = startIndex + ordersPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  const handleSchedulePickup = () => {
    if (!selectedShop || !selectedService || !pickupDate) {
      alert("Please fill in all required fields")
      return
    }
    setIsNewOrderOpen(false)
    setIsNewOrderOpen1(false)
    setIsPaymentOpen(true)
  }

  const handlePaymentConfirmation = () => {
    console.log("[v0] Processing payment:", {
      shop: selectedShop,
      service: selectedService,
      pickupDate,
      paymentMethod,
      amount: estimatedCost,
    })
    setIsPaymentOpen(false)
    setSelectedShop("")
    setSelectedService("")
    setPickupDate("")
    setSpecialInstructions("")
    setPaymentMethod("credit-card")
    alert("Order placed successfully! Payment processed.")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-md sm:text-xl font-semibold">Welcome back, {customerInfo.name}</h1>
                <p className="text-sm text-muted-foreground">Manage your laundry orders and account</p>
              </div>
            </div>
            <Dialog open={isNewOrderOpen} onOpenChange={setIsNewOrderOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 hidden sm:flex">
                  <Plus className="w-4 h-4" />
                  New Order
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Order</DialogTitle>
                  <DialogDescription>Schedule a new laundry pickup</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select Shop</Label>
                    <Select value={selectedShop} onValueChange={setSelectedShop}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a laundry shop" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {shops.map((shop) => (
                          <SelectItem key={shop.id} value={shop.id}>
                            <div className="flex items-center gap-2">
                              <Store className="w-4 h-4" />
                              <div>
                                <p className="font-medium">{shop.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {shop.address} • {shop.distance} • ⭐ {shop.rating}
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 w-full">
                    <Label>Service Type</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="wash-fold">Wash & Fold</SelectItem>
                        <SelectItem value="dry-clean">Dry Cleaning</SelectItem>
                        <SelectItem value="wash-iron">Wash & Iron</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Pickup Date</Label>
                    <Input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Special Instructions</Label>
                    <Textarea
                      placeholder="Any special requests..."
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <Button className="w-auto" onClick={handleSchedulePickup}>
                      Schedule Pickup
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Payment</DialogTitle>
                  <DialogDescription>Complete your order payment</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <h3 className="font-semibold text-sm">Order Summary</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shop:</span>
                        <span className="font-medium">{shops.find((s) => s.id === selectedShop)?.name || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service:</span>
                        <span className="font-medium capitalize">{selectedService.replace("-", " ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pickup Date:</span>
                        <span className="font-medium">{pickupDate}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between">
                        <span className="font-semibold">Estimated Total:</span>
                        <span className="font-semibold text-primary">${estimatedCost.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span>Credit Card</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="debit-card" id="debit-card" />
                        <Label htmlFor="debit-card" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span>Debit Card</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            <span>Cash on Delivery</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Card Number</Label>
                        <Input placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Expiry Date</Label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label>CVV</Label>
                          <Input placeholder="123" type="password" maxLength={3} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-end">
                    <Button className="w-auto" onClick={handlePaymentConfirmation}>
                      <CheckCircle className="w-4 h-4" />
                      Confirm Payment ${estimatedCost.toFixed(2)}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isNewOrderOpen1} onOpenChange={setIsNewOrderOpen1}>
              <DialogTrigger asChild>
                <Button size="lg" className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg md:hidden">
                  <Plus className="w-6 h-6" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Create New Order</DialogTitle>
                  <DialogDescription>Schedule a new laundry pickup</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Shop</Label>
                    <Select value={selectedShop} onValueChange={setSelectedShop}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a laundry shop" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {shops.map((shop) => (
                          <SelectItem key={shop.id} value={shop.id}>
                            <div className="flex items-center gap-2">
                              <Store className="w-4 h-4" />
                              <div>
                                <p className="font-medium">{shop.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {shop.address} • {shop.distance} • ⭐ {shop.rating}
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Service Type</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="wash-fold">Wash & Fold</SelectItem>
                        <SelectItem value="dry-clean">Dry Cleaning</SelectItem>
                        <SelectItem value="wash-iron">Wash & Iron</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Pickup Date</Label>
                    <Input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Special Instructions</Label>
                    <Textarea
                      placeholder="Any special requests..."
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={handleSchedulePickup}>
                    Schedule Pickup
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6">
          <Card className="border border-purple-300 bg-purple-50 text-purple-600">
            <CardContent className="px-4 py-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-md sm:text-xl font-semibold">{customerInfo.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-green-300 bg-green-50 text-green-600">
            <CardContent className="px-4 py-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Loyalty Points</p>
                  <p className="text-md sm:text-xl font-semibold">{customerInfo.loyaltyPoints}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-yellow-300 bg-yellow-50 text-yellow-600">
            <CardContent className="px-4 py-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Active Orders</p>
                  <p className="text-md sm:text-xl font-semibold">20</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="px-4 py-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="text-md sm:text-xl font-semibold text-primary">{customerInfo.memberSince}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and manage all your laundry orders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="washing">Washing</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="date"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <Input
                    type="date"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{order.id}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-0 sm:mr-1" />
                                  <span className="hidden sm:block">View</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Order Details - {order.id}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Order Date</Label>
                                      <p className="text-sm text-muted-foreground">{order.date}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Pickup Date</Label>
                                      <p className="text-sm text-muted-foreground">{order.pickupDate}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Status</Label>
                                      <Badge className={getStatusColor(order.status)}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                      </Badge>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Total</Label>
                                      <p className="text-sm font-semibold">${order.total.toFixed(2)}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Items</Label>
                                    <ul className="text-sm text-muted-foreground mt-1">
                                      {order.items.map((item, index) => (
                                        <li key={index}>• {item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-0 sm:mr-1" />
                              <span className="hidden sm:block">Receipt</span>
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Order Date</p>
                            <p className="font-medium">{order.date}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Items</p>
                            <p className="font-medium">{order.items.join(", ")}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Total</p>
                            <p className="font-semibold">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        {order.rating && (
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Your Rating:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < order.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">No orders found matching your filters</div>
                  )}
                </div>

                {/* Pagination */}
                {filteredOrders.length > 0 && (
                  <div className="flex items-center justify-between pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length}{" "}
                      orders
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-8 h-8 p-0"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View all your payment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:flex w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-md font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.date} • {transaction.method}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue={customerInfo.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue={customerInfo.email} />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input defaultValue={customerInfo.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label>Member Since</Label>
                    <Input defaultValue={customerInfo.memberSince} disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Textarea defaultValue={customerInfo.address} />
                </div>
                <Button>Update Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
