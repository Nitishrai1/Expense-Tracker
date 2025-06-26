"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"

function ExpenseListContent() {
  const { user, token } = useAuth()
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user || !token) return

      try {
        const res = await axios.get(`http://localhost:3002/api/expenses?userId=${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setExpenses(res.data)
      } catch (err) {
        console.error("Error fetching the expense data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchExpenses()
  }, [user, token])

  const handleDelete = async (id: number) => {
    try {
      console.log(`id of the expense is ${id}`)
      const response = await axios.delete(`http://localhost:3002/api/expenses/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response)
      setExpenses((prev) => prev.filter((expense) => expense.id !== id))
    } catch (err) {
      console.error("Error deleting expense:", err)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading expenses...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Expenses</h1>
            <p className="text-gray-600">View and manage your transactions</p>
          </div>
          <Link href="/expenses/add">
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </Link>
        </div>

        {/* Expenses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions ({expenses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.title}</TableCell>
                      <TableCell className="text-gray-600">{expense.description}</TableCell>
                      <TableCell>
                        <Badge className="bg-gray-100 text-gray-800">{expense.category}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(expense.date)}</TableCell>
                      <TableCell>
                        <Badge variant={expense.type === "credit" ? "default" : "secondary"}>{expense.type}</Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${
                          expense.type === "credit" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {expense.type === "credit" ? "+" : "-"}Rs - {expense.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Link href={`/expenses/edit/${expense.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(expense.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {expenses.length === 0 && <div className="text-center py-8 text-gray-500">No expenses found.</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ExpenseList() {
  return (
    <ProtectedRoute>
      <ExpenseListContent />
    </ProtectedRoute>
  )
}
