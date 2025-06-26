import { Request, Response } from "express";
import {prisma} from "../db/index";

export const getAllUsers = async (req: any, res: any) => {
  const users = await prisma.user.findMany();
  return res.json(users);
};

export const createUser = async (req: any, res: any) => {
  const { name, email, googleId, picture } = req.body;

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { name, email, googleId, picture },
  });

  return res.status(201).json(user);
};



export const getTotalBalance = async (req: Request, res: Response) => {
  const userId = Number(req.query.userId);

  if (!userId) return res.status(400).json({ error: "userId is required" });

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { totalBalance: true }
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ totalbalance: user.totalBalance });
  } catch (err) {
    console.error("Error fetching total balance:", err);
    res.status(500).json({ error: "Failed to fetch total balance" });
  }
};

export const getAvailableBalance = async (req: Request, res: Response) => {
  const userId = Number(req.query.userId);

  if (!userId) return res.status(400).json({ error: "userId is required" });

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { availableBalance: true }
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ avilablebalance: user.availableBalance });
  } catch (err) {
    console.error("Error fetching available balance:", err);
    res.status(500).json({ error: "Failed to fetch available balance" });
  }
};
