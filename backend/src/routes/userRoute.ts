import { Router } from "express";
import { createUser, getAllUsers, getAvailableBalance, getTotalBalance } from "../controllers/userController";

const router = Router();



router.get('/',getAllUsers);
router.post("/create",createUser);

router.get("/totalbalance", getTotalBalance);
router.get("/avilablebalance", getAvailableBalance);

export default router;
