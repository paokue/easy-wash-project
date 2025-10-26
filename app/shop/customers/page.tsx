"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  ArrowLeft,
  Sparkles,
  Search,
  Users,
  Star,
  Phone,
  Mail,
  Plus,
  UserPlus,
  UserMinus,
  MoreVertical,
  Eye,
  Trash2,
  Ban,
  Crown,
  User,
} from "lucide-react"
import Link from "next/link"

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const itemsPerPage = 10

  const customers = [
    {
      id: "CUST-001",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345",
      joinDate: "2024-01-15",
      totalOrders: 24,
      totalSpent: 1248.5,
      rating: 4.8,
      status: "active",
      lastOrder: "2024-03-15",
      loyaltyPoints: 1248,
      preferredServices: ["Wash & Fold", "Dry Cleaning"],
    },
    {
      id: "CUST-002",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, City, State 12345",
      joinDate: "2024-02-20",
      totalOrders: 18,
      totalSpent: 892.25,
      rating: 4.9,
      status: "active",
      lastOrder: "2024-03-14",
      loyaltyPoints: 892,
      preferredServices: ["Express Wash", "Ironing"],
    },
    {
      id: "CUST-003",
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1 (555) 456-7890",
      address: "789 Pine St, City, State 12345",
      joinDate: "2024-01-08",
      totalOrders: 32,
      totalSpent: 1856.75,
      rating: 4.7,
      status: "vip",
      lastOrder: "2024-03-16",
      loyaltyPoints: 2856,
      preferredServices: ["Premium Wash", "Dry Cleaning", "Alterations"],
    },
    {
      id: "CUST-004",
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1 (555) 321-0987",
      address: "321 Elm St, City, State 12345",
      joinDate: "2024-03-01",
      totalOrders: 8,
      totalSpent: 324.0,
      rating: 5.0,
      status: "new",
      lastOrder: "2024-03-12",
      loyaltyPoints: 324,
      preferredServices: ["Wash & Fold"],
    },
    {
      id: "CUST-005",
      name: "Robert Brown",
      email: "robert.brown@email.com",
      phone: "+1 (555) 654-3210",
      address: "654 Cedar Ave, City, State 12345",
      joinDate: "2023-12-15",
      totalOrders: 2,
      totalSpent: 89.5,
      rating: 3.5,
      status: "inactive",
      lastOrder: "2024-01-20",
      loyaltyPoints: 89,
      preferredServices: ["Basic Wash"],
    },
  ]

  const stats = [
    { title: "Total Customers", value: "156", change: "+12", icon: Users, color: "text-blue-600" },
    { title: "New This Month", value: "23", change: "+8", icon: UserPlus, color: "text-green-600" },
    { title: "VIP Customer", value: "18", change: "+3", icon: Crown, color: "text-purple-600" },
    { title: "Inactive Customer", value: "12", change: "-2", icon: UserMinus, color: "text-red-600" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip":
        return "default"
      case "active":
        return "secondary"
      case "new":
        return "outline"
      case "inactive":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "vip":
        return "VIP"
      case "active":
        return "Active"
      case "new":
        return "New"
      case "inactive":
        return "Inactive"
      default:
        return "Unknown"
    }
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage)

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsViewDialogOpen(true)
  }

  const handleDeleteCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsDeleteDialogOpen(true)
  }

  const handleBanCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsBanDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/shop" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-lg font-semibold text-foreground">Customers</span>
                  <p className="text-xs text-muted-foreground">Manage your customer base</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="px-6 py-0">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
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
                    placeholder="Search customers..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Customer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Customer</DialogTitle>
                      <DialogDescription>Fill in the details to add a new customer to your system.</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter email address" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="Enter phone number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="vip">VIP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" placeholder="Enter customer address" />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="services">Preferred Services (comma separated)</Label>
                        <Textarea id="services" placeholder="Enter preferred services separated by commas" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddDialogOpen(false)}>Add Customer</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="text-sm">
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">{customer.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span>{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            <span>{customer.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(customer.status)} className="text-xs">
                          {getStatusLabel(customer.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium">{customer.totalOrders}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium">${customer.totalSpent}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-primary text-primary" />
                          <span className="text-sm font-medium">{customer.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs text-muted-foreground">
                          {new Date(customer.lastOrder).toLocaleDateString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBanCustomer(customer)} className="text-orange-600">
                              <Ban className="w-4 h-4 mr-2" />
                              Ban Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteCustomer(customer)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(page)
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>

      {/* View Customer Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>Detailed information about {selectedCustomer?.name}</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback>
                      {selectedCustomer.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedCustomer.id}</p>
                    <Badge variant={getStatusColor(selectedCustomer.status)} className="mt-1">
                      {getStatusLabel(selectedCustomer.status)}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Contact Information</Label>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm">{selectedCustomer.email}</p>
                      <p className="text-sm">{selectedCustomer.phone}</p>
                      <p className="text-sm">{selectedCustomer.address}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Account Details</Label>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm">Joined: {new Date(selectedCustomer.joinDate).toLocaleDateString()}</p>
                      <p className="text-sm">Loyalty Points: {selectedCustomer.loyaltyPoints}</p>
                      <p className="text-sm">Last Order: {new Date(selectedCustomer.lastOrder).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Order Statistics</Label>
                  <div className="mt-2 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Total Orders</span>
                      <span className="font-medium">{selectedCustomer.totalOrders}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Spent</span>
                      <span className="font-medium">${selectedCustomer.totalSpent}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average Order</span>
                      <span className="font-medium">
                        ${(selectedCustomer.totalSpent / selectedCustomer.totalOrders).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="font-medium">{selectedCustomer.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Preferred Services</Label>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedCustomer.preferredServices.map((service: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Customer Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedCustomer?.name}? This action cannot be undone and will remove all
              customer data and order history.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
              Delete Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ban Customer Dialog */}
      <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to ban {selectedCustomer?.name}? This will prevent them from placing new orders but
              will preserve their order history.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="ban-reason">Reason for ban (optional)</Label>
            <Textarea id="ban-reason" placeholder="Enter reason for banning this customer..." className="mt-2" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBanDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsBanDialogOpen(false)}>
              Ban Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
