import express from "express";
import { submitLevel } from "../controllers/submission.controller.js";

const router = express.Router();

// POST /api/submission/submit
router.post("/submit", submitLevel);

export default router;
