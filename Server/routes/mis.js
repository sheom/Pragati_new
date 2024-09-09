import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addActualData, getActualData } from "../controllers/actual.js";
//
import { getMISData } from "../controllers/mis.js"
import { getNewMISData } from "../controllers/newMIS.js";
import { getConsMISData } from "../controllers/consMIS.js";
const router = express.Router();
/* READ */
//router.get("/", verifyToken, getActualData)
//router.post("/", getBudgetData)
router.get("/", getMISData);
router.get("/new", getNewMISData);
router.get("/cons", getConsMISData);

/* ADD / CREATE */
//router.post("/add", verifyToken, addActualData)
/* UPDATE */
//router.patch("/:id/like", verifyToken, likePost);

export default router;