import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addRatingData, getRatingData } from "../controllers/ratings.js";

const router = express.Router();
/* READ */
//router.get("/", getRatingData)
router.get("/", verifyToken, getRatingData)
//router.post("/", getBudgetData)
/* ADD / CREATE */
router.post("/add", verifyToken, addRatingData)


/* UPDATE */
//router.patch("/:id/like", verifyToken, likePost);

export default router;