import { Router } from "express";
import { createUser, getAllUsers, getAvailableBalance, getDashboardStats, getTotalBalance } from "../controllers/userController";

const router = Router();



router.get('/',getAllUsers);
router.post("/create",createUser);

router.get("/totalbalance", getTotalBalance);
router.get("/avilablebalance", getAvailableBalance);
router.get("/dashboardstats",getDashboardStats);

export default router;
