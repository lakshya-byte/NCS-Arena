import express from "express";
import { registerParticipant , listParticipants} from "../controllers/participant.controller.js";

const router = express.Router();

// POST /api/participant/register
router.post("/register", registerParticipant);

// GET /api/participants/:contestId
router.get("/:contestId", listParticipants);

export default router;
