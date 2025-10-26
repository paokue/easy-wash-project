"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Phone,
  Building,
} from "lucide-react"

export default function AdminStaffPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStaff, setSelectedStaff] = useState<any>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // Mock data for staff members
  const staff = [
    {
      id: 1,
      name: "John Admin",
      email: "john.admin@easywash.com",
      phone: "+1 234-567-8901",
      role: "super_admin",
      status: "active",
      department: "Administration",
      joinDate: "2023-01-15",
      lastLogin: "2024-01-21 14:30",
      permissions: ["all"],
      assignedShops: ["All Shops"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Manager",
      email: "sarah.manager@easywash.com",
      phone: "+1 234-567-8902",
      role: "admin",
      status: "active",
      department: "Operations",
      joinDate: "2023-03-22",
      lastLogin: "2024-01-21 10:15",
      permissions: ["shop_management", "customer_management", "order_management"],
      assignedShops: ["Downtown Laundry", "Westside Wash"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Mike Support",
      email: "mike.support@easywash.com",
      phone: "+1 234-567-8903",
      role: "support",
      status: "active",
      department: "Customer Support",
      joinDate: "2023-06-10",
      lastLogin: "2024-01-21 16:45",
      permissions: ["customer_management", "order_view"],
      assignedShops: ["Express Clean"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Lisa Analyst",
      email: "lisa.analyst@easywash.com",
      phone: "+1 234-567-8904",
      role: "analyst",
      status: "inactive",
      department: "Analytics",
      joinDate: "2023-08-05",
      lastLogin: "2024-01-15 09:20",
      permissions: ["analytics_view", "reports"],
      assignedShops: ["All Shops"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Tom Moderator",
      email: "tom.moderator@easywash.com",
      phone: "+1 234-567-8905",
      role: "moderator",
      status: "suspended",
      department: "Content Moderation",
      joinDate: "2023-09-12",
      lastLogin: "2024-01-10 12:00",
      permissions: ["content_moderation", "user_management"],
      assignedShops: ["Downtown Laundry"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleViewStaff = (member: any) => {
    setSelectedStaff(member)
    setIsViewOpen(true)
  }

  const handleEditStaff = (member: any) => {
    setSelectedStaff(member)
    setIsEditOpen(true)
  }

  const handleDeleteStaff = (member: any) => {
    setSelectedStaff(member)
    setIsDeleteOpen(true)
  }

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin"
      case "admin":
        return "Admin"
      case "support":
        return "Support"
      case "analyst":
        return "Analyst"
      case "moderator":
        return "Moderator"
      default:
        return role
    }
  }

  const getRoleVariant = (role: string) => {
    switch (role) {
      case "super_admin":
        return "destructive"
      case "admin":
        return "default"
      case "support":
        return "secondary"
      case "analyst":
        return "outline"
      case "moderator":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "suspended":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const totalStaff = staff.length
  const activeStaff = staff.filter((s) => s.status === "active").length
  const adminStaff = staff.filter((s) => s.role === "admin" || s.role === "super_admin").length
  const suspendedStaff = staff.filter((s) => s.status === "suspended").length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Staff Management</h1>
          <p className="text-muted-foreground">Manage administrative staff and their permissions</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="staffName">Full Name</Label>
                <Input id="staffName" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staffEmail">Email</Label>
                <Input id="staffEmail" type="email" placeholder="Enter email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staffPhone">Phone</Label>
                <Input id="staffPhone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staffRole">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="staffDepartment">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Customer Support">Customer Support</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Content Moderation">Content Moderation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="staffStatus">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Create Staff Member</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStaff}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStaff}</div>
            <p className="text-xs text-muted-foreground">{Math.round((activeStaff / totalStaff) * 100)}% active rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Level</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStaff}</div>
            <p className="text-xs text-muted-foreground">Admin & Super Admin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suspendedStaff}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
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
                placeholder="Search staff members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="analyst">Analyst</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Staff Members ({filteredStaff.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Staff Member</th>
                  <th className="text-left p-4">Contact Info</th>
                  <th className="text-left p-4">Role & Department</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Last Login</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          className="w-10 h-10 rounded-full bg-muted"
                        />
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">ID: #{member.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="text-sm flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {member.email}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {member.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <Badge variant={getRoleVariant(member.role)}>{getRoleDisplay(member.role)}</Badge>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Building className="h-3 w-3 mr-1" />
                          {member.department}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={getStatusVariant(member.status)}>{member.status}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{member.lastLogin}</div>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewStaff(member)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditStaff(member)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Staff
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteStaff(member)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Staff
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

      {/* View Staff Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Staff Member Details</DialogTitle>
          </DialogHeader>
          {selectedStaff && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedStaff.avatar || "/placeholder.svg"}
                    alt={selectedStaff.name}
                    className="w-16 h-16 rounded-full bg-muted"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{selectedStaff.name}</h3>
                    <p className="text-muted-foreground">{selectedStaff.email}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <div className="space-y-2">
                    <div>
                      <strong>Phone:</strong> {selectedStaff.phone}
                    </div>
                    <div>
                      <strong>Join Date:</strong> {selectedStaff.joinDate}
                    </div>
                    <div>
                      <strong>Last Login:</strong> {selectedStaff.lastLogin}
                    </div>
                    <div>
                      <strong>Department:</strong> {selectedStaff.department}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Role & Permissions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <strong className="mr-2">Role:</strong>
                      <Badge variant={getRoleVariant(selectedStaff.role)}>{getRoleDisplay(selectedStaff.role)}</Badge>
                    </div>
                    <div className="flex items-center">
                      <strong className="mr-2">Status:</strong>
                      <Badge variant={getStatusVariant(selectedStaff.status)}>{selectedStaff.status}</Badge>
                    </div>
                    <div>
                      <strong>Permissions:</strong>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedStaff.permissions.map((permission: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission.replace("_", " ")}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      <strong>Assigned Shops:</strong>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedStaff.assignedShops.map((shop: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {shop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Staff Member</DialogTitle>
          </DialogHeader>
          {selectedStaff && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editStaffName">Full Name</Label>
                <Input id="editStaffName" defaultValue={selectedStaff.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStaffEmail">Email</Label>
                <Input id="editStaffEmail" defaultValue={selectedStaff.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStaffPhone">Phone</Label>
                <Input id="editStaffPhone" defaultValue={selectedStaff.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStaffRole">Role</Label>
                <Select defaultValue={selectedStaff.role}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStaffDepartment">Department</Label>
                <Select defaultValue={selectedStaff.department}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Customer Support">Customer Support</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Content Moderation">Content Moderation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStaffStatus">Status</Label>
                <Select defaultValue={selectedStaff.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
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

      {/* Delete Staff Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Staff Member</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to remove {selectedStaff?.name} from the staff?</p>
            <p className="text-sm text-muted-foreground mt-2">
              This will revoke all access permissions and cannot be undone. Consider suspending the account instead.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteOpen(false)}>
              Remove Staff Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
