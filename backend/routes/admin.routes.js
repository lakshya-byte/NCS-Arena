import express from "express";
import {
  disqualifyParticipant,
  overrideLevelResult,
  listParticipants,
  listSubmissions,
  listQuestionPools,
} from "../controllers/admin.controller.js";

const router = express.Router();

// GET /api/admin/question-pool
router.get("/question-pool", listQuestionPools);

// GET /api/admin/participant/:contestId
router.get("/participant/:contestId", listParticipants);

// PUT /api/admin/participant/:participantId/disqualify
router.put("/participant/:participantId/disqualify", disqualifyParticipant);

// PUT /api/admin/attempt/:attemptId/override
router.put("/attempt/:attemptId/override", overrideLevelResult);

// GET /api/admin/:contestId/:participantId
router.get("/:contestId/:participantId", listSubmissions);

export default router;
