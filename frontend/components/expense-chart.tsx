"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface Expense {
  id: number
  title: string
  amount: number
  category: string
  date: string
  type: string
}

interface ExpenseChartProps {
  expenses: Expense[]
}

const COLORS = [
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#f97316", // orange
  "#06b6d4", // cyan
  "#84cc16", // lime
]

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  // Filter only expenses (not income) and group by category
  const expenseData = expenses
    .filter((expense) => expense.type === "expense")
    .reduce(
      (acc, expense) => {
        const category = expense.category
        if (acc[category]) {
          acc[category] += expense.amount
        } else {
          acc[category] = expense.amount
        }
        return acc
      },
      {} as Record<string, number>,
    )

  const chartData = Object.entries(expenseData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-emerald-600">${payload[0].value.toFixed(2)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500">No expense data available</div>
        )}
      </CardContent>
    </Card>
  )
}
