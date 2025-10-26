"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Sparkles,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Star,
  BarChart3,
  PieChart,
  LineChart,
  GitGraph,
} from "lucide-react"
import Link from "next/link"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [selectedReport, setSelectedReport] = useState("overview")

  const revenueData = [
    { name: "Mon", revenue: 1200, orders: 18, customers: 15 },
    { name: "Tue", revenue: 1450, orders: 22, customers: 19 },
    { name: "Wed", revenue: 1100, orders: 16, customers: 14 },
    { name: "Thu", revenue: 1680, orders: 25, customers: 21 },
    { name: "Fri", revenue: 1920, orders: 28, customers: 24 },
    { name: "Sat", revenue: 2100, orders: 32, customers: 28 },
    { name: "Sun", revenue: 1800, orders: 26, customers: 22 },
  ]

  const serviceData = [
    { name: "Wash & Fold", value: 45, revenue: 5400, color: "hsl(var(--primary))" },
    { name: "Dry Clean", value: 30, revenue: 4200, color: "hsl(var(--accent))" },
    { name: "Premium Care", value: 25, revenue: 3600, color: "hsl(var(--muted-foreground))" },
  ]

  const monthlyData = [
    { month: "Jan", revenue: 28000, orders: 420, customers: 156 },
    { month: "Feb", revenue: 32000, orders: 480, customers: 178 },
    { month: "Mar", revenue: 35000, orders: 520, customers: 195 },
  ]

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+15.2%",
      trend: "up",
      icon: DollarSign,
      period: "This week",
    },
    {
      title: "Total Orders",
      value: "167",
      change: "+8.4%",
      trend: "up",
      icon: Package,
      period: "This week",
    },
    {
      title: "New Customers",
      value: "23",
      change: "+12.1%",
      trend: "up",
      icon: Users,
      period: "This week",
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      change: "+0.2",
      trend: "up",
      icon: Star,
      period: "This week",
    },
  ]

  const topServices = [
    { name: "Wash & Fold", orders: 75, revenue: 1875, percentage: 45 },
    { name: "Dry Cleaning", orders: 50, revenue: 1750, percentage: 30 },
    { name: "Premium Care", orders: 42, revenue: 2100, percentage: 25 },
  ]

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : TrendingDown
  }

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600"
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
                  <GitGraph className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xl font-semibold text-foreground">Reports & Analytics</span>
                  <p className="text-xs text-muted-foreground">Business insights and performance</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const TrendIcon = getTrendIcon(stat.trend)
            return (
              <Card key={index}>
                <CardContent className="px-6 py-0">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendIcon className={`w-3 h-3 ${getTrendColor(stat.trend)}`} />
                        <p className={`text-xs ${getTrendColor(stat.trend)}`}>{stat.change}</p>
                        <p className="text-xs text-muted-foreground">{stat.period}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Revenue Trend
              </CardTitle>
              <CardDescription>Daily revenue over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Service Distribution
              </CardTitle>
              <CardDescription>Breakdown of services by volume</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Orders and Customers Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Orders & Customer Activity
            </CardTitle>
            <CardDescription>Daily orders and customer visits</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="orders" fill="hsl(var(--primary))" name="Orders" />
                <Bar dataKey="customers" fill="hsl(var(--accent))" name="Customers" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Reports */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Services</CardTitle>
              <CardDescription>Most popular services this period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.orders} orders</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${service.revenue}</p>
                      <Badge variant="secondary">{service.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Order Value</p>
                    <p className="text-2xl font-bold">$74.55</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <p className="text-sm text-green-600">+5.2%</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Retention</p>
                    <p className="text-2xl font-bold">87%</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <p className="text-sm text-green-600">+2.1%</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Completion Time</p>
                    <p className="text-2xl font-bold">2.4 hrs</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <TrendingDown className="w-4 h-4 text-green-600" />
                      <p className="text-sm text-green-600">-0.3 hrs</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
