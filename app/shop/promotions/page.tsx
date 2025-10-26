"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  Sparkles,
  Plus,
  Percent,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Users,
  Target,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function PromotionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)

  const promotions = [
    {
      id: "PROMO-001",
      name: "First Time Customer",
      type: "percentage",
      value: 20,
      code: "FIRST20",
      status: "active",
      used: 45,
      limit: 100,
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      description: "20% discount for first-time customers",
      revenue: 2450,
      customers: 45,
    },
    {
      id: "PROMO-002",
      name: "Bulk Order Discount",
      type: "percentage",
      value: 15,
      code: "BULK15",
      status: "active",
      used: 23,
      limit: 50,
      startDate: "2024-03-01",
      endDate: "2024-04-30",
      description: "15% discount for bulk orders over $100",
      revenue: 1890,
      customers: 23,
    },
    {
      id: "PROMO-003",
      name: "Summer Special",
      type: "fixed",
      value: 10,
      code: "SUMMER10",
      status: "expired",
      used: 78,
      limit: 100,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      description: "$10 off summer cleaning services",
      revenue: 3420,
      customers: 78,
    },
    {
      id: "PROMO-004",
      name: "VIP Member Exclusive",
      type: "percentage",
      value: 25,
      code: "VIP25",
      status: "active",
      used: 12,
      limit: 30,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      description: "25% discount for VIP members",
      revenue: 1680,
      customers: 12,
    },
    {
      id: "PROMO-005",
      name: "Holiday Special",
      type: "percentage",
      value: 30,
      code: "HOLIDAY30",
      status: "scheduled",
      used: 0,
      limit: 200,
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      description: "30% off holiday season promotion",
      revenue: 0,
      customers: 0,
    },
  ]

  const itemsPerPage = 10
  const totalPages = Math.ceil(promotions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPromotions = promotions.slice(startIndex, endIndex)

  const filteredPromotions = currentPromotions.filter((promotion) => {
    const matchesSearch =
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || promotion.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPromotions = promotions.length
  const activePromotions = promotions.filter((p) => p.status === "active").length
  const totalRevenue = promotions.reduce((sum, p) => sum + p.revenue, 0)
  const totalCustomers = promotions.reduce((sum, p) => sum + p.customers, 0)

  const handleCreatePromotion = () => {
    setIsCreateOpen(false)
    // Implementation for creating promotion
  }

  const handleEditPromotion = () => {
    setIsEditOpen(false)
    // Implementation for editing promotion
  }

  const handleDeletePromotion = () => {
    setIsDeleteOpen(false)
    // Implementation for deleting promotion
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "expired":
        return "destructive"
      case "scheduled":
        return "secondary"
      default:
        return "outline"
    }
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
                <div>
                  <span className="text-lg font-semibold text-foreground">Promotions</span>
                  <p className="text-xs text-muted-foreground">Manage discounts and offers</p>
                </div>
              </div>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Promotion
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Promotion</DialogTitle>
                  <DialogDescription>Create a new promotion to attract customers and boost sales.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Promotion Name</Label>
                      <Input id="name" placeholder="Enter promotion name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Promotion Code</Label>
                      <Input id="code" placeholder="Enter promo code" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter promotion description" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Discount Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Discount Value</Label>
                      <Input id="value" type="number" placeholder="Enter value" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="limit">Usage Limit</Label>
                      <Input id="limit" type="number" placeholder="Enter limit" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" type="date" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePromotion}>Create Promotion</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Promotions</p>
                  <p className="text-2xl font-bold">{totalPromotions}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Percent className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Promotions</p>
                  <p className="text-xl font-bold">{activePromotions}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-xl font-bold">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customers Reached</p>
                  <p className="text-xl font-bold">{totalCustomers}</p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="px-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search promotions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardContent className="px-0 py-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4">Promotion</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right px-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.map((promotion) => (
                  <TableRow key={promotion.id}>
                    <TableCell className="px-4">
                      <div>
                        <div className="font-medium">{promotion.name}</div>
                        <div className="text-sm text-muted-foreground">{promotion.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4" />
                        {promotion.type === "percentage" ? `${promotion.value}%` : `$${promotion.value}`}
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="bg-muted px-2 py-1 rounded text-sm">{promotion.code}</code>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>
                          {promotion.used}/{promotion.limit}
                        </div>
                        <div className="text-muted-foreground">
                          {Math.round((promotion.used / promotion.limit) * 100)}% used
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">${promotion.revenue.toLocaleString()}</div>
                        <div className="text-muted-foreground">{promotion.customers} customers</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(promotion.status)}>{promotion.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(promotion.startDate).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">
                          to {new Date(promotion.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedPromotion(promotion)
                              setIsViewOpen(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedPromotion(promotion)
                              setIsEditOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setSelectedPromotion(promotion)
                              setIsDeleteOpen(true)
                            }}
                          >
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
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, promotions.length)} of {promotions.length} promotions
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

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Promotion Details & Results</DialogTitle>
            <DialogDescription>View detailed information and performance metrics for this promotion.</DialogDescription>
          </DialogHeader>
          {selectedPromotion && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Promotion Name</Label>
                    <p className="text-lg font-semibold">{selectedPromotion.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                    <p className="text-sm">{selectedPromotion.description}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Promotion Code</Label>
                    <code className="bg-muted px-2 py-1 rounded text-sm">{selectedPromotion.code}</code>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Discount</Label>
                    <p className="text-lg font-semibold">
                      {selectedPromotion.type === "percentage"
                        ? `${selectedPromotion.value}%`
                        : `$${selectedPromotion.value}`}{" "}
                      off
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                    <div className="mt-1">
                      <Badge variant={getStatusColor(selectedPromotion.status)}>{selectedPromotion.status}</Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Active Period</Label>
                    <p className="text-sm">
                      {new Date(selectedPromotion.startDate).toLocaleDateString()} -{" "}
                      {new Date(selectedPromotion.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Usage Limit</Label>
                    <p className="text-sm">{selectedPromotion.limit} uses maximum</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-lg font-semibold mb-4">Performance Results</h4>
                <div className="grid grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="px-4 py-4">
                      <div className="text-center space-y-1">
                        <p className="text-xl font-bold text-blue-600">{selectedPromotion.used}</p>
                        <p className="text-sm text-muted-foreground">Times Used</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="px-4 py-4">
                      <div className="text-center space-y-1">
                        <p className="text-xl font-bold text-green-600">
                          {Math.round((selectedPromotion.used / selectedPromotion.limit) * 100)}%
                        </p>
                        <p className="text-sm text-muted-foreground">Usage Rate</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="px-4 py-4">
                      <div className="text-center space-y-1">
                        <p className="text-xl font-bold text-purple-600">
                          ${selectedPromotion.revenue.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Revenue Generated</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="px-4 py-4">
                      <div className="text-center space-y-1">
                        <p className="text-xl font-bold text-orange-600">{selectedPromotion.customers}</p>
                        <p className="text-sm text-muted-foreground">Customers Reached</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Promotion</DialogTitle>
            <DialogDescription>Update the promotion details and settings.</DialogDescription>
          </DialogHeader>
          {selectedPromotion && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Promotion Name</Label>
                  <Input id="edit-name" defaultValue={selectedPromotion.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-code">Promotion Code</Label>
                  <Input id="edit-code" defaultValue={selectedPromotion.code} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea id="edit-description" defaultValue={selectedPromotion.description} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Discount Type</Label>
                  <Select defaultValue={selectedPromotion.type}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-value">Discount Value</Label>
                  <Input id="edit-value" type="number" defaultValue={selectedPromotion.value} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-limit">Usage Limit</Label>
                  <Input id="edit-limit" type="number" defaultValue={selectedPromotion.limit} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-startDate">Start Date</Label>
                  <Input id="edit-startDate" type="date" defaultValue={selectedPromotion.startDate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-endDate">End Date</Label>
                  <Input id="edit-endDate" type="date" defaultValue={selectedPromotion.endDate} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPromotion}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Promotion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedPromotion?.name}"? This action cannot be undone and will
              permanently remove the promotion and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePromotion}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Promotion
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
