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
  Users,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Ban,
  Trash2,
  Mail,
  Phone,
  Star,
  UserCheck,
  UserX,
} from "lucide-react"

export default function CustomerManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isBanOpen, setIsBanOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // Mock data for customers
  const customers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 234-567-8901",
      address: "123 Main St, Downtown",
      status: "active",
      type: "vip",
      totalOrders: 45,
      totalSpent: "$1,250.00",
      loyaltyPoints: 2500,
      joinDate: "2023-01-15",
      lastOrder: "2024-01-20",
      rating: 4.8,
      shop: "Downtown Laundry",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+1 234-567-8902",
      address: "456 Oak Ave, Westside",
      status: "active",
      type: "regular",
      totalOrders: 23,
      totalSpent: "$680.00",
      loyaltyPoints: 1200,
      joinDate: "2023-03-22",
      lastOrder: "2024-01-18",
      rating: 4.5,
      shop: "Westside Wash",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      phone: "+1 234-567-8903",
      address: "789 Pine St, Uptown",
      status: "banned",
      type: "regular",
      totalOrders: 12,
      totalSpent: "$340.00",
      loyaltyPoints: 0,
      joinDate: "2023-06-10",
      lastOrder: "2023-12-15",
      rating: 3.2,
      shop: "Express Clean",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david@example.com",
      phone: "+1 234-567-8904",
      address: "321 Elm St, Midtown",
      status: "inactive",
      type: "regular",
      totalOrders: 8,
      totalSpent: "$220.00",
      loyaltyPoints: 450,
      joinDate: "2023-08-05",
      lastOrder: "2023-11-30",
      rating: 4.1,
      shop: "Downtown Laundry",
    },
  ]

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsViewOpen(true)
  }

  const handleBanCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsBanOpen(true)
  }

  const handleDeleteCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsDeleteOpen(true)
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const vipCustomers = customers.filter((c) => c.type === "vip").length
  const inactiveCustomers = customers.filter((c) => c.status === "inactive").length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customer Management</h1>
          <p className="text-muted-foreground">Manage all customers across all shops</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeCustomers / totalCustomers) * 100)}% active rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vipCustomers}</div>
            <p className="text-xs text-muted-foreground">Premium members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Customers</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveCustomers}</div>
            <p className="text-xs text-muted-foreground">Need re-engagement</p>
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
                placeholder="Search customers..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Customer Details</th>
                  <th className="text-left p-4">Contact Info</th>
                  <th className="text-left p-4">Activity</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Shop</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium flex items-center">
                          {customer.name}
                          {customer.type === "vip" && <Star className="h-4 w-4 text-yellow-500 ml-2" />}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ID: #{customer.id} • Joined {customer.joinDate}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="text-sm flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {customer.email}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="text-sm">{customer.totalOrders} orders</div>
                        <div className="text-sm text-muted-foreground">Spent: {customer.totalSpent}</div>
                        <div className="text-sm text-muted-foreground">Points: {customer.loyaltyPoints}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          customer.status === "active"
                            ? "default"
                            : customer.status === "inactive"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{customer.shop}</div>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBanCustomer(customer)}>
                            <Ban className="h-4 w-4 mr-2" />
                            {customer.status === "banned" ? "Unban" : "Ban"} Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCustomer(customer)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Customer
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

      {/* View Customer Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <div className="space-y-2">
                    <div>
                      <strong>Name:</strong> {selectedCustomer.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {selectedCustomer.email}
                    </div>
                    <div>
                      <strong>Phone:</strong> {selectedCustomer.phone}
                    </div>
                    <div>
                      <strong>Address:</strong> {selectedCustomer.address}
                    </div>
                    <div>
                      <strong>Customer Type:</strong>
                      <Badge className="ml-2" variant={selectedCustomer.type === "vip" ? "default" : "secondary"}>
                        {selectedCustomer.type}
                      </Badge>
                    </div>
                    <div>
                      <strong>Join Date:</strong> {selectedCustomer.joinDate}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Activity & Performance</h3>
                  <div className="space-y-2">
                    <div>
                      <strong>Total Orders:</strong> {selectedCustomer.totalOrders}
                    </div>
                    <div>
                      <strong>Total Spent:</strong> {selectedCustomer.totalSpent}
                    </div>
                    <div>
                      <strong>Loyalty Points:</strong> {selectedCustomer.loyaltyPoints}
                    </div>
                    <div>
                      <strong>Rating:</strong> {selectedCustomer.rating}/5.0
                    </div>
                    <div>
                      <strong>Last Order:</strong> {selectedCustomer.lastOrder}
                    </div>
                    <div>
                      <strong>Primary Shop:</strong> {selectedCustomer.shop}
                    </div>
                    <div>
                      <strong>Status:</strong>
                      <Badge
                        className="ml-2"
                        variant={
                          selectedCustomer.status === "active"
                            ? "default"
                            : selectedCustomer.status === "inactive"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {selectedCustomer.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Ban Customer Dialog */}
      <Dialog open={isBanOpen} onOpenChange={setIsBanOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCustomer?.status === "banned" ? "Unban Customer" : "Ban Customer"}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to {selectedCustomer?.status === "banned" ? "unban" : "ban"}{" "}
              {selectedCustomer?.name}?
            </p>
            {selectedCustomer?.status !== "banned" && (
              <p className="text-sm text-muted-foreground mt-2">
                This will prevent the customer from placing new orders.
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsBanOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={selectedCustomer?.status === "banned" ? "default" : "destructive"}
              onClick={() => setIsBanOpen(false)}
            >
              {selectedCustomer?.status === "banned" ? "Unban" : "Ban"} Customer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Customer Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete {selectedCustomer?.name}?</p>
            <p className="text-sm text-muted-foreground mt-2">
              This action cannot be undone. All customer data and order history will be permanently removed.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteOpen(false)}>
              Delete Customer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
