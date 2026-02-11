import express from "express";
import { createContest, getAllContests } from "../controllers/contest.controller.js";

const router = express.Router();

// POST /api/contest/create
router.post("/create", createContest);

// GET /api/contest
router.get("/", getAllContests);

export default router;
