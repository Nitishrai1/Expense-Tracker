"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar, LogOut, User } from "lucide-react"
import Link from "next/link"
import { ExpenseChart } from "@/components/expense-chart"
import { RecentExpenses } from "@/components/recent-expenses"
import { MonthlyExpenseChart } from "@/components/monthly-expense-chart"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function DashboardContent() {
  const { user, logout, token } = useAuth()
  const [totalIncome, setTotalIncome] = useState(0)
  const [availableBalance, setAvailableBalance] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        setLoading(true)

        const [statsRes, expensesRes] = await Promise.all([
          axios.get(`http://localhost:3002/api/user/dashboardstats?userId=${user.id}`),
          axios.get("http://localhost:3002/api/expenses/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ])

        setTotalIncome(statsRes.data.totalIncome || 0)
        setAvailableBalance(statsRes.data.availableBalance || 0)
        setTotalExpenses(statsRes.data.totalExpenses || 0)
        setExpenses(expensesRes.data || [])
      } catch (err) {
        console.error("Error fetching dashboard data", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-500">
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Track your expenses and manage your budget</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/expenses/add">
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{user?.name || "User"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">Rs - {totalIncome.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total earned so far</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">Rs - {availableBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">What you can still spend</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">Rs - {totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Money spent so far</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseChart expenses={expenses} />
          <MonthlyExpenseChart expenses={expenses} />
        </div>

        {/* Recent Expenses */}
        <RecentExpenses expenses={expenses.slice(0, 5)} />

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/expenses/add">
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </Link>
              <Link href="/expenses">
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
