"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Users, UserCheck, BarChart3, Tag, Settings, Home } from "lucide-react"

import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Overview",
    href: "/shop",
    icon: Home,
    description: "Dashboard overview",
  },
  {
    title: "Orders",
    href: "/shop/orders",
    icon: Package,
    description: "Total: 12,330 orders",
  },
  {
    title: "Staff",
    href: "/shop/staff",
    icon: Users,
    description: "Total: 24 staff members",
  },
  {
    title: "Customers",
    href: "/shop/customers",
    icon: UserCheck,
    description: "Total: 8,456 customers",
  },
  {
    title: "Reports",
    href: "/shop/reports",
    icon: BarChart3,
    description: "Total: 156 reports",
  },
  {
    title: "Promotions",
    href: "/shop/promotions",
    icon: Tag,
    description: "Total: 12 active promos",
  },
  {
    title: "Settings",
    href: "/shop/settings",
    icon: Settings,
    description: "Shop configuration",
  },
]

export function ShopMenuNavigation() {
  const pathname = usePathname()

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {menuItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group relative flex flex-col items-center justify-center px-6 py-4 rounded-xl border transition-all duration-200 hover:shadow-md",
              isActive
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card hover:border hover:border-primary",
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-colors",
                isActive ? "bg-primary-foreground/20" : "bg-primary/10 group-hover:bg-primary/20",
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-primary-foreground" : "text-primary")} />
            </div>
            <h3 className={cn("font-semibold text-sm mb-1", isActive ? "text-primary-foreground" : "text-foreground")}>
              {item.title}
            </h3>
            <p className={cn("text-xs text-center", isActive ? "text-primary-foreground/80" : "text-muted-foreground")}>
              {item.description}
            </p>
          </Link>
        )
      })}
    </div>
  )
}
