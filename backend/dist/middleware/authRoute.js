"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = { userId: decoded.userId };
        console.log("in the middleware");
        console.log(req.user);
        next();
    }
    catch (err) {
        console.error("JWT error:", err);
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
};
exports.authenticate = authenticate;
