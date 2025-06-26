"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface Expense {
  id: number
  title: string
  amount: number
  category: string
  date: string
  type: string
}

interface MonthlyNetChartProps {
  expenses: Expense[]
}

export function MonthlyNetChart({ expenses }: MonthlyNetChartProps) {
  // Process data to get monthly net income for the last 6 months
  const processMonthlyNetData = () => {
    const monthlyData: { [key: string]: { income: number; expense: number } } = {}

    // Get last 6 months
    const now = new Date()
    const months = []

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthKey = date.toISOString().slice(0, 7) // YYYY-MM format
      const monthName = date.toLocaleDateString("en-US", { month: "short" })

      months.push({ key: monthKey, name: monthName })
      monthlyData[monthKey] = { income: 0, expense: 0 }
    }

    // Process expenses data
    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date)
      const monthKey = expenseDate.toISOString().slice(0, 7)

      if (monthlyData[monthKey]) {
        if (expense.type === "income") {
          monthlyData[monthKey].income += expense.amount
        } else {
          monthlyData[monthKey].expense += expense.amount
        }
      }
    })

    // Convert to chart format
    return months.map(({ key, name }) => ({
      month: name,
      net: monthlyData[key].income - monthlyData[key].expense,
    }))
  }

  const chartData = processMonthlyNetData()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className={`text-sm ${value >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            Net: {value >= 0 ? "+" : ""}${value.toFixed(2)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Net Income Trend</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.some((data) => data.net !== 0) ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#666" strokeDasharray="2 2" />
              <Line
                type="monotone"
                dataKey="net"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            No monthly trend data available
          </div>
        )}
      </CardContent>
    </Card>
  )
}
