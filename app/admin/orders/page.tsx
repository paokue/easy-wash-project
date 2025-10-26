"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ShoppingBag,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  DollarSign,
} from "lucide-react"

export default function OrderManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // Mock data for orders
  const orders = [
    {
      id: "ORD-001",
      customer: "Alice Johnson",
      customerEmail: "alice@example.com",
      shop: "Downtown Laundry",
      items: ["Wash & Fold", "Dry Cleaning"],
      quantity: "5 kg",
      amount: "$45.00",
      status: "completed",
      priority: "normal",
      orderDate: "2024-01-20",
      completedDate: "2024-01-21",
      estimatedTime: "24 hours",
      paymentStatus: "paid",
      notes: "Handle with care - delicate items",
    },
    {
      id: "ORD-002",
      customer: "Bob Smith",
      customerEmail: "bob@example.com",
      shop: "Westside Wash",
      items: ["Express Wash"],
      quantity: "3 kg",
      amount: "$28.00",
      status: "in-progress",
      priority: "high",
      orderDate: "2024-01-21",
      completedDate: null,
      estimatedTime: "2 hours",
      paymentStatus: "paid",
      notes: "Rush order - needed by 3 PM",
    },
    {
      id: "ORD-003",
      customer: "Carol Davis",
      customerEmail: "carol@example.com",
      shop: "Express Clean",
      items: ["Wash & Fold", "Ironing"],
      quantity: "7 kg",
      amount: "$62.00",
      status: "pending",
      priority: "normal",
      orderDate: "2024-01-21",
      completedDate: null,
      estimatedTime: "48 hours",
      paymentStatus: "pending",
      notes: "Customer prefers eco-friendly detergent",
    },
    {
      id: "ORD-004",
      customer: "David Wilson",
      customerEmail: "david@example.com",
      shop: "Downtown Laundry",
      items: ["Dry Cleaning"],
      quantity: "2 items",
      amount: "$35.00",
      status: "cancelled",
      priority: "low",
      orderDate: "2024-01-19",
      completedDate: null,
      estimatedTime: "72 hours",
      paymentStatus: "refunded",
      notes: "Customer cancelled due to change of plans",
    },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shop.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setIsViewOpen(true)
  }

  const handleEditOrder = (order: any) => {
    setSelectedOrder(order)
    setIsEditOpen(true)
  }

  const handleDeleteOrder = (order: any) => {
    setSelectedOrder(order)
    setIsDeleteOpen(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "pending":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "normal":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "secondary"
    }
  }

  const totalOrders = orders.length
  const completedOrders = orders.filter((o) => o.status === "completed").length
  const inProgressOrders = orders.filter((o) => o.status === "in-progress").length
  const totalRevenue = orders.reduce((sum, order) => sum + Number.parseFloat(order.amount.replace("$", "")), 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Monitor and manage all orders across all shops</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">+8 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((completedOrders / totalOrders) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressOrders}</div>
            <p className="text-xs text-muted-foreground">Currently processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From all orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search orders, customers, or shops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Order Details</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Shop</th>
                  <th className="text-left p-4">Items & Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Priority</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.orderDate} • {order.estimatedTime}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{order.shop}</div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="text-sm">{order.items.join(", ")}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.quantity} • {order.amount}
                        </div>
                        <Badge variant={order.paymentStatus === "paid" ? "default" : "outline"} className="text-xs">
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={getPriorityVariant(order.priority)}>{order.priority}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditOrder(order)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Order
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteOrder(order)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Order Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Information</h3>
                  <div className="space-y-2">
                    <div>
                      <strong>Order ID:</strong> {selectedOrder.id}
                    </div>
                    <div>
                      <strong>Order Date:</strong> {selectedOrder.orderDate}
                    </div>
                    <div>
                      <strong>Estimated Time:</strong> {selectedOrder.estimatedTime}
                    </div>
                    <div>
                      <strong>Completed Date:</strong> {selectedOrder.completedDate || "Not completed"}
                    </div>
                    <div>
                      <strong>Items:</strong> {selectedOrder.items.join(", ")}
                    </div>
                    <div>
                      <strong>Quantity:</strong> {selectedOrder.quantity}
                    </div>
                    <div>
                      <strong>Amount:</strong> {selectedOrder.amount}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="space-y-2">
                    <div>
                      <strong>Name:</strong> {selectedOrder.customer}
                    </div>
                    <div>
                      <strong>Email:</strong> {selectedOrder.customerEmail}
                    </div>
                    <div>
                      <strong>Shop:</strong> {selectedOrder.shop}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Status & Priority</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <strong className="mr-2">Status:</strong>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedOrder.status)}
                        <Badge variant={getStatusVariant(selectedOrder.status)}>{selectedOrder.status}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <strong className="mr-2">Priority:</strong>
                      <Badge variant={getPriorityVariant(selectedOrder.priority)}>{selectedOrder.priority}</Badge>
                    </div>
                    <div className="flex items-center">
                      <strong className="mr-2">Payment:</strong>
                      <Badge variant={selectedOrder.paymentStatus === "paid" ? "default" : "outline"}>
                        {selectedOrder.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Special Notes</h3>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded">{selectedOrder.notes}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Order Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Order - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select defaultValue={selectedOrder.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select defaultValue={selectedOrder.priority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Status</label>
                <Select defaultValue={selectedOrder.paymentStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Estimated Time</label>
                <Input defaultValue={selectedOrder.estimatedTime} />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <textarea
                  className="w-full p-2 border rounded-md resize-none"
                  rows={3}
                  defaultValue={selectedOrder.notes}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditOpen(false)}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Order Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to cancel order {selectedOrder?.id}?</p>
            <p className="text-sm text-muted-foreground mt-2">
              This will mark the order as cancelled and may trigger a refund process.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Keep Order
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteOpen(false)}>
              Cancel Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
