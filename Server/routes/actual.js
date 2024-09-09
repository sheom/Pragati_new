import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addActualData, getActualData } from "../controllers/actual.js";

const router = express.Router();
/* READ */
router.get("/", verifyToken, getActualData)
//router.post("/", getBudgetData)
/* ADD / CREATE */
router.post("/add", verifyToken, addActualData)


/* UPDATE */
//router.patch("/:id/like", verifyToken, likePost);

export default router;