import express from "express";
import {
  submitLevel,
  listSubmissions,
} from "../controllers/submission.controller.js";

const router = express.Router();

// POST /api/submission/submit
router.post("/submit", submitLevel);

// GET /api/submission/:contestId/:participantId
router.get("/:contestId/:participantId", listSubmissions);

export default router;
