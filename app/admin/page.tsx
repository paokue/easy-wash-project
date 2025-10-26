"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import {
  Building2,
  Package,
  DollarSign,
  Users,
  Activity,
  CreditCard,
  UserCheck,
  Megaphone,
  BarChart3,
  Database,
  Globe,
  Shield,
  Settings,
} from "lucide-react"

export default function AdminDashboard() {
  const globalStats = [
    { title: "Total Shops", value: "12", change: "+2 this month", icon: Building2, color: "text-blue-600" },
    {
      title: "Total Revenue",
      value: "$48,392",
      change: "+15% vs last month",
      icon: DollarSign,
      color: "text-green-600",
    },
    { title: "Active Orders", value: "284", change: "+8% today", icon: Package, color: "text-orange-600" },
    { title: "Total Customers", value: "3,247", change: "+156 this week", icon: Users, color: "text-purple-600" },
    {
      title: "System Health",
      value: "99.8%",
      change: "All systems operational",
      icon: Activity,
      color: "text-emerald-600",
    },
    {
      title: "Daily Transactions",
      value: "2,156",
      change: "+12% vs yesterday",
      icon: CreditCard,
      color: "text-indigo-600",
    },
  ]

  const revenueData = [
    { name: "Jan", revenue: 42000, orders: 1240, shops: 10 },
    { name: "Feb", revenue: 45000, orders: 1350, shops: 10 },
    { name: "Mar", revenue: 48000, orders: 1420, shops: 11 },
    { name: "Apr", revenue: 52000, orders: 1580, shops: 11 },
    { name: "May", revenue: 49000, orders: 1460, shops: 12 },
    { name: "Jun", revenue: 55000, orders: 1680, shops: 12 },
  ]

  const shopPerformanceData = [
    { name: "Downtown", revenue: 12450, orders: 156, efficiency: 92 },
    { name: "Westside", revenue: 11280, orders: 142, efficiency: 88 },
    { name: "Eastside", revenue: 15702, orders: 178, efficiency: 95 },
    { name: "North Plaza", revenue: 8960, orders: 98, efficiency: 75 },
  ]

  const recentActivities = [
    { type: "shop", message: "New shop 'Central Plaza' added to network", time: "2 hours ago", icon: Building2 },
    { type: "order", message: "Peak order volume reached: 2,156 orders today", time: "4 hours ago", icon: Package },
    { type: "user", message: "5 new admin staff members added", time: "6 hours ago", icon: UserCheck },
    { type: "system", message: "System maintenance completed successfully", time: "1 day ago", icon: Settings },
    { type: "promotion", message: "Holiday promotion campaign launched", time: "2 days ago", icon: Megaphone },
  ]

  return (
    <div className="p-6">
      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {globalStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-primary">{stat.change}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue Trend</CardTitle>
            <CardDescription className="text-sm">Monthly revenue across all locations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shop Performance</CardTitle>
            <CardDescription className="text-sm">Revenue comparison by location</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shopPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent System Activities</CardTitle>
            <CardDescription className="text-sm">Latest updates across your network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription className="text-sm">Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Building2 className="w-4 h-4 mr-2" />
              Add New Shop
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <UserCheck className="w-4 h-4 mr-2" />
              Create Admin User
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Megaphone className="w-4 h-4 mr-2" />
              Launch Promotion
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Health Status */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">System Health Status</CardTitle>
          <CardDescription className="text-sm">Real-time monitoring of system components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm font-medium">System Uptime</p>
              <p className="text-2xl font-bold text-green-600">99.8%</p>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Database Health</p>
              <p className="text-2xl font-bold text-blue-600">Optimal</p>
              <p className="text-xs text-muted-foreground">142ms avg response</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm font-medium">API Status</p>
              <p className="text-2xl font-bold text-purple-600">Active</p>
              <p className="text-xs text-muted-foreground">All endpoints operational</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-sm font-medium">Security</p>
              <p className="text-2xl font-bold text-orange-600">Secure</p>
              <p className="text-xs text-muted-foreground">No threats detected</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
