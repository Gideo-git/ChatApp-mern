import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar } from "../controllers/message.contoller.js";

const router=express.Router();

router.get("/users",protectRoute,getUsersForSidebar);

export default router;  