"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tag, Plus, Search, Filter, MoreVertical, Eye, Edit, Trash2, Calendar, Gift, Users } from "lucide-react"

export default function GlobalPromotionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // Mock data for promotions
  const promotions = [
    {
      id: 1,
      name: "New Year Special",
      description: "20% off all services for new customers",
      type: "percentage",
      value: 20,
      code: "NEWYEAR2024",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      usageLimit: 1000,
      usageCount: 245,
      minOrderValue: 25,
      applicableShops: ["All Shops"],
      createdDate: "2023-12-15",
      createdBy: "John Admin",
    },
    {
      id: 2,
      name: "First Time Customer",
      description: "$10 off first order",
      type: "fixed",
      value: 10,
      code: "WELCOME10",
      status: "active",
      startDate: "2023-01-01",
      endDate: "2024-12-31",
      usageLimit: null,
      usageCount: 1250,
      minOrderValue: 30,
      applicableShops: ["All Shops"],
      createdDate: "2023-01-01",
      createdBy: "Sarah Manager",
    },
    {
      id: 3,
      name: "Weekend Rush",
      description: "15% off weekend orders",
      type: "percentage",
      value: 15,
      code: "WEEKEND15",
      status: "scheduled",
      startDate: "2024-02-01",
      endDate: "2024-02-29",
      usageLimit: 500,
      usageCount: 0,
      minOrderValue: 20,
      applicableShops: ["Downtown Laundry", "Westside Wash"],
      createdDate: "2024-01-15",
      createdBy: "Mike Support",
    },
    {
      id: 4,
      name: "Summer Sale",
      description: "25% off dry cleaning services",
      type: "percentage",
      value: 25,
      code: "SUMMER25",
      status: "expired",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      usageLimit: 2000,
      usageCount: 1850,
      minOrderValue: 40,
      applicableShops: ["Express Clean"],
      createdDate: "2023-05-15",
      createdBy: "Lisa Analyst",
    },
    {
      id: 5,
      name: "Loyalty Reward",
      description: "$5 off for returning customers",
      type: "fixed",
      value: 5,
      code: "LOYAL5",
      status: "paused",
      startDate: "2023-03-01",
      endDate: "2024-03-01",
      usageLimit: 5000,
      usageCount: 3200,
      minOrderValue: 15,
      applicableShops: ["All Shops"],
      createdDate: "2023-02-20",
      createdBy: "John Admin",
    },
  ]

  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch =
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || promotion.status === statusFilter
    const matchesType = typeFilter === "all" || promotion.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleViewPromotion = (promotion: any) => {
    setSelectedPromotion(promotion)
    setIsViewOpen(true)
  }

  const handleEditPromotion = (promotion: any) => {
    setSelectedPromotion(promotion)
    setIsEditOpen(true)
  }

  const handleDeletePromotion = (promotion: any) => {
    setSelectedPromotion(promotion)
    setIsDeleteOpen(true)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "scheduled":
        return "secondary"
      case "expired":
        return "outline"
      case "paused":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getTypeDisplay = (type: string) => {
    return type === "percentage" ? "Percentage" : "Fixed Amount"
  }

  const getValueDisplay = (promotion: any) => {
    return promotion.type === "percentage" ? `${promotion.value}%` : `$${promotion.value}`
  }

  const totalPromotions = promotions.length
  const activePromotions = promotions.filter((p) => p.status === "active").length
  const totalUsage = promotions.reduce((sum, p) => sum + p.usageCount, 0)
  const scheduledPromotions = promotions.filter((p) => p.status === "scheduled").length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Global Promotions Management</h1>
          <p className="text-muted-foreground">Create and manage promotional campaigns across all shops</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Promotion
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Promotion</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="promoName">Promotion Name</Label>
                <Input id="promoName" placeholder="Enter promotion name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="promoCode">Promo Code</Label>
                <Input id="promoCode" placeholder="Enter promo code" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="promoDescription">Description</Label>
                <Textarea id="promoDescription" placeholder="Enter promotion description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="promoType">Discount Type</Label>
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
                <Label htmlFor="promoValue">Discount Value</Label>
                <Input id="promoValue" type="number" placeholder="Enter value" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input id="usageLimit" type="number" placeholder="Leave empty for unlimited" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minOrderValue">Min Order Value</Label>
                <Input id="minOrderValue" type="number" placeholder="Minimum order amount" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="applicableShops">Applicable Shops</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shops" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Shops</SelectItem>
                    <SelectItem value="downtown">Downtown Laundry</SelectItem>
                    <SelectItem value="westside">Westside Wash</SelectItem>
                    <SelectItem value="express">Express Clean</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Create Promotion</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Promotions</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPromotions}</div>
            <p className="text-xs text-muted-foreground">All campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
            <Gift className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePromotions}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Times used</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledPromotions}</div>
            <p className="text-xs text-muted-foreground">Upcoming campaigns</p>
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
                placeholder="Search promotions..."
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
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Promotions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Promotions ({filteredPromotions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Promotion Details</th>
                  <th className="text-left p-4">Discount</th>
                  <th className="text-left p-4">Usage</th>
                  <th className="text-left p-4">Duration</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPromotions.map((promotion) => (
                  <tr key={promotion.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{promotion.name}</div>
                        <div className="text-sm text-muted-foreground">Code: {promotion.code}</div>
                        <div className="text-sm text-muted-foreground">{promotion.description}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-medium">{getValueDisplay(promotion)}</div>
                        <div className="text-sm text-muted-foreground">{getTypeDisplay(promotion.type)}</div>
                        <div className="text-sm text-muted-foreground">Min: ${promotion.minOrderValue}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-medium">{promotion.usageCount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {promotion.usageLimit ? `/ ${promotion.usageLimit.toLocaleString()}` : "/ Unlimited"}
                        </div>
                        {promotion.usageLimit && (
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{
                                width: `${Math.min((promotion.usageCount / promotion.usageLimit) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="text-sm">{promotion.startDate}</div>
                        <div className="text-sm text-muted-foreground">to</div>
                        <div className="text-sm">{promotion.endDate}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={getStatusVariant(promotion.status)}>{promotion.status}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewPromotion(promotion)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditPromotion(promotion)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Promotion
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeletePromotion(promotion)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Promotion
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

      {/* View Promotion Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Promotion Details - {selectedPromotion?.name}</DialogTitle>
          </DialogHeader>
          {selectedPromotion && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <div className="space-y-2">
                    <div>
                      <strong>Name:</strong> {selectedPromotion.name}
                    </div>
                    <div>
                      <strong>Code:</strong> {selectedPromotion.code}
                    </div>
                    <div>
                      <strong>Description:</strong> {selectedPromotion.description}
                    </div>
                    <div>
                      <strong>Type:</strong> {getTypeDisplay(selectedPromotion.type)}
                    </div>
                    <div>
                      <strong>Discount:</strong> {getValueDisplay(selectedPromotion)}
                    </div>
                    <div>
                      <strong>Min Order Value:</strong> ${selectedPromotion.minOrderValue}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Applicable Shops</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedPromotion.applicableShops.map((shop: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {shop}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Campaign Details</h3>
                  <div className="space-y-2">
                    <div>
                      <strong>Start Date:</strong> {selectedPromotion.startDate}
                    </div>
                    <div>
                      <strong>End Date:</strong> {selectedPromotion.endDate}
                    </div>
                    <div className="flex items-center">
                      <strong className="mr-2">Status:</strong>
                      <Badge variant={getStatusVariant(selectedPromotion.status)}>{selectedPromotion.status}</Badge>
                    </div>
                    <div>
                      <strong>Created:</strong> {selectedPromotion.createdDate}
                    </div>
                    <div>
                      <strong>Created By:</strong> {selectedPromotion.createdBy}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Usage Statistics</h3>
                  <div className="space-y-2">
                    <div>
                      <strong>Times Used:</strong> {selectedPromotion.usageCount.toLocaleString()}
                    </div>
                    <div>
                      <strong>Usage Limit:</strong>{" "}
                      {selectedPromotion.usageLimit ? selectedPromotion.usageLimit.toLocaleString() : "Unlimited"}
                    </div>
                    {selectedPromotion.usageLimit && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>
                            {Math.round((selectedPromotion.usageCount / selectedPromotion.usageLimit) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${Math.min((selectedPromotion.usageCount / selectedPromotion.usageLimit) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Promotion Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Promotion - {selectedPromotion?.name}</DialogTitle>
          </DialogHeader>
          {selectedPromotion && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editPromoName">Promotion Name</Label>
                <Input id="editPromoName" defaultValue={selectedPromotion.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editPromoCode">Promo Code</Label>
                <Input id="editPromoCode" defaultValue={selectedPromotion.code} />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="editPromoDescription">Description</Label>
                <Textarea id="editPromoDescription" defaultValue={selectedPromotion.description} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editPromoType">Discount Type</Label>
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
                <Label htmlFor="editPromoValue">Discount Value</Label>
                <Input id="editPromoValue" type="number" defaultValue={selectedPromotion.value} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStartDate">Start Date</Label>
                <Input id="editStartDate" type="date" defaultValue={selectedPromotion.startDate} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editEndDate">End Date</Label>
                <Input id="editEndDate" type="date" defaultValue={selectedPromotion.endDate} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editUsageLimit">Usage Limit</Label>
                <Input
                  id="editUsageLimit"
                  type="number"
                  defaultValue={selectedPromotion.usageLimit || ""}
                  placeholder="Leave empty for unlimited"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editMinOrderValue">Min Order Value</Label>
                <Input id="editMinOrderValue" type="number" defaultValue={selectedPromotion.minOrderValue} />
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

      {/* Delete Promotion Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Promotion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the promotion "{selectedPromotion?.name}"?</p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="space-y-2">
                <div>
                  <strong>Code:</strong> {selectedPromotion?.code}
                </div>
                <div>
                  <strong>Times Used:</strong> {selectedPromotion?.usageCount.toLocaleString()}
                </div>
                <div>
                  <strong>Status:</strong> {selectedPromotion?.status}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This action cannot be undone. The promotion code will no longer be valid.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteOpen(false)}>
              Delete Promotion
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
