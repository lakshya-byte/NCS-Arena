import express from "express";
import { getLeaderboard } from "../controllers/leaderboard.controller.js";

const router = express.Router();

// GET /api/leaderboard/:contestId
router.get("/:contestId", getLeaderboard);

export default router;
