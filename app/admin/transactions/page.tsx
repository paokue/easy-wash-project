"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCard,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Download,
  RefreshCw,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isRefundOpen, setIsRefundOpen] = useState(false)

  // Mock data for transactions
  const transactions = [
    {
      id: "TXN-001",
      orderId: "ORD-001",
      customer: "Alice Johnson",
      customerEmail: "alice@example.com",
      shop: "Downtown Laundry",
      amount: "$45.00",
      fee: "$1.35",
      netAmount: "$43.65",
      type: "payment",
      method: "credit_card",
      status: "completed",
      date: "2024-01-21",
      time: "14:30",
      reference: "ch_3OqIC92eZvKYlo2C0EXAMPLE",
      description: "Payment for laundry services",
    },
    {
      id: "TXN-002",
      orderId: "ORD-002",
      customer: "Bob Smith",
      customerEmail: "bob@example.com",
      shop: "Westside Wash",
      amount: "$28.00",
      fee: "$0.84",
      netAmount: "$27.16",
      type: "payment",
      method: "debit_card",
      status: "completed",
      date: "2024-01-21",
      time: "10:15",
      reference: "ch_3OqIC92eZvKYlo2C1EXAMPLE",
      description: "Express wash payment",
    },
    {
      id: "TXN-003",
      orderId: "ORD-003",
      customer: "Carol Davis",
      customerEmail: "carol@example.com",
      shop: "Express Clean",
      amount: "$62.00",
      fee: "$1.86",
      netAmount: "$60.14",
      type: "payment",
      method: "digital_wallet",
      status: "pending",
      date: "2024-01-21",
      time: "16:45",
      reference: "ch_3OqIC92eZvKYlo2C2EXAMPLE",
      description: "Wash & fold with ironing",
    },
    {
      id: "TXN-004",
      orderId: "ORD-004",
      customer: "David Wilson",
      customerEmail: "david@example.com",
      shop: "Downtown Laundry",
      amount: "$35.00",
      fee: "$1.05",
      netAmount: "$33.95",
      type: "refund",
      method: "credit_card",
      status: "completed",
      date: "2024-01-20",
      time: "09:20",
      reference: "re_3OqIC92eZvKYlo2C0EXAMPLE",
      description: "Refund for cancelled order",
    },
    {
      id: "TXN-005",
      orderId: "ORD-005",
      customer: "Emma Brown",
      customerEmail: "emma@example.com",
      shop: "Westside Wash",
      amount: "$52.00",
      fee: "$1.56",
      netAmount: "$50.44",
      type: "payment",
      method: "bank_transfer",
      status: "failed",
      date: "2024-01-21",
      time: "12:00",
      reference: "ch_3OqIC92eZvKYlo2C3EXAMPLE",
      description: "Payment failed - insufficient funds",
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsViewOpen(true)
  }

  const handleRefundTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsRefundOpen(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "payment":
        return "default"
      case "refund":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getMethodDisplay = (method: string) => {
    switch (method) {
      case "credit_card":
        return "Credit Card"
      case "debit_card":
        return "Debit Card"
      case "digital_wallet":
        return "Digital Wallet"
      case "bank_transfer":
        return "Bank Transfer"
      default:
        return method
    }
  }

  const totalTransactions = transactions.length
  const completedTransactions = transactions.filter((t) => t.status === "completed").length
  const totalRevenue = transactions
    .filter((t) => t.type === "payment" && t.status === "completed")
    .reduce((sum, t) => sum + Number.parseFloat(t.amount.replace("$", "")), 0)
  const totalFees = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + Number.parseFloat(t.fee.replace("$", "")), 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transaction Management</h1>
          <p className="text-muted-foreground">Monitor all financial transactions across the platform</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">+15 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTransactions}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((completedTransactions / totalTransactions) * 100)}% success rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Gross revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Fees</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total fees paid</p>
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
                placeholder="Search transactions, customers, or orders..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="refund">Refunds</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Transaction Details</th>
                  <th className="text-left p-4">Customer & Order</th>
                  <th className="text-left p-4">Amount & Fees</th>
                  <th className="text-left p-4">Payment Method</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date & Time</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{transaction.id}</div>
                        <div className="text-sm text-muted-foreground">
                          <Badge variant={getTypeVariant(transaction.type)} className="text-xs">
                            {transaction.type}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{transaction.customer}</div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.orderId} • {transaction.shop}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-medium">{transaction.amount}</div>
                        <div className="text-sm text-muted-foreground">
                          Fee: {transaction.fee} • Net: {transaction.netAmount}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{getMethodDisplay(transaction.method)}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(transaction.status)}
                        <Badge variant={getStatusVariant(transaction.status)}>{transaction.status}</Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="text-sm">{transaction.date}</div>
                        <div className="text-sm text-muted-foreground">{transaction.time}</div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewTransaction(transaction)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download Receipt
                          </DropdownMenuItem>
                          {transaction.type === "payment" && transaction.status === "completed" && (
                            <DropdownMenuItem onClick={() => handleRefundTransaction(transaction)}>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Process Refund
                            </DropdownMenuItem>
                          )}
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

      {/* View Transaction Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Transaction Details - {selectedTransaction?.id}</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Transaction Information</h3>
                  <div className="space-y-2">
                    <div>
                      <strong>Transaction ID:</strong> {selectedTransaction.id}
                    </div>
                    <div>
                      <strong>Order ID:</strong> {selectedTransaction.orderId}
                    </div>
                    <div>
                      <strong>Reference:</strong> {selectedTransaction.reference}
                    </div>
                    <div>
                      <strong>Type:</strong>
                      <Badge className="ml-2" variant={getTypeVariant(selectedTransaction.type)}>
                        {selectedTransaction.type}
                      </Badge>
                    </div>
                    <div>
                      <strong>Description:</strong> {selectedTransaction.description}
                    </div>
                    <div>
                      <strong>Date & Time:</strong> {selectedTransaction.date} at {selectedTransaction.time}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="space-y-2">
                    <div>
                      <strong>Name:</strong> {selectedTransaction.customer}
                    </div>
                    <div>
                      <strong>Email:</strong> {selectedTransaction.customerEmail}
                    </div>
                    <div>
                      <strong>Shop:</strong> {selectedTransaction.shop}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Payment Details</h3>
                  <div className="space-y-2">
                    <div>
                      <strong>Amount:</strong> {selectedTransaction.amount}
                    </div>
                    <div>
                      <strong>Processing Fee:</strong> {selectedTransaction.fee}
                    </div>
                    <div>
                      <strong>Net Amount:</strong> {selectedTransaction.netAmount}
                    </div>
                    <div>
                      <strong>Payment Method:</strong> {getMethodDisplay(selectedTransaction.method)}
                    </div>
                    <div className="flex items-center">
                      <strong className="mr-2">Status:</strong>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedTransaction.status)}
                        <Badge variant={getStatusVariant(selectedTransaction.status)}>
                          {selectedTransaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download Receipt
                    </Button>
                    {selectedTransaction.type === "payment" && selectedTransaction.status === "completed" && (
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Process Refund
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Refund Transaction Dialog */}
      <Dialog open={isRefundOpen} onOpenChange={setIsRefundOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Refund</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to process a refund for transaction {selectedTransaction?.id}?</p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="space-y-2">
                <div>
                  <strong>Customer:</strong> {selectedTransaction?.customer}
                </div>
                <div>
                  <strong>Amount to Refund:</strong> {selectedTransaction?.amount}
                </div>
                <div>
                  <strong>Payment Method:</strong> {getMethodDisplay(selectedTransaction?.method || "")}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              The refund will be processed to the original payment method. This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsRefundOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsRefundOpen(false)}>
              Process Refund
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
