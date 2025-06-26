import { Request, Response } from "express";
import { prisma } from "../db/index";

export const getAll = async (req: Request, res: Response) => {
  const id = (req.user as { userId: number })?.userId;
  console.log("in the login controller")
  console.log(req.user)
  if (!id) {
    return res.status(401).json({ message: "Unauthorized: Missing user ID from token" });
  }

  const expenses = await prisma.expense.findMany({
    where: { userId: id },
    orderBy: { date: "desc" },
  });

  res.json(expenses);
};



export const getById = async (req: Request, res: Response) => {
  const userId = Number(req.query.id);
  console.log("inside the getid fun")

  const expense = await prisma.expense.findUnique({
    where: { id: Number(id) },
  });

  if (!expense) return res.status(404).json({ message: "Expense not found" });

  res.json(expense);
};

export const addNew = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id); 
    const { title, type, amount, category, description, date } = req.body;
    const parsedAmount = parseFloat(amount);

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const expense = await prisma.expense.create({
      data: {
        userId: id,
        title,
        type,
        amount: parsedAmount,
        category,
        description,
        date: new Date(date),
      },
    });

   
    let updatedAvailable = user.availableBalance;
    let updatedTotal = user.totalBalance;

    if (type === "income") {
      updatedAvailable += parsedAmount;
      updatedTotal += parsedAmount;
    } else if (type === "expense") {
      updatedAvailable -= parsedAmount;
    } else {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    await prisma.user.update({
      where: { id },
      data: {
        availableBalance: updatedAvailable,
        totalBalance: updatedTotal,
      },
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error("Error creating expense:", err);
    res.status(500).json({ error: "Failed to create expense", err });
  }
};


export const updateById = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(`id in the udpate fun ${id}`)
  const { title, amount, category, description, date } = req.body;

  try {
    const updated = await prisma.expense.update({
      where: { id: Number(id) },
      data: {
        title,
        amount: parseFloat(amount),
        category,
        description,
        date: new Date(date),
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ error: "Failed to update expense" });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const expense = await prisma.expense.findUnique({
      where: { id: Number(id) },
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const user = await prisma.user.findUnique({
      where: { id: expense.userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let adjustedAvailable = user.availableBalance;
    let adjustedTotal = user.totalBalance;

    if (expense.type === "expense") {
      adjustedAvailable += expense.amount;
    } else if (expense.type === "income") {
      adjustedAvailable -= expense.amount;
      adjustedTotal -= expense.amount;
    }

    await prisma.expense.delete({ where: { id: Number(id) } });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        availableBalance: adjustedAvailable,
        totalBalance: adjustedTotal,
      },
    });

    res.status(204).json({ msg: "Deleted the expense and updated balances" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

