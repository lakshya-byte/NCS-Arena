import express from "express";
import { startLevel } from "../controllers/levelAttempt.controller.js";

const router = express.Router();

// POST /api/level/start
router.post("/start", startLevel);

export default router;
