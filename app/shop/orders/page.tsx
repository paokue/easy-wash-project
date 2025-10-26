"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Package,
  Search,
  ArrowLeft,
  Bell,
  Settings,
  Clock,
  MapPin,
  Phone,
  Calendar,
  Truck,
  CheckCircle,
  AlertCircle,
  Timer,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [updateOrderOpen, setUpdateOrderOpen] = useState(false)
  const [deleteOrderOpen, setDeleteOrderOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const orders = [
    {
      id: "EW-001",
      customer: "John Doe",
      phone: "(555) 123-4567",
      email: "john.doe@example.com",
      service: "Wash & Fold",
      status: "in-progress",
      stage: "Washing",
      items: 8,
      weight: "12 lbs",
      total: 24.5,
      pickup: "2:00 PM",
      delivery: "Tomorrow 4:00 PM",
      priority: "normal",
      address: "123 Main St, City",
      notes: "Extra fabric softener requested",
      createdAt: "Today 10:30 AM",
      estimatedCompletion: "Tomorrow 2:00 PM",
    },
    {
      id: "EW-002",
      customer: "Jane Smith",
      phone: "(555) 987-6543",
      email: "jane.smith@example.com",
      service: "Dry Clean",
      status: "ready",
      stage: "Ready for Pickup",
      items: 3,
      weight: "4 lbs",
      total: 26.97,
      pickup: "10:00 AM",
      delivery: "Today 6:00 PM",
      priority: "high",
      address: "456 Oak Ave, City",
      notes: "Delicate silk blouse - handle with care",
      createdAt: "Yesterday 2:15 PM",
      estimatedCompletion: "Today 5:00 PM",
    },
    {
      id: "EW-003",
      customer: "Mike Johnson",
      phone: "(555) 456-7890",
      email: "mike.j@example.com",
      service: "Premium Care",
      status: "pending",
      stage: "Awaiting Pickup",
      items: 12,
      weight: "18 lbs",
      total: 59.88,
      pickup: "4:00 PM",
      delivery: "Dec 24 2:00 PM",
      priority: "normal",
      address: "789 Pine St, City",
      notes: "Business shirts need pressing",
      createdAt: "Today 8:45 AM",
      estimatedCompletion: "Dec 23 6:00 PM",
    },
    {
      id: "EW-004",
      customer: "Sarah Wilson",
      phone: "(555) 321-9876",
      email: "sarah.w@example.com",
      service: "Express Wash",
      status: "completed",
      stage: "Delivered",
      items: 6,
      weight: "8 lbs",
      total: 32.5,
      pickup: "9:00 AM",
      delivery: "Today 1:00 PM",
      priority: "high",
      address: "321 Elm St, City",
      notes: "Same-day service",
      createdAt: "Today 9:15 AM",
      estimatedCompletion: "Today 12:00 PM",
    },
  ]

  const stats = [
    { title: "Total Orders", value: "47", change: "+12%", icon: Package, color: "text-blue-600" },
    { title: "Pending", value: "21", change: "+8%", icon: AlertCircle, color: "text-yellow-600" },
    { title: "In Progress", value: "18", change: "+5%", icon: Timer, color: "text-orange-600" },
    { title: "Ready for Pickup", value: "8", change: "-2%", icon: CheckCircle, color: "text-green-600" },
    { title: "Completed", value: "15", change: "+3%", icon: CheckCircle, color: "text-green-600" },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesService = serviceFilter === "all" || order.service === serviceFilter
    return matchesSearch && matchesStatus && matchesService
  })

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "ready":
        return "secondary"
      case "in-progress":
        return "outline"
      case "pending":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order)
    setViewDetailsOpen(true)
  }

  const handleUpdateOrder = (order: any) => {
    setSelectedOrder(order)
    setUpdateOrderOpen(true)
  }

  const handleDeleteOrder = (order: any) => {
    setSelectedOrder(order)
    setDeleteOrderOpen(true)
  }

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log("Deleting order:", selectedOrder?.id)
    setDeleteOrderOpen(false)
    setSelectedOrder(null)
  }

  const updateOrder = () => {
    // TODO: Implement update logic
    console.log("Updating order:", selectedOrder?.id)
    setUpdateOrderOpen(false)
    setSelectedOrder(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/shop" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-lg font-semibold text-foreground">Orders Management</span>
                  <p className="text-xs text-muted-foreground">Track and manage all orders</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">SW</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="px-6 py-1">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-primary">{stat.change} from yesterday</p>
                  </div>
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">

          <Card className="px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search orders, customers..."
                    className="pl-10 w-64 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 text-sm">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={serviceFilter} onValueChange={setServiceFilter}>
                  <SelectTrigger className="w-40 text-sm">
                    <SelectValue placeholder="Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="Wash & Fold">Wash & Fold</SelectItem>
                    <SelectItem value="Dry Clean">Dry Clean</SelectItem>
                    <SelectItem value="Premium Care">Premium Care</SelectItem>
                    <SelectItem value="Express Wash">Express Wash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Input
                    type="date"
                    placeholder="Start Date"
                    className="w-40 text-sm"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span className="text-sm text-muted-foreground">to</span>
                  <Input
                    type="date"
                    placeholder="End Date"
                    className="w-40 text-sm"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Order Details</TableHead>
                  <TableHead className="text-xs">Customer</TableHead>
                  <TableHead className="text-xs">Service & Items</TableHead>
                  <TableHead className="text-xs">Status & Stage</TableHead>
                  <TableHead className="text-xs">Timeline</TableHead>
                  <TableHead className="text-xs">Total</TableHead>
                  <TableHead className="text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.createdAt}</p>
                        {order.priority === "high" && (
                          <Badge variant="destructive" className="text-xs mt-1">
                            High Priority
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {order.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{order.customer}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            {order.phone}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {order.address}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{order.service}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.items} items • {order.weight}
                        </p>
                        {order.notes && <p className="text-xs text-muted-foreground mt-1 italic">"{order.notes}"</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Badge variant={getStatusColor(order.status)} className="text-xs">
                          {order.stage}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          Est: {order.estimatedCompletion}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span>Pickup: {order.pickup}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Truck className="w-3 h-3 text-muted-foreground" />
                          <span>Delivery: {order.delivery}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm font-medium">${order.total}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateOrder(order)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Update
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteOrder(order)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>Complete information for this order</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Customer Information</Label>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm">
                      <strong>Name:</strong> {selectedOrder.customer}
                    </p>
                    <p className="text-sm">
                      <strong>Phone:</strong> {selectedOrder.phone}
                    </p>
                    <p className="text-sm">
                      <strong>Email:</strong> {selectedOrder.email}
                    </p>
                    <p className="text-sm">
                      <strong>Address:</strong> {selectedOrder.address}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Service Details</Label>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm">
                      <strong>Service:</strong> {selectedOrder.service}
                    </p>
                    <p className="text-sm">
                      <strong>Items:</strong> {selectedOrder.items}
                    </p>
                    <p className="text-sm">
                      <strong>Weight:</strong> {selectedOrder.weight}
                    </p>
                    <p className="text-sm">
                      <strong>Priority:</strong> {selectedOrder.priority}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Status & Timeline</Label>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm">
                      <strong>Status:</strong> {selectedOrder.stage}
                    </p>
                    <p className="text-sm">
                      <strong>Created:</strong> {selectedOrder.createdAt}
                    </p>
                    <p className="text-sm">
                      <strong>Pickup:</strong> {selectedOrder.pickup}
                    </p>
                    <p className="text-sm">
                      <strong>Delivery:</strong> {selectedOrder.delivery}
                    </p>
                    <p className="text-sm">
                      <strong>Est. Completion:</strong> {selectedOrder.estimatedCompletion}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Payment</Label>
                  <div className="mt-2">
                    <p className="text-lg font-bold">${selectedOrder.total}</p>
                  </div>
                </div>
                {selectedOrder.notes && (
                  <div>
                    <Label className="text-sm font-medium">Notes</Label>
                    <p className="text-sm mt-2 italic">"{selectedOrder.notes}"</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={updateOrderOpen} onOpenChange={setUpdateOrderOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Order - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>Modify order details and status</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={selectedOrder.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="ready">Ready for Pickup</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="service">Service</Label>
                  <Select defaultValue={selectedOrder.service}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wash & Fold">Wash & Fold</SelectItem>
                      <SelectItem value="Dry Clean">Dry Clean</SelectItem>
                      <SelectItem value="Premium Care">Premium Care</SelectItem>
                      <SelectItem value="Express Wash">Express Wash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select defaultValue={selectedOrder.priority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pickup">Pickup Time</Label>
                  <Input id="pickup" defaultValue={selectedOrder.pickup} />
                </div>
                <div>
                  <Label htmlFor="delivery">Delivery Time</Label>
                  <Input id="delivery" defaultValue={selectedOrder.delivery} />
                </div>
                <div>
                  <Label htmlFor="total">Total Amount</Label>
                  <Input id="total" type="number" step="0.01" defaultValue={selectedOrder.total} />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" defaultValue={selectedOrder.notes} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateOrderOpen(false)}>
              Cancel
            </Button>
            <Button onClick={updateOrder}>Update Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOrderOpen} onOpenChange={setDeleteOrderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete order {selectedOrder?.id}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOrderOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
