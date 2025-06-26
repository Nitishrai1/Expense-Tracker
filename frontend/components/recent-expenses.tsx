import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface Expense {
  id: number
  title: string
  amount: number
  category: string
  date: string
  type: string
}

interface RecentExpensesProps {
  expenses: Expense[]
}

export function RecentExpenses({ expenses }: RecentExpensesProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Food: "bg-orange-100 text-orange-800",
      Transportation: "bg-blue-100 text-blue-800",
      Bills: "bg-red-100 text-red-800",
      Income: "bg-green-100 text-green-800",
      Entertainment: "bg-purple-100 text-purple-800",
      Shopping: "bg-pink-100 text-pink-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Link href="/expenses">
          <Button variant="outline" size="sm">
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="font-medium">{expense.title}</div>
                  <div className="text-sm text-gray-500">{formatDate(expense.date)}</div>
                </div>
                <Badge className={getCategoryColor(expense.category)}>{expense.category}</Badge>
              </div>
              <div className={`font-medium ${expense.type === "income" ? "text-green-600" : "text-red-600"}`}>
                {expense.type === "income" ? "+" : "-"}${expense.amount.toFixed(2)}
              </div>
            </div>
          ))}

          {expenses.length === 0 && <div className="text-center py-8 text-gray-500">No recent transactions</div>}
        </div>
      </CardContent>
    </Card>
  )
}
