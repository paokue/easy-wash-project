"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
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
import {
  Users,
  Search,
  Plus,
  ArrowLeft,
  Bell,
  Settings,
  Star,
  Clock,
  Phone,
  Mail,
  UserCheck,
  Shield,
  Key,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Settings2,
} from "lucide-react"
import Link from "next/link"

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStaff, setSelectedStaff] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const staff = [
    {
      id: 1,
      name: "Sarah Wilson",
      email: "sarah.wilson@easywash.com",
      phone: "(555) 111-2222",
      role: "Manager",
      department: "Operations",
      shift: "Morning (6AM-2PM)",
      status: "active",
      orders: 12,
      rating: 4.9,
      experience: "3 years",
      salary: "$45,000",
      joinDate: "Jan 2022",
      address: "123 Manager St, City",
      skills: ["Leadership", "Customer Service", "Quality Control"],
      performance: 95,
      attendance: 98,
      lastActive: "Currently online",
    },
    {
      id: 2,
      name: "David Chen",
      email: "david.chen@easywash.com",
      phone: "(555) 333-4444",
      role: "Washer",
      department: "Production",
      shift: "Morning (7AM-3PM)",
      status: "active",
      orders: 8,
      rating: 4.7,
      experience: "2 years",
      salary: "$32,000",
      joinDate: "Mar 2023",
      address: "456 Worker Ave, City",
      skills: ["Machine Operation", "Fabric Care", "Time Management"],
      performance: 88,
      attendance: 95,
      lastActive: "2 hours ago",
    },
    {
      id: 3,
      name: "Maria Garcia",
      email: "maria.garcia@easywash.com",
      phone: "(555) 555-6666",
      role: "Driver",
      department: "Delivery",
      shift: "Afternoon (12PM-8PM)",
      status: "on-route",
      orders: 6,
      rating: 4.8,
      experience: "1.5 years",
      salary: "$28,000",
      joinDate: "Aug 2023",
      address: "789 Driver Rd, City",
      skills: ["Safe Driving", "Customer Relations", "Route Planning"],
      performance: 92,
      attendance: 97,
      lastActive: "Currently on delivery",
    },
    {
      id: 4,
      name: "James Brown",
      email: "james.brown@easywash.com",
      phone: "(555) 777-8888",
      role: "Folder",
      department: "Production",
      shift: "Evening (2PM-10PM)",
      status: "break",
      orders: 15,
      rating: 4.6,
      experience: "4 years",
      salary: "$30,000",
      joinDate: "Sep 2021",
      address: "321 Folder Ln, City",
      skills: ["Precision Folding", "Quality Check", "Efficiency"],
      performance: 85,
      attendance: 92,
      lastActive: "On break (returns 3:30 PM)",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.anderson@easywash.com",
      phone: "(555) 999-0000",
      role: "Customer Service",
      department: "Front Desk",
      shift: "Full Day (9AM-5PM)",
      status: "active",
      orders: 0,
      rating: 4.9,
      experience: "2.5 years",
      salary: "$35,000",
      joinDate: "Feb 2022",
      address: "654 Service St, City",
      skills: ["Communication", "Problem Solving", "POS Systems"],
      performance: 96,
      attendance: 99,
      lastActive: "Currently online",
    },
    {
      id: 6,
      name: "Robert Kim",
      email: "robert.kim@easywash.com",
      phone: "(555) 222-3333",
      role: "Maintenance",
      department: "Technical",
      shift: "Morning (5AM-1PM)",
      status: "off-duty",
      orders: 0,
      rating: 4.5,
      experience: "5 years",
      salary: "$38,000",
      joinDate: "Nov 2020",
      address: "987 Tech Ave, City",
      skills: ["Machine Repair", "Preventive Maintenance", "Troubleshooting"],
      performance: 90,
      attendance: 94,
      lastActive: "Yesterday 1:00 PM",
    },
  ]

  const stats = [
    { title: "Total Staff", value: "24", change: "+2", icon: Users, color: "text-blue-600" },
    { title: "Active Now", value: "18", change: "+1", icon: UserCheck, color: "text-green-600" },
    { title: "Total Role", value: "6", change: "0", icon: Shield, color: "text-purple-600" },
    { title: "Total Permission", value: "12", change: "+1", icon: Key, color: "text-orange-600" },
  ]

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery)
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "on-route":
        return "secondary"
      case "break":
        return "outline"
      case "off-duty":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleViewStaff = (member: any) => {
    setSelectedStaff(member)
    setIsViewDialogOpen(true)
  }

  const handleEditStaff = (member: any) => {
    setSelectedStaff(member)
    setIsEditDialogOpen(true)
  }

  const handleDeleteStaff = (member: any) => {
    setSelectedStaff(member)
    setIsDeleteDialogOpen(true)
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
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-lg font-semibold text-foreground">Staff Management</span>
                  <p className="text-xs text-muted-foreground">Manage your team and roles</p>
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
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="px-6 py-1">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-lg font-bold">{stat.value}</p>
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
                    placeholder="Search staff members..."
                    className="pl-10 w-64 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-40 text-sm">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Washer">Washer</SelectItem>
                    <SelectItem value="Driver">Driver</SelectItem>
                    <SelectItem value="Folder">Folder</SelectItem>
                    <SelectItem value="Customer Service">Customer Service</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 text-sm">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-route">On Route</SelectItem>
                    <SelectItem value="break">On Break</SelectItem>
                    <SelectItem value="off-duty">Off Duty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/shop/staff/roles">
                  <Button variant="outline" size="sm">
                    <Settings2 className="w-4 h-4 mr-2" />
                    Manage Role
                  </Button>
                </Link>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Staff
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Staff Member</DialogTitle>
                      <DialogDescription>Fill in the details to add a new staff member to your team.</DialogDescription>
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
                        <Label htmlFor="role">Role</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="Washer">Washer</SelectItem>
                            <SelectItem value="Driver">Driver</SelectItem>
                            <SelectItem value="Folder">Folder</SelectItem>
                            <SelectItem value="Customer Service">Customer Service</SelectItem>
                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Operations">Operations</SelectItem>
                            <SelectItem value="Production">Production</SelectItem>
                            <SelectItem value="Delivery">Delivery</SelectItem>
                            <SelectItem value="Front Desk">Front Desk</SelectItem>
                            <SelectItem value="Technical">Technical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shift">Shift</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select shift" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Morning (6AM-2PM)">Morning (6AM-2PM)</SelectItem>
                            <SelectItem value="Afternoon (12PM-8PM)">Afternoon (12PM-8PM)</SelectItem>
                            <SelectItem value="Evening (2PM-10PM)">Evening (2PM-10PM)</SelectItem>
                            <SelectItem value="Full Day (9AM-5PM)">Full Day (9AM-5PM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="Enter address" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary">Salary</Label>
                        <Input id="salary" placeholder="Enter salary" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience</Label>
                        <Input id="experience" placeholder="Enter experience" />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="skills">Skills (comma separated)</Label>
                        <Textarea id="skills" placeholder="Enter skills separated by commas" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddDialogOpen(false)}>Add Staff Member</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Role & Department</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="text-sm">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">Joined {member.joinDate}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{member.role}</p>
                          <p className="text-xs text-muted-foreground">{member.department}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span>{member.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-xs">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span>{member.shift}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(member.status)} className="text-xs">
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Perf:</span>
                            <span className="font-medium">{member.performance}%</span>
                          </div>
                          <Progress value={member.performance} className="h-1 w-16" />
                          <div className="flex justify-between text-xs">
                            <span>Att:</span>
                            <span className="font-medium">{member.attendance}%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-primary text-primary" />
                          <span className="text-sm font-medium">{member.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewStaff(member)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditStaff(member)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Staff
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteStaff(member)} className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Staff
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

      {/* View Staff Profile Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Staff Profile</DialogTitle>
            <DialogDescription>Detailed information about {selectedStaff?.name}</DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback>
                      {selectedStaff.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedStaff.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedStaff.role}</p>
                    <Badge variant={getStatusColor(selectedStaff.status)} className="mt-1">
                      {selectedStaff.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Contact Information</Label>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm">{selectedStaff.email}</p>
                      <p className="text-sm">{selectedStaff.phone}</p>
                      <p className="text-sm">{selectedStaff.address}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Work Details</Label>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm">Department: {selectedStaff.department}</p>
                      <p className="text-sm">Shift: {selectedStaff.shift}</p>
                      <p className="text-sm">Experience: {selectedStaff.experience}</p>
                      <p className="text-sm">Salary: {selectedStaff.salary}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Performance Metrics</Label>
                  <div className="mt-2 space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Performance</span>
                        <span className="font-medium">{selectedStaff.performance}%</span>
                      </div>
                      <Progress value={selectedStaff.performance} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Attendance</span>
                        <span className="font-medium">{selectedStaff.attendance}%</span>
                      </div>
                      <Progress value={selectedStaff.attendance} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="font-medium">{selectedStaff.rating}</span>
                      </div>
                    </div>
                    {selectedStaff.orders > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Orders Today</span>
                        <span className="font-medium">{selectedStaff.orders}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Skills</Label>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedStaff.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <p className="text-sm mt-1">{selectedStaff.lastActive}</p>
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
                handleEditStaff(selectedStaff)
              }}
            >
              Edit Staff
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Staff Member</DialogTitle>
            <DialogDescription>Update information for {selectedStaff?.name}</DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input id="edit-name" defaultValue={selectedStaff.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" defaultValue={selectedStaff.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input id="edit-phone" defaultValue={selectedStaff.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select defaultValue={selectedStaff.role}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Washer">Washer</SelectItem>
                    <SelectItem value="Driver">Driver</SelectItem>
                    <SelectItem value="Folder">Folder</SelectItem>
                    <SelectItem value="Customer Service">Customer Service</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department</Label>
                <Select defaultValue={selectedStaff.department}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Delivery">Delivery</SelectItem>
                    <SelectItem value="Front Desk">Front Desk</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-shift">Shift</Label>
                <Select defaultValue={selectedStaff.shift}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning (6AM-2PM)">Morning (6AM-2PM)</SelectItem>
                    <SelectItem value="Afternoon (12PM-8PM)">Afternoon (12PM-8PM)</SelectItem>
                    <SelectItem value="Evening (2PM-10PM)">Evening (2PM-10PM)</SelectItem>
                    <SelectItem value="Full Day (9AM-5PM)">Full Day (9AM-5PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input id="edit-address" defaultValue={selectedStaff.address} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-salary">Salary</Label>
                <Input id="edit-salary" defaultValue={selectedStaff.salary} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-experience">Experience</Label>
                <Input id="edit-experience" defaultValue={selectedStaff.experience} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-skills">Skills (comma separated)</Label>
                <Textarea id="edit-skills" defaultValue={selectedStaff.skills.join(", ")} />
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

      {/* Delete Staff Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Staff Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedStaff?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
              Delete Staff
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
