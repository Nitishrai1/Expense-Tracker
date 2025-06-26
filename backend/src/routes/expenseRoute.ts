import { Router } from "express";
import { addNew, getAll, getById, updateById, deleteById } from "../controllers/expenseController";
import { authenticate } from "../middleware/authRoute";


const router = Router();

router.get("/",authenticate, getAll);
router.get("/:id", getById);
router.post("/create/:id", addNew);
router.put("/update/:id", updateById);
router.delete("/delete/:id", deleteById);

export default router;
