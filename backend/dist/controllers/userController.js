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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableBalance = exports.getTotalBalance = exports.createUser = exports.getAllUsers = void 0;
const index_1 = require("../db/index");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield index_1.prisma.user.findMany();
    return res.json(users);
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, googleId, picture } = req.body;
    const user = yield index_1.prisma.user.upsert({
        where: { email },
        update: {},
        create: { name, email, googleId, picture },
    });
    return res.status(201).json(user);
});
exports.createUser = createUser;
const getTotalBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.query.userId);
    if (!userId)
        return res.status(400).json({ error: "userId is required" });
    try {
        const user = yield index_1.prisma.user.findUnique({
            where: { id: userId },
            select: { totalBalance: true }
        });
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json({ totalbalance: user.totalBalance });
    }
    catch (err) {
        console.error("Error fetching total balance:", err);
        res.status(500).json({ error: "Failed to fetch total balance" });
    }
});
exports.getTotalBalance = getTotalBalance;
const getAvailableBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.query.userId);
    if (!userId)
        return res.status(400).json({ error: "userId is required" });
    try {
        const user = yield index_1.prisma.user.findUnique({
            where: { id: userId },
            select: { availableBalance: true }
        });
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json({ avilablebalance: user.availableBalance });
    }
    catch (err) {
        console.error("Error fetching available balance:", err);
        res.status(500).json({ error: "Failed to fetch available balance" });
    }
});
exports.getAvailableBalance = getAvailableBalance;
