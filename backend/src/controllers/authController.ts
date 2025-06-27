
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";

import {prisma} from "../db/index"
const JWT_SECRET = process.env.JWT_SECRET!;
console.log(`jwt secret is ${JWT_SECRET}`)

const generateToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    console.log("inside the signup controller")
    console.log(`${email}, ${password}`)
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: password,
      },
    });

    const token = generateToken(user.id);

    return res.status(201).json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    return res.status(500).json({ msg: "Signup failed", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = generateToken(user.id);

    return res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    return res.status(500).json({ msg: "Login failed", error });
  }
};
