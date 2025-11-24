"use client"

import { useState } from "react"
import { Save, CreditCard } from "lucide-react"
import { DialogDescription } from "@/components/ui/dialog"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
   Package,
   DollarSign,
   TrendingUp,
   MapPin,
   Clock,
   Navigation,
   Eye,
   ChevronLeft,
   ChevronRight,
   Wallet,
   Download,
   Search,
   Star,
   User,
} from "lucide-react"

export default function DelivererDashboard() {
   const [activeTab, setActiveTab] = useState("overview")
   const [searchQuery, setSearchQuery] = useState("")
   const [statusFilter, setStatusFilter] = useState("all")
   const [currentPage, setCurrentPage] = useState(1)
   const [selectedDelivery, setSelectedDelivery] = useState<any>(null)
   const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
   const [withdrawOpen, setWithdrawOpen] = useState(false)
   const [withdrawAmount, setWithdrawAmount] = useState("")
   const [withdrawMethod, setWithdrawMethod] = useState("bank")

   const [profileData, setProfileData] = useState({
      name: "John Smith",
      email: "john.smith@easywash.com",
      phone: "+856 20 5555 1234",
      vehicle: "Motorcycle",
      licensePlate: "V-1234",
      bankName: "BCEL Bank",
      accountNumber: "1234567890",
      accountHolder: "John Smith",
      address: "123 Main St, Vientiane",
      confirmAccount: "",
   })

   const delivererInfo = {
      name: "John Smith",
      rating: 4.8,
      totalDeliveries: 342,
      completionRate: 98,
   }

   const stats = [
      { title: "Today's Deliveries", value: "12", change: "+8%", icon: Package, color: "blue" },
      { title: "This Week Earnings", value: "$486", change: "+15%", icon: DollarSign, color: "green" },
      { title: "Active Orders", value: "3", change: "0%", icon: Clock, color: "yellow" },
      { title: "Avg. Rating", value: "4.8", change: "+0.1", icon: Star, color: "purple" },
   ]

   const deliveries = [
      {
         id: "DEL-001",
         orderId: "ORD-1234",
         customer: "John Doe",
         phone: "+856 20 9876 5432",
         pickupAddress: "123 Main St, Vientiane",
         deliveryAddress: "456 Oak Ave, Vientiane",
         status: "pending",
         type: "pickup",
         amount: 24.5,
         date: "2024-01-20",
         time: "10:30 AM",
      },
      {
         id: "DEL-002",
         orderId: "ORD-1235",
         customer: "Jane Smith",
         phone: "+856 20 1111 2222",
         pickupAddress: "789 Pine Rd, Vientiane",
         deliveryAddress: "321 Elm St, Vientiane",
         status: "in-progress",
         type: "delivery",
         amount: 32.0,
         date: "2024-01-20",
         time: "11:00 AM",
      },
      {
         id: "DEL-003",
         orderId: "ORD-1236",
         customer: "Mike Johnson",
         phone: "+856 20 3333 4444",
         pickupAddress: "555 Maple Dr, Vientiane",
         deliveryAddress: "888 Birch Ln, Vientiane",
         status: "completed",
         type: "pickup",
         amount: 18.75,
         date: "2024-01-19",
         time: "09:15 AM",
      },
      {
         id: "DEL-004",
         orderId: "ORD-1237",
         customer: "Sarah Williams",
         phone: "+856 20 5555 6666",
         pickupAddress: "222 Cedar St, Vientiane",
         deliveryAddress: "999 Spruce Ave, Vientiane",
         status: "completed",
         type: "delivery",
         amount: 45.0,
         date: "2024-01-19",
         time: "02:30 PM",
      },
      {
         id: "DEL-005",
         orderId: "ORD-1238",
         customer: "Tom Brown",
         phone: "+856 20 7777 8888",
         pickupAddress: "444 Willow Rd, Vientiane",
         deliveryAddress: "111 Ash Dr, Vientiane",
         status: "pending",
         type: "pickup",
         amount: 28.0,
         date: "2024-01-20",
         time: "01:00 PM",
      },
   ]

   const walletBalance = 2458.5
   const pendingEarnings = 148.25

   const transactions = [
      {
         id: "TXN-001",
         description: "Delivery earnings - Week 3",
         amount: 486.0,
         date: "2024-01-20",
         type: "credit",
         status: "completed",
      },
      {
         id: "TXN-002",
         description: "Withdrawal to bank",
         amount: -200.0,
         date: "2024-01-18",
         type: "debit",
         status: "completed",
      },
      {
         id: "TXN-003",
         description: "Delivery earnings - Week 2",
         amount: 524.5,
         date: "2024-01-13",
         type: "credit",
         status: "completed",
      },
      {
         id: "TXN-004",
         description: "Bonus payment",
         amount: 50.0,
         date: "2024-01-10",
         type: "credit",
         status: "completed",
      },
   ]

   const getStatusColor = (status: string) => {
      switch (status) {
         case "completed":
            return "bg-green-100 text-green-800"
         case "in-progress":
            return "bg-blue-100 text-blue-800"
         case "pending":
            return "bg-yellow-100 text-yellow-800"
         default:
            return "bg-gray-100 text-gray-800"
      }
   }

   const getTypeColor = (type: string) => {
      return type === "pickup" ? "bg-purple-100 text-purple-800" : "bg-cyan-100 text-cyan-800"
   }

   const filteredDeliveries = deliveries.filter((delivery) => {
      const matchesSearch =
         delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
         delivery.customer.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || delivery.status === statusFilter
      return matchesSearch && matchesStatus
   })

   const totalPages = Math.ceil(filteredDeliveries.length / 5)
   const paginatedDeliveries = filteredDeliveries.slice((currentPage - 1) * 5, currentPage * 5)

   return (
      <div className="min-h-screen bg-background">
         {/* Header */}
         <div className="border-b bg-card">
            <div className="container mx-auto px-4 py-4">
               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                     <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                           {delivererInfo.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                        </AvatarFallback>
                     </Avatar>
                     <div>
                        <h1 className="text-lg sm:text-xl font-semibold">Welcome back, {delivererInfo.name}</h1>
                        <p className="text-xs sm:text-sm text-muted-foreground">Manage your deliveries and earnings</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="container mx-auto px-4 py-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
               {stats.map((stat, index) => (
                  <Card key={index}>
                     <CardContent className="p-2 sm:p-4">
                        <div className="flex items-center gap-0 sm:gap-3">
                           <div className={`hidden w-10 h-10 bg-${stat.color}-100 rounded-lg sm:flex items-center justify-center`}>
                              <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                           </div>
                           <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">{stat.title}</p>
                              <p className="text-md sm:text-xl font-semibold">{stat.value}</p>
                              <p className="text-xs text-primary">{stat.change} from yesterday</p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
               <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
                  <TabsTrigger value="wallet">Wallet</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
               </TabsList>

               {/* Overview Tab */}
               <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     {/* Today's Schedule */}
                     <Card>
                        <CardHeader>
                           <CardTitle className="text-sm sm:text-md">Today's Schedule</CardTitle>
                           <CardDescription className="text-xs sm:text-sm">Your upcoming deliveries</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 sm:space-y-3 p-2">
                           {deliveries
                              .filter((d) => d.status !== "completed")
                              .slice(0, 3)
                              .map((delivery) => (
                                 <div key={delivery.id} className="border rounded-lg p-3 space-y-2">
                                    <div className="flex items-center justify-between">
                                       <div className="flex items-center gap-2">
                                          <span className="text-sm font-semibold">{delivery.orderId}</span>
                                          <Badge className={getTypeColor(delivery.type)}>
                                             {delivery.type === "pickup" ? "Pickup" : "Delivery"}
                                          </Badge>
                                       </div>
                                       <span className="text-sm text-muted-foreground">{delivery.time}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                       <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                       <div>
                                          <p className="font-medium">{delivery.customer}</p>
                                          <p className="text-muted-foreground">
                                             {delivery.type === "pickup" ? delivery.pickupAddress : delivery.deliveryAddress}
                                          </p>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                        </CardContent>
                     </Card>

                     {/* Earnings Summary */}
                     <Card>
                        <CardHeader>
                           <CardTitle>Earnings Summary</CardTitle>
                           <CardDescription>Your financial overview</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                              <div className="space-y-2">
                                 <p className="text-sm text-muted-foreground">Available Balance</p>
                                 <p className="text-lg sm:text-2xl font-bold">${walletBalance.toFixed(2)}</p>
                              </div>
                              <Wallet className="w-8 h-8 text-primary" />
                           </div>
                           <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                              <div className="space-y-2">
                                 <p className="text-sm text-muted-foreground">Pending Earnings</p>
                                 <p className="text-lg sm:text-2xl font-bold">${pendingEarnings.toFixed(2)}</p>
                              </div>
                              <Clock className="w-8 h-8 text-yellow-600" />
                           </div>
                           <Button className="w-full" onClick={() => setWithdrawOpen(true)}>
                              <Download className="w-4 h-4 mr-2" />
                              Withdraw Funds
                           </Button>
                        </CardContent>
                     </Card>
                  </div>
               </TabsContent>

               {/* Deliveries Tab */}
               <TabsContent value="deliveries" className="space-y-4">
                  <Card>
                     <CardHeader>
                        <CardTitle>Delivery Management</CardTitle>
                        <CardDescription>View and manage all your deliveries</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4 p-2">
                        {/* Filters */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                           <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                 placeholder="Search deliveries..."
                                 value={searchQuery}
                                 onChange={(e) => setSearchQuery(e.target.value)}
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
                                 <SelectItem value="in-progress">In Progress</SelectItem>
                                 <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                           </Select>
                           <Input type="date" placeholder="Start Date" value={""} onChange={() => { }} />
                           <Input type="date" placeholder="End Date" value={""} onChange={() => { }} />
                        </div>

                        {/* Deliveries List */}
                        <div className="space-y-3">
                           {paginatedDeliveries.map((delivery) => (
                              <div key={delivery.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                                 <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                       <h3 className="font-semibold">{delivery.orderId}</h3>
                                       <Badge className={getStatusColor(delivery.status)}>
                                          {delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1)}
                                       </Badge>
                                       <Badge className={getTypeColor(delivery.type)}>
                                          {delivery.type === "pickup" ? "Pickup" : "Delivery"}
                                       </Badge>
                                    </div>
                                    <div className="hidden sm:flex items-center gap-2">
                                       <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                             setSelectedDelivery(delivery)
                                             setViewDetailsOpen(true)
                                          }}
                                       >
                                          <Eye className="w-4 h-4 mr-1" />
                                          View
                                       </Button>
                                       {delivery.status === "pending" && (
                                          <Button size="sm" onClick={() => alert("Start Delivery")}>
                                             <Navigation className="w-4 h-4 mr-1" />
                                             Start
                                          </Button>
                                       )}
                                    </div>
                                 </div>
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                       <p className="text-muted-foreground">Customer</p>
                                       <p className="font-medium">{delivery.customer}</p>
                                    </div>
                                    <div>
                                       <p className="text-muted-foreground">Date & Time</p>
                                       <p className="font-medium">
                                          {delivery.date} {delivery.time}
                                       </p>
                                    </div>
                                    <div>
                                       <p className="text-muted-foreground">Earnings</p>
                                       <p className="font-semibold text-green-600">${delivery.amount.toFixed(2)}</p>
                                    </div>
                                 </div>

                                 <div className="flex sm:hidden items-center justify-end gap-2 mt-4">
                                    <Button
                                       variant="outline"
                                       size="sm"
                                       onClick={() => {
                                          setSelectedDelivery(delivery)
                                          setViewDetailsOpen(true)
                                       }}
                                    >
                                       <Eye className="w-4 h-4 mr-1" />
                                       View
                                    </Button>
                                    {delivery.status === "pending" && (
                                       <Button size="sm" onClick={() => alert("Start Delivery")}>
                                          <Navigation className="w-4 h-4 mr-1" />
                                          Start
                                       </Button>
                                    )}
                                 </div>
                              </div>
                           ))}
                        </div>

                        {/* Pagination */}
                        {filteredDeliveries.length > 5 && (
                           <div className="flex items-center justify-between pt-4">
                              <p className="text-sm text-muted-foreground">
                                 Showing {(currentPage - 1) * 5 + 1} to {Math.min(currentPage * 5, filteredDeliveries.length)} of{" "}
                                 {filteredDeliveries.length} deliveries
                              </p>
                              <div className="flex items-center gap-2">
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                 >
                                    <ChevronLeft className="w-4 h-4" />
                                 </Button>
                                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                       key={page}
                                       variant={currentPage === page ? "default" : "outline"}
                                       size="sm"
                                       onClick={() => setCurrentPage(page)}
                                    >
                                       {page}
                                    </Button>
                                 ))}
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                 >
                                    <ChevronRight className="w-4 h-4" />
                                 </Button>
                              </div>
                           </div>
                        )}
                     </CardContent>
                  </Card>
               </TabsContent>

               {/* Wallet & Earnings Tab */}
               <TabsContent value="wallet" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {/* Wallet Balance Card */}
                     <Card>
                        <CardHeader>
                           <CardTitle className="flex items-center gap-2 text-base text-sm sm:text-md">
                              <Wallet className="w-5 h-5" />
                              Wallet Balance
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-lg sm:text-xl font-bold mb-2">${walletBalance.toFixed(2)}</p>
                           <p className="text-xs sm:text-sm text-muted-foreground mb-4">Available for withdrawal</p>
                           <Button className="w-full" onClick={() => setWithdrawOpen(true)}>
                              <Download className="w-4 h-4 mr-2" />
                              Withdraw
                           </Button>
                        </CardContent>
                     </Card>

                     {/* Pending Earnings Card */}
                     <Card>
                        <CardHeader>
                           <CardTitle className="flex items-center gap-2 text-sm sm:text-md">
                              <Clock className="w-5 h-5" />
                              Pending Earnings
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-lg sm:text-xl font-bold mb-2">${pendingEarnings.toFixed(2)}</p>
                           <p className="text-xs sm:text-sm text-muted-foreground mb-4">Will be available in 24-48 hours</p>
                           <Button className="w-full bg-transparent" variant="outline" disabled>
                              Processing
                           </Button>
                        </CardContent>
                     </Card>

                     {/* Total Earnings Card */}
                     <Card>
                        <CardHeader>
                           <CardTitle className="flex items-center gap-2 text-sm sm:text-md">
                              <TrendingUp className="w-5 h-5" />
                              Total Earnings
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-lg sm:text-xl font-bold mb-2">$12,458.75</p>
                           <p className="text-xs sm:text-sm text-muted-foreground mb-4">All-time earnings</p>
                           <Button className="w-full bg-transparent" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download Report
                           </Button>
                        </CardContent>
                     </Card>
                  </div>

                  {/* Transaction History */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>Your earning and withdrawal history</CardDescription>
                     </CardHeader>
                     <CardContent className="p-2">
                        <div className="space-y-4">
                           {transactions.map((transaction) => (
                              <div
                                 key={transaction.id}
                                 className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 p-3 border rounded-lg"
                              >
                                 <div className="flex items-start gap-3">
                                    <div
                                       className={cn(
                                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                                          transaction.type === "credit" ? "bg-green-100" : "bg-red-100",
                                       )}
                                    >
                                       {transaction.type === "credit" ? (
                                          <TrendingUp className="w-5 h-5 text-green-600" />
                                       ) : (
                                          <Download className="w-5 h-5 text-red-600" />
                                       )}
                                    </div>
                                    <div>
                                       <p className="font-medium text-sm sm:text-base">{transaction.description}</p>
                                       <p className="text-xs sm:text-sm text-muted-foreground">{transaction.date}</p>
                                    </div>
                                 </div>
                                 <div className="text-left sm:text-right ml-13 sm:ml-0">
                                    <p
                                       className={cn(
                                          "font-semibold text-base sm:text-lg",
                                          transaction.type === "credit" ? "text-green-600" : "text-red-600",
                                       )}
                                    >
                                       {transaction.type === "credit" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                                    </p>
                                    <Badge
                                       variant={transaction.status === "completed" ? "default" : "secondary"}
                                       className="text-xs"
                                    >
                                       {transaction.status}
                                    </Badge>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               {/* Settings Tab */}
               <TabsContent value="settings" className="space-y-6">
                  <Card>
                     <CardHeader>
                        <CardTitle>Profile & Payment Settings</CardTitle>
                        <CardDescription>Manage your profile information and payment details</CardDescription>
                     </CardHeader>
                     <CardContent className="p-2">
                        <Tabs defaultValue="personal" className="w-full">
                           <TabsList className="grid w-full grid-cols-2 mb-6">
                              <TabsTrigger value="personal">Personal Info</TabsTrigger>
                              <TabsTrigger value="payment">Payment Info</TabsTrigger>
                           </TabsList>

                           <TabsContent value="personal" className="space-y-6">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                 <div>
                                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                                    <Input
                                       value={profileData.name}
                                       onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    />
                                 </div>
                                 <div>
                                    <label className="text-sm font-medium mb-2 block">Email</label>
                                    <Input
                                       type="email"
                                       value={profileData.email}
                                       onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    />
                                 </div>
                                 <div>
                                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                                    <Input
                                       value={profileData.phone}
                                       onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    />
                                 </div>
                                 <div>
                                    <label className="text-sm font-medium mb-2 block">Vehicle Type</label>
                                    <Select
                                       value={profileData.vehicle}
                                       onValueChange={(value) => setProfileData({ ...profileData, vehicle: value })}
                                    >
                                       <SelectTrigger>
                                          <SelectValue />
                                       </SelectTrigger>
                                       <SelectContent>
                                          <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                                          <SelectItem value="Car">Car</SelectItem>
                                          <SelectItem value="Van">Van</SelectItem>
                                       </SelectContent>
                                    </Select>
                                 </div>
                                 <div>
                                    <label className="text-sm font-medium mb-2 block">License Plate</label>
                                    <Input
                                       value={profileData.licensePlate}
                                       onChange={(e) => setProfileData({ ...profileData, licensePlate: e.target.value })}
                                    />
                                 </div>
                                 <div>
                                    <label className="text-sm font-medium mb-2 block">Address</label>
                                    <Input
                                       placeholder="Your address"
                                       value={profileData.address || "123 Main St, Vientiane"}
                                       onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                    />
                                 </div>
                              </div>

                              <div className="flex justify-end pt-4">
                                 <Button className="bg-primary">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Personal Info
                                 </Button>
                              </div>
                           </TabsContent>

                           <TabsContent value="payment" className="space-y-6">
                              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                 <p className="text-sm text-blue-800">
                                    Set up your payment information to receive withdrawals from your wallet balance.
                                 </p>
                              </div>

                              <div className="space-y-4">
                                 <div>
                                    <label className="text-sm font-medium mb-2 block">Bank Name</label>
                                    <Select
                                       value={profileData.bankName}
                                       onValueChange={(value) => setProfileData({ ...profileData, bankName: value })}
                                    >
                                       <SelectTrigger>
                                          <SelectValue placeholder="Select your bank" />
                                       </SelectTrigger>
                                       <SelectContent>
                                          <SelectItem value="BCEL Bank">BCEL Bank</SelectItem>
                                          <SelectItem value="Banque Pour Le Commerce Exterieur Lao">BCEL</SelectItem>
                                          <SelectItem value="Lao Development Bank">Lao Development Bank</SelectItem>
                                          <SelectItem value="Joint Development Bank">Joint Development Bank</SelectItem>
                                          <SelectItem value="Agricultural Promotion Bank">Agricultural Promotion Bank</SelectItem>
                                       </SelectContent>
                                    </Select>
                                 </div>

                                 <div>
                                    <label className="text-sm font-medium mb-2 block">Account Holder Name</label>
                                    <Input
                                       placeholder="Name on bank account"
                                       value={profileData.accountHolder}
                                       onChange={(e) => setProfileData({ ...profileData, accountHolder: e.target.value })}
                                    />
                                 </div>

                                 <div>
                                    <label className="text-sm font-medium mb-2 block">Account Number</label>
                                    <Input
                                       placeholder="Enter your account number"
                                       value={profileData.accountNumber}
                                       onChange={(e) => setProfileData({ ...profileData, accountNumber: e.target.value })}
                                    />
                                 </div>

                                 <div>
                                    <label className="text-sm font-medium mb-2 block">Confirm Account Number</label>
                                    <Input
                                       placeholder="Re-enter your account number"
                                       value={profileData.confirmAccount || ""}
                                       onChange={(e) => setProfileData({ ...profileData, confirmAccount: e.target.value })}
                                    />
                                 </div>
                              </div>

                              <div className="flex justify-end pt-4">
                                 <Button className="bg-primary">
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Save Payment Info
                                 </Button>
                              </div>
                           </TabsContent>
                        </Tabs>
                     </CardContent>
                  </Card>
               </TabsContent>
            </Tabs>
         </div>

         {/* Withdraw Dialog */}
         <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
            <DialogContent className="max-w-md">
               <DialogHeader>
                  <DialogTitle>Withdraw Funds</DialogTitle>
                  <DialogDescription>Transfer your earnings to your payment method</DialogDescription>
               </DialogHeader>
               <div className="space-y-4">
                  <div>
                     <label className="text-sm font-medium mb-2 block">Available Balance</label>
                     <p className="text-3xl font-bold text-primary">${walletBalance.toFixed(2)}</p>
                  </div>

                  <div>
                     <label className="text-sm font-medium mb-2 block">Withdrawal Method</label>
                     <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                        <SelectTrigger>
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="bank">Bank Transfer</SelectItem>
                           <SelectItem value="mobile">Mobile Money</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  {withdrawMethod === "bank" && profileData.accountNumber ? (
                     <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">Bank Account</p>
                        <p className="text-sm text-muted-foreground">{profileData.bankName}</p>
                        <p className="text-sm text-muted-foreground">**** **** {profileData.accountNumber.slice(-4)}</p>
                        <p className="text-sm text-muted-foreground">{profileData.accountHolder}</p>
                     </div>
                  ) : !profileData.accountNumber ? (
                     <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">Please set up your payment information in your profile first.</p>
                        <Button
                           variant="link"
                           className="p-0 h-auto text-yellow-800"
                           onClick={() => {
                              setWithdrawOpen(false)
                              setActiveTab("settings")
                           }}
                        >
                           Go to Profile Settings
                        </Button>
                     </div>
                  ) : null}

                  <div>
                     <label className="text-sm font-medium mb-2 block">Withdrawal Amount</label>
                     <Input
                        type="number"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        max={walletBalance}
                        min="10"
                     />
                     <p className="text-xs text-muted-foreground mt-1">Minimum withdrawal: $10.00</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                     <div className="flex justify-between text-sm">
                        <span>Withdrawal Amount</span>
                        <span className="font-medium">${Number.parseFloat(withdrawAmount || "0").toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span>Processing Fee (2%)</span>
                        <span className="font-medium">-${(Number.parseFloat(withdrawAmount || "0") * 0.02).toFixed(2)}</span>
                     </div>
                     <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>You'll Receive</span>
                        <span>${(Number.parseFloat(withdrawAmount || "0") * 0.98).toFixed(2)}</span>
                     </div>
                  </div>
               </div>
               <DialogFooter>
                  <Button variant="outline" onClick={() => setWithdrawOpen(false)}>
                     Cancel
                  </Button>
                  <Button
                     disabled={
                        !withdrawAmount ||
                        Number.parseFloat(withdrawAmount) < 10 ||
                        Number.parseFloat(withdrawAmount) > walletBalance ||
                        !profileData.accountNumber
                     }
                     onClick={() => {
                        // Handle withdrawal
                        setWithdrawOpen(false)
                        setWithdrawAmount("")
                     }}
                  >
                     <Download className="w-4 h-4 mr-2" />
                     Confirm Withdrawal
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   )
}
