"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Plus, Search, MoreVertical, Eye, Edit, Trash2, Users, Lock, Unlock, Settings } from "lucide-react"

export default function RolesPermissionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // Available permissions
  const availablePermissions = [
    { id: "shop_management", name: "Shop Management", description: "Create, edit, and manage shops" },
    { id: "customer_management", name: "Customer Management", description: "View and manage customer accounts" },
    { id: "order_management", name: "Order Management", description: "View, edit, and process orders" },
    {
      id: "transaction_management",
      name: "Transaction Management",
      description: "View and manage financial transactions",
    },
    { id: "staff_management", name: "Staff Management", description: "Manage staff accounts and permissions" },
    { id: "role_management", name: "Role Management", description: "Create and manage user roles" },
    { id: "promotion_management", name: "Promotion Management", description: "Create and manage promotions" },
    { id: "analytics_view", name: "Analytics View", description: "View system analytics and reports" },
    { id: "system_settings", name: "System Settings", description: "Modify system configuration" },
    { id: "database_management", name: "Database Management", description: "Access database management tools" },
    { id: "integration_management", name: "Integration Management", description: "Manage third-party integrations" },
    { id: "content_moderation", name: "Content Moderation", description: "Moderate user-generated content" },
  ]

  // Mock data for roles
  const roles = [
    {
      id: 1,
      name: "Super Admin",
      description: "Full system access with all permissions",
      permissions: availablePermissions.map((p) => p.id),
      userCount: 1,
      isSystem: true,
      createdDate: "2023-01-15",
      lastModified: "2023-01-15",
    },
    {
      id: 2,
      name: "Admin",
      description: "Administrative access to most system functions",
      permissions: [
        "shop_management",
        "customer_management",
        "order_management",
        "transaction_management",
        "promotion_management",
        "analytics_view",
      ],
      userCount: 3,
      isSystem: false,
      createdDate: "2023-01-20",
      lastModified: "2024-01-15",
    },
    {
      id: 3,
      name: "Support Agent",
      description: "Customer support with limited access",
      permissions: ["customer_management", "order_management", "content_moderation"],
      userCount: 5,
      isSystem: false,
      createdDate: "2023-02-10",
      lastModified: "2023-12-20",
    },
    {
      id: 4,
      name: "Analyst",
      description: "Read-only access to analytics and reports",
      permissions: ["analytics_view"],
      userCount: 2,
      isSystem: false,
      createdDate: "2023-03-05",
      lastModified: "2023-11-30",
    },
    {
      id: 5,
      name: "Shop Manager",
      description: "Manage specific shops and their operations",
      permissions: ["shop_management", "customer_management", "order_management", "promotion_management"],
      userCount: 8,
      isSystem: false,
      createdDate: "2023-04-12",
      lastModified: "2024-01-10",
    },
  ]

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewRole = (role: any) => {
    setSelectedRole(role)
    setIsViewOpen(true)
  }

  const handleEditRole = (role: any) => {
    setSelectedRole(role)
    setIsEditOpen(true)
  }

  const handleDeleteRole = (role: any) => {
    setSelectedRole(role)
    setIsDeleteOpen(true)
  }

  const getPermissionName = (permissionId: string) => {
    const permission = availablePermissions.find((p) => p.id === permissionId)
    return permission ? permission.name : permissionId
  }

  const totalRoles = roles.length
  const systemRoles = roles.filter((r) => r.isSystem).length
  const customRoles = roles.filter((r) => !r.isSystem).length
  const totalUsers = roles.reduce((sum, role) => sum + role.userCount, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage user roles and their access permissions</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roleName">Role Name</Label>
                  <Input id="roleName" placeholder="Enter role name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roleDescription">Description</Label>
                  <Textarea id="roleDescription" placeholder="Enter role description" />
                </div>
              </div>
              <div className="space-y-4">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-2">
                      <Checkbox id={permission.id} />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={permission.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {permission.name}
                        </label>
                        <p className="text-xs text-muted-foreground">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Create Role</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRoles}</div>
            <p className="text-xs text-muted-foreground">Active roles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Roles</CardTitle>
            <Lock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemRoles}</div>
            <p className="text-xs text-muted-foreground">Built-in roles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
            <Settings className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customRoles}</div>
            <p className="text-xs text-muted-foreground">User-created roles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Assigned to roles</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <Card key={role.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                  {role.isSystem && (
                    <Badge variant="secondary" className="text-xs">
                      <Lock className="h-3 w-3 mr-1" />
                      System
                    </Badge>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewRole(role)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    {!role.isSystem && (
                      <>
                        <DropdownMenuItem onClick={() => handleEditRole(role)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteRole(role)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Role
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{role.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Users:</span>
                  <Badge variant="outline">{role.userCount}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Permissions:</span>
                  <Badge variant="outline">{role.permissions.length}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Key Permissions:</div>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.slice(0, 3).map((permissionId) => (
                    <Badge key={permissionId} variant="secondary" className="text-xs">
                      {getPermissionName(permissionId)}
                    </Badge>
                  ))}
                  {role.permissions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{role.permissions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="text-xs text-muted-foreground pt-2 border-t">Created: {role.createdDate}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Role Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span>Role Details - {selectedRole?.name}</span>
              {selectedRole?.isSystem && (
                <Badge variant="secondary">
                  <Lock className="h-3 w-3 mr-1" />
                  System Role
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedRole && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Role Information</h3>
                  <div className="space-y-2">
                    <div>
                      <strong>Name:</strong> {selectedRole.name}
                    </div>
                    <div>
                      <strong>Description:</strong> {selectedRole.description}
                    </div>
                    <div>
                      <strong>Users Assigned:</strong> {selectedRole.userCount}
                    </div>
                    <div>
                      <strong>Created:</strong> {selectedRole.createdDate}
                    </div>
                    <div>
                      <strong>Last Modified:</strong> {selectedRole.lastModified}
                    </div>
                    <div>
                      <strong>Type:</strong> {selectedRole.isSystem ? "System Role" : "Custom Role"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Permissions ({selectedRole.permissions.length})</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedRole.permissions.map((permissionId: string) => {
                      const permission = availablePermissions.find((p) => p.id === permissionId)
                      return (
                        <div key={permissionId} className="flex items-start space-x-2 p-2 bg-muted rounded">
                          <Unlock className="h-4 w-4 text-green-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-sm">{permission?.name || permissionId}</div>
                            <div className="text-xs text-muted-foreground">{permission?.description}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Role - {selectedRole?.name}</DialogTitle>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editRoleName">Role Name</Label>
                  <Input id="editRoleName" defaultValue={selectedRole.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editRoleDescription">Description</Label>
                  <Textarea id="editRoleDescription" defaultValue={selectedRole.description} />
                </div>
              </div>
              <div className="space-y-4">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={`edit-${permission.id}`}
                        defaultChecked={selectedRole.permissions.includes(permission.id)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={`edit-${permission.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {permission.name}
                        </label>
                        <p className="text-xs text-muted-foreground">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
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

      {/* Delete Role Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the role "{selectedRole?.name}"?</p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="space-y-2">
                <div>
                  <strong>Users affected:</strong> {selectedRole?.userCount}
                </div>
                <div>
                  <strong>Permissions:</strong> {selectedRole?.permissions.length}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This action cannot be undone. Users with this role will lose their permissions.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteOpen(false)}>
              Delete Role
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
