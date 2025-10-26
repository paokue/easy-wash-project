"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Bell,
  Settings,
  Shield,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Users,
  Key,
  Search,
} from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function RoleManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const roles = [
    {
      id: 1,
      name: "Manager",
      description: "Full access to all system features and staff management",
      staffCount: 3,
      permissions: [
        "View Dashboard",
        "Manage Orders",
        "Manage Staff",
        "View Reports",
        "Manage Customers",
        "System Settings",
        "Financial Data",
        "User Management",
      ],
      color: "bg-purple-100 text-purple-800",
      createdDate: "Jan 2024",
    },
    {
      id: 2,
      name: "Washer",
      description: "Access to washing operations and order management",
      staffCount: 8,
      permissions: ["View Dashboard", "Manage Orders", "Update Order Status", "View Customer Info"],
      color: "bg-blue-100 text-blue-800",
      createdDate: "Jan 2024",
    },
    {
      id: 3,
      name: "Driver",
      description: "Access to delivery operations and route management",
      staffCount: 5,
      permissions: [
        "View Dashboard",
        "View Orders",
        "Update Delivery Status",
        "View Customer Addresses",
        "Route Planning",
      ],
      color: "bg-green-100 text-green-800",
      createdDate: "Jan 2024",
    },
    {
      id: 4,
      name: "Customer Service",
      description: "Handle customer inquiries and basic order management",
      staffCount: 4,
      permissions: ["View Dashboard", "View Orders", "Manage Customers", "Handle Complaints", "Basic Reports"],
      color: "bg-orange-100 text-orange-800",
      createdDate: "Feb 2024",
    },
    {
      id: 5,
      name: "Folder",
      description: "Access to folding operations and quality control",
      staffCount: 6,
      permissions: ["View Dashboard", "View Orders", "Update Order Status", "Quality Control"],
      color: "bg-pink-100 text-pink-800",
      createdDate: "Jan 2024",
    },
    {
      id: 6,
      name: "Maintenance",
      description: "Equipment maintenance and technical support access",
      staffCount: 2,
      permissions: ["View Dashboard", "Equipment Management", "Maintenance Reports", "Technical Settings"],
      color: "bg-gray-100 text-gray-800",
      createdDate: "Mar 2024",
    },
  ]

  const allPermissions = [
    "View Dashboard",
    "Manage Orders",
    "Manage Staff",
    "View Reports",
    "Manage Customers",
    "System Settings",
    "Financial Data",
    "User Management",
    "Update Order Status",
    "View Customer Info",
    "View Customer Addresses",
    "Route Planning",
    "Handle Complaints",
    "Basic Reports",
    "Quality Control",
    "Equipment Management",
    "Maintenance Reports",
    "Technical Settings",
  ]

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewRole = (role: any) => {
    setSelectedRole(role)
    setIsViewDialogOpen(true)
  }

  const handleEditRole = (role: any) => {
    setSelectedRole(role)
    setIsEditDialogOpen(true)
  }

  const handleDeleteRole = (role: any) => {
    setSelectedRole(role)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/shop/staff" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xl font-semibold text-foreground">Role Management</span>
                  <p className="text-xs text-muted-foreground">Manage roles and permissions</p>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Roles</p>
                  <p className="text-2xl font-bold">{roles.length}</p>
                  <p className="text-xs text-primary">Active roles</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Staff</p>
                  <p className="text-2xl font-bold">{roles.reduce((sum, role) => sum + role.staffCount, 0)}</p>
                  <p className="text-xs text-primary">Assigned to roles</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Permissions</p>
                  <p className="text-2xl font-bold">{allPermissions.length}</p>
                  <p className="text-xs text-primary">Available permissions</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Key className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Filters and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
                className="pl-10 w-64 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Role
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                  <DialogDescription>Define a new role with specific permissions for your staff.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="role-name">Role Name</Label>
                    <Input id="role-name" placeholder="Enter role name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role-description">Description</Label>
                    <Textarea id="role-description" placeholder="Describe the role responsibilities" />
                  </div>
                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                      {allPermissions.map((permission, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox id={`perm-${index}`} />
                          <Label htmlFor={`perm-${index}`} className="text-sm">
                            {permission}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Create Role</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Roles Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Staff Count</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${role.color.split(" ")[0]}`} />
                          <div>
                            <p className="font-medium text-sm">{role.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground max-w-xs truncate">{role.description}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{role.staffCount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Key className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{role.permissions.length}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{role.createdDate}</span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewRole(role)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditRole(role)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteRole(role)} className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Role
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
        </div>
      </div>

      {/* View Role Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Role Details</DialogTitle>
            <DialogDescription>Complete information about the {selectedRole?.name} role</DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedRole.color.split(" ")[0]}`}
                >
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedRole.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedRole.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium">Role Information</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Staff Count:</span>
                      <span className="font-medium">{selectedRole.staffCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Permissions:</span>
                      <span className="font-medium">{selectedRole.permissions.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Created:</span>
                      <span className="font-medium">{selectedRole.createdDate}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Permissions</Label>
                  <div className="mt-2 max-h-48 overflow-y-auto">
                    <div className="space-y-1">
                      {selectedRole.permissions.map((permission: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span>{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsViewDialogOpen(false)
                handleEditRole(selectedRole)
              }}
            >
              Edit Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>Update the {selectedRole?.name} role settings and permissions</DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-role-name">Role Name</Label>
                <Input id="edit-role-name" defaultValue={selectedRole.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role-description">Description</Label>
                <Textarea id="edit-role-description" defaultValue={selectedRole.description} />
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                  {allPermissions.map((permission, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-perm-${index}`}
                        defaultChecked={selectedRole.permissions.includes(permission)}
                      />
                      <Label htmlFor={`edit-perm-${index}`} className="text-sm">
                        {permission}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the {selectedRole?.name} role? This will affect {selectedRole?.staffCount}{" "}
              staff members. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
              Delete Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
