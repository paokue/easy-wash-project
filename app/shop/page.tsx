"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ShopMenuNavigation } from "@/components/shop-menu-navigation"
import {
  Users,
  Package,
  DollarSign,
  Star,
  ArrowLeft,
  Sparkles,
  Bell,
  Settings,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function ShopDashboard() {

  const stats = [
    { title: "Today's Orders", value: "24", change: "+12%", icon: Package, trend: "up" },
    { title: "Revenue", value: "$1,248", change: "+8%", icon: DollarSign, trend: "up" },
    { title: "Active Customer", value: "8", change: "0%", icon: Users, trend: "stable" },
    { title: "Avg. Rating", value: "4.8", change: "+0.2", icon: Star, trend: "up" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div className="flex items-center gap-2">
                <div>
                  <span className="text-xl font-semibold text-foreground">Easywash</span>
                  <p className="text-xs text-muted-foreground">Shop Dashboard</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="px-4 py-1">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`w-3 h-3 ${stat.trend === "up" ? "text-green-600" : "text-gray-600"}`} />
                      <p className="text-xs text-primary">{stat.change} from yesterday</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold">Quick Access</h2>
            <p className="text-sm text-muted-foreground">Navigate to different sections of your shop management</p>
          </div>
          <ShopMenuNavigation />
        </div>
      </div>
    </div>
  )
}
