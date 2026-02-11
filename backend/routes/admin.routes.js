import express from "express";
import { disqualifyParticipant, overrideLevelResult } from "../controllers/admin.controller.js";

const router = express.Router();

// PUT /api/admin/participant/:participantId/disqualify
router.put(
  "/participant/:participantId/disqualify",
  disqualifyParticipant
);

router.put(
  "/attempt/:attemptId/override",
  overrideLevelResult
);

export default router;
