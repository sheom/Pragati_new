import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

import { createProperty, getProperties } from "../controllers/properties.js";

const router = express.Router();

/* READ */
// router.get("/", verifyToken, getFeedPosts);
// router.get("/:userId/posts", verifyToken, getUserPosts);
/* Create POST */
router.post("/",verifyToken, createProperty )
router.get("/", getProperties);



/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
