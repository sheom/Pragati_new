import express from "express";
import { verifyToken } from "../middleware/auth.js";
//import { createProperty, getProperties } from "../controllers/properties.js";
import { addBudgetData, getBudgetData } from "../controllers/budgets.js"



const router = express.Router();
/* READ */
router.get("/", getBudgetData)
//router.post("/", getBudgetData)
/* ADD / CREATE */
router.post("/add", verifyToken, addBudgetData)

// router.post("/",verifyToken, createProperty )
// router.get("/", getProperties);



/* UPDATE */
//router.patch("/:id/like", verifyToken, likePost);

export default router;
