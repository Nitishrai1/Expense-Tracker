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
exports.deleteById = exports.updateById = exports.addNew = exports.getById = exports.getAll = void 0;
const index_1 = require("../db/index");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    console.log("in the login controller");
    console.log(req.user);
    if (!id) {
        return res.status(401).json({ message: "Unauthorized: Missing user ID from token" });
    }
    const expenses = yield index_1.prisma.expense.findMany({
        where: { userId: id },
        orderBy: { date: "desc" },
    });
    res.json(expenses);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.query.id);
    console.log("inside the getid fun");
    const expense = yield index_1.prisma.expense.findUnique({
        where: { id: Number(id) },
    });
    if (!expense)
        return res.status(404).json({ message: "Expense not found" });
    res.json(expense);
});
exports.getById = getById;
const addNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { title, type, amount, category, description, date } = req.body;
        const parsedAmount = parseFloat(amount);
        const user = yield index_1.prisma.user.findUnique({ where: { id } });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        if (type === "expense" && parsedAmount > user.availableBalance) {
            return res.status(403).json({ message: "Cannot add expense: available balance is too low" });
        }
        const expense = yield index_1.prisma.expense.create({
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
        }
        else if (type === "expense") {
            updatedAvailable -= parsedAmount;
        }
        else {
            return res.status(400).json({ message: "Invalid transaction type" });
        }
        yield index_1.prisma.user.update({
            where: { id },
            data: {
                availableBalance: updatedAvailable,
                totalBalance: updatedTotal,
            },
        });
        res.status(201).json(expense);
    }
    catch (err) {
        console.error("Error creating expense:", err);
        res.status(500).json({ error: "Failed to create expense", err });
    }
});
exports.addNew = addNew;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(`id in the udpate fun ${id}`);
    const { title, amount, category, description, date } = req.body;
    try {
        const updated = yield index_1.prisma.expense.update({
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
    }
    catch (error) {
        console.error("Error updating expense:", error);
        res.status(500).json({ error: "Failed to update expense" });
    }
});
exports.updateById = updateById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const expense = yield index_1.prisma.expense.findUnique({
            where: { id: Number(id) },
        });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        const user = yield index_1.prisma.user.findUnique({
            where: { id: expense.userId },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        let adjustedAvailable = user.availableBalance;
        let adjustedTotal = user.totalBalance;
        if (expense.type === "expense") {
            adjustedAvailable += expense.amount;
        }
        else if (expense.type === "income") {
            adjustedAvailable -= expense.amount;
            adjustedTotal -= expense.amount;
        }
        yield index_1.prisma.expense.delete({ where: { id: Number(id) } });
        yield index_1.prisma.user.update({
            where: { id: user.id },
            data: {
                availableBalance: adjustedAvailable,
                totalBalance: adjustedTotal,
            },
        });
        res.status(204).json({ msg: "Deleted the expense and updated balances" });
    }
    catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ error: "Failed to delete expense" });
    }
});
exports.deleteById = deleteById;
