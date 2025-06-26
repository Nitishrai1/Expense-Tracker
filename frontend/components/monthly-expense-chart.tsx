"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface Expense {
  id: number
  title: string
  amount: number
  category: string
  date: string
  type: string
}

interface MonthlyExpenseChartProps {
  expenses: Expense[]
}

export function MonthlyExpenseChart({ expenses }: MonthlyExpenseChartProps) {
  // Process data to get monthly totals for the last 6 months
  const processMonthlyData = () => {
    // Create last 6 months data structure
    const now = new Date()
    const monthlyData: Array<{ month: string; income: number; expense: number }> = []

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthName = date.toLocaleDateString("en-US", { month: "short", year: "2-digit" })

      monthlyData.push({
        month: monthName,
        income: 0,
        expense: 0,
      })
    }

    // Process expenses data
    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date)
      const expenseMonth = expenseDate.toLocaleDateString("en-US", { month: "short", year: "2-digit" })

      // Find matching month in our data
      const monthIndex = monthlyData.findIndex((item) => item.month === expenseMonth)

      if (monthIndex !== -1) {
        if (expense.type === "income") {
          monthlyData[monthIndex].income += expense.amount
        } else {
          monthlyData[monthIndex].expense += expense.amount
        }
      }
    })

    // If no data exists, create some sample data for demonstration
    if (monthlyData.every((item) => item.income === 0 && item.expense === 0)) {
      // Add current month data based on existing expenses
      const currentMonthIndex = monthlyData.length - 1
      const totalIncome = expenses.filter((e) => e.type === "income").reduce((sum, e) => sum + e.amount, 0)
      const totalExpense = expenses.filter((e) => e.type === "expense").reduce((sum, e) => sum + e.amount, 0)

      if (totalIncome > 0 || totalExpense > 0) {
        monthlyData[currentMonthIndex].income = totalIncome
        monthlyData[currentMonthIndex].expense = totalExpense
      }
    }

    return monthlyData
  }

  const chartData = processMonthlyData()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: ${entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Check if we have any data to display
  const hasData = chartData.some((data) => data.income > 0 || data.expense > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spending Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} maxBarSize={60} />
                <Bar dataKey="expense" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <p className="text-lg mb-2">No monthly data available</p>
              <p className="text-sm text-center">Add more expenses with different dates to see monthly trends</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
