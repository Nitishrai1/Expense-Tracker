"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
// import bcrypt from "bcryptjs";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = require("../db/index");
const JWT_SECRET = process.env.JWT_SECRET;
console.log(`jwt secret is ${JWT_SECRET}`);
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        console.log("inside the signup controller");
        const existingUser = yield index_1.prisma.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(400).json({ msg: "User already exists" });
        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = yield index_1.prisma.user.create({
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
    }
    catch (error) {
        return res.status(500).json({ msg: "Signup failed", error });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield index_1.prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).json({ msg: "User not found" });
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });
        const token = generateToken(user.id);
        return res.json({
            token,
            user: { id: user.id, email: user.email, name: user.name },
        });
    }
    catch (error) {
        return res.status(500).json({ msg: "Login failed", error });
    }
});
exports.login = login;
