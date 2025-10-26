"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Sparkles,
  Store,
  Bell,
  Clock,
  CreditCard,
  Users,
  Shield,
  Globe,
  Smartphone,
  Mail,
  MapPin,
  Phone,
  Save,
  Eye,
  EyeOff,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    lowInventory: false,
    dailyReports: true,
    maintenanceAlerts: true,
    customerMessages: true,
  })

  const [businessHours, setBusinessHours] = useState([
    { day: "Monday", open: "08:00", close: "18:00", closed: false },
    { day: "Tuesday", open: "08:00", close: "18:00", closed: false },
    { day: "Wednesday", open: "08:00", close: "18:00", closed: false },
    { day: "Thursday", open: "08:00", close: "18:00", closed: false },
    { day: "Friday", open: "08:00", close: "18:00", closed: false },
    { day: "Saturday", open: "09:00", close: "17:00", closed: false },
    { day: "Sunday", open: "10:00", close: "16:00", closed: false },
  ])

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handleBusinessHourChange = (index: number, field: string, value: string | boolean) => {
    setBusinessHours((prev) => prev.map((hour, i) => (i === index ? { ...hour, [field]: value } : hour)))
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
                  <Settings className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-lg font-semibold text-foreground">Settings</span>
                  <p className="text-xs text-muted-foreground">Shop configuration and preferences</p>
                </div>
              </div>
            </div>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  Shop Information
                </CardTitle>
                <CardDescription>Basic shop details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shopName">Shop Name</Label>
                    <Input id="shopName" defaultValue="Easywash Laundry" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shopType">Business Type</Label>
                    <Select defaultValue="laundry">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laundry">Laundry Service</SelectItem>
                        <SelectItem value="dry-cleaning">Dry Cleaning</SelectItem>
                        <SelectItem value="both">Laundry & Dry Cleaning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your laundry service..."
                    defaultValue="Professional laundry and dry cleaning services with same-day delivery options."
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex">
                      <Phone className="w-4 h-4 mt-3 mr-2 text-muted-foreground" />
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex">
                      <Mail className="w-4 h-4 mt-3 mr-2 text-muted-foreground" />
                      <Input id="email" type="email" defaultValue="contact@easywash.com" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="flex">
                    <MapPin className="w-4 h-4 mt-3 mr-2 text-muted-foreground" />
                    <Textarea
                      id="address"
                      placeholder="Full business address..."
                      defaultValue="123 Main Street, Downtown, City, State 12345"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Online Presence
                </CardTitle>
                <CardDescription>Website and social media links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input id="website" placeholder="https://www.easywash.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook Page</Label>
                    <Input id="facebook" placeholder="https://facebook.com/easywash" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" placeholder="@easywash_laundry" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter/X</Label>
                    <Input id="twitter" placeholder="@easywash" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Business Hours
                </CardTitle>
                <CardDescription>Set your operating hours for each day of the week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {businessHours.map((hour, index) => (
                  <div key={hour.day} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="w-20 font-medium">{hour.day}</span>
                      <Switch
                        checked={!hour.closed}
                        onCheckedChange={(checked) => handleBusinessHourChange(index, "closed", !checked)}
                      />
                    </div>
                    {!hour.closed && (
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={hour.open}
                          onChange={(e) => handleBusinessHourChange(index, "open", e.target.value)}
                          className="w-32"
                        />
                        <span className="text-muted-foreground">to</span>
                        <Input
                          type="time"
                          value={hour.close}
                          onChange={(e) => handleBusinessHourChange(index, "close", e.target.value)}
                          className="w-32"
                        />
                      </div>
                    )}
                    {hour.closed && <Badge variant="secondary">Closed</Badge>}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Settings</CardTitle>
                <CardDescription>Configure your laundry services and pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minOrder">Minimum Order Amount</Label>
                    <Input id="minOrder" type="number" defaultValue="15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryFee">Delivery Fee</Label>
                    <Input id="deliveryFee" type="number" defaultValue="5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input id="taxRate" type="number" defaultValue="8.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose which notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Orders</Label>
                      <p className="text-sm text-muted-foreground">Get notified when new orders are placed</p>
                    </div>
                    <Switch
                      checked={notifications.newOrders}
                      onCheckedChange={(checked) => handleNotificationChange("newOrders", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Order Updates</Label>
                      <p className="text-sm text-muted-foreground">Status changes and order completions</p>
                    </div>
                    <Switch
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("orderUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Low Inventory</Label>
                      <p className="text-sm text-muted-foreground">Alerts when supplies are running low</p>
                    </div>
                    <Switch
                      checked={notifications.lowInventory}
                      onCheckedChange={(checked) => handleNotificationChange("lowInventory", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Daily Reports</Label>
                      <p className="text-sm text-muted-foreground">Daily summary of orders and revenue</p>
                    </div>
                    <Switch
                      checked={notifications.dailyReports}
                      onCheckedChange={(checked) => handleNotificationChange("dailyReports", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Alerts</Label>
                      <p className="text-sm text-muted-foreground">Equipment maintenance reminders</p>
                    </div>
                    <Switch
                      checked={notifications.maintenanceAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("maintenanceAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Customer Messages</Label>
                      <p className="text-sm text-muted-foreground">New messages from customers</p>
                    </div>
                    <Switch
                      checked={notifications.customerMessages}
                      onCheckedChange={(checked) => handleNotificationChange("customerMessages", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Methods</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emailNotif">Email Notifications</Label>
                      <div className="flex">
                        <Mail className="w-4 h-4 mt-3 mr-2 text-muted-foreground" />
                        <Input id="emailNotif" type="email" defaultValue="admin@easywash.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smsNotif">SMS Notifications</Label>
                      <div className="flex">
                        <Smartphone className="w-4 h-4 mt-3 mr-2 text-muted-foreground" />
                        <Input id="smsNotif" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Configure accepted payment methods and processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cash Payments</Label>
                      <p className="text-sm text-muted-foreground">Accept cash payments at pickup/delivery</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Credit/Debit Cards</Label>
                      <p className="text-sm text-muted-foreground">Accept card payments via Stripe</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Digital Wallets</Label>
                      <p className="text-sm text-muted-foreground">Apple Pay, Google Pay, PayPal</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Bank Transfers</Label>
                      <p className="text-sm text-muted-foreground">Direct bank account transfers</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Payment Processing</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stripeKey">Stripe Publishable Key</Label>
                      <div className="flex">
                        <Input
                          id="stripeKey"
                          type={showApiKey ? "text" : "password"}
                          defaultValue="pk_test_51234567890abcdef..."
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-2"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypalClient">PayPal Client ID</Label>
                      <Input id="paypalClient" defaultValue="AYjcyDQQpLO-8rBTnHXxUwmu..." />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management
                </CardTitle>
                <CardDescription>Manage staff accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Staff Registration</h4>
                    <p className="text-sm text-muted-foreground">Allow new staff to register accounts</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Customer Registration</h4>
                    <p className="text-sm text-muted-foreground">Allow customers to create accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Email Verification</h4>
                    <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Default Permissions</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="defaultStaffRole">Default Staff Role</Label>
                      <Select defaultValue="operator">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="operator">Operator</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                      <Input id="sessionTimeout" type="number" defaultValue="8" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Login Notifications</Label>
                      <p className="text-sm text-muted-foreground">Email alerts for new logins</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>IP Restrictions</Label>
                      <p className="text-sm text-muted-foreground">Limit access to specific IP addresses</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Password Policy</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minPasswordLength">Minimum Password Length</Label>
                      <Input id="minPasswordLength" type="number" defaultValue="8" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                      <Input id="passwordExpiry" type="number" defaultValue="90" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Password Requirements</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Label className="text-sm">Require uppercase letters</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Label className="text-sm">Require numbers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <Label className="text-sm">Require special characters</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Data Backup</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="backupFreq">Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retentionPeriod">Retention Period (days)</Label>
                      <Input id="retentionPeriod" type="number" defaultValue="30" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
