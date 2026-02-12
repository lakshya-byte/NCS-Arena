import { Participant } from "../models/Participant.js";
import { LevelAttempt } from "../models/LevelAttempt.js";
import { getIO } from "../socket.js";
import { Submission } from "../models/Submission.js";

import { level1Questions } from "../questions/level1.questions.js";
import { level2Questions } from "../questions/level2.questions.js";
import { level3Questions } from "../questions/level3.questions.js";
import { level4Questions } from "../questions/level4.questions.js";
import { level5Questions } from "../questions/level5.questions.js";

/* =========================================================
   1) LIST PARTICIPANTS + THEIR LEVEL ATTEMPTS
   GET /api/participant/:contestId   (admin version)
========================================================= */

export const listParticipants = async (req, res) => {
  try {
    const { contestId } = req.params;

    const participants = await Participant.find({ contestId })
      .sort({ createdAt: 1 })
      .select("name rollNo branch year status levelsPassed totalTime createdAt")
      .lean();

    const attempts = await LevelAttempt.find({ contestId }).lean();

    const enrichedParticipants = participants.map((p) => ({
      ...p,
      attempts: attempts.filter(
        (a) => String(a.participantId) === String(p._id),
      ),
    }));

    return res.status(200).json({
      success: true,
      participants: enrichedParticipants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   2) DISQUALIFY PARTICIPANT
   PUT /api/admin/participant/:participantId/disqualify
========================================================= */

export const disqualifyParticipant = async (req, res) => {
  try {
    const { participantId } = req.params;

    const participant = await Participant.findByIdAndUpdate(
      participantId,
      { status: "disqualified" },
      { new: true },
    );

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Participant not found",
      });
    }

    // YOUR RULE: invalidate all attempts
    await LevelAttempt.updateMany(
      { participantId },
      { adminResult: "rejected" },
    );

    // Recompute leaderboard (exclude disqualified)
    const leaderboard = await Participant.find({
      contestId: participant.contestId,
      status: { $ne: "disqualified" },
    })
      .sort({ levelsPassed: -1, totalTime: 1 })
      .select("name levelsPassed totalTime status");

    getIO()
      .to(`contest:${participant.contestId}`)
      .emit("leaderboard:update", leaderboard);

    return res.status(200).json({
      success: true,
      message: "Participant disqualified",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   3) OVERRIDE LEVEL RESULT
   PUT /api/admin/attempt/:attemptId/override
========================================================= */

export const overrideLevelResult = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { adminResult } = req.body; // "accepted" or "rejected"

    if (!["accepted", "rejected"].includes(adminResult)) {
      return res.status(400).json({
        success: false,
        message: "adminResult must be 'accepted' or 'rejected'",
      });
    }

    const attempt = await LevelAttempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Level attempt not found",
      });
    }

    const participant = await Participant.findById(attempt.participantId);

    // ===== CASE 1: ADMIN ACCEPT =====
    if (adminResult === "accepted" && attempt.adminResult !== "accepted") {
      const timeTaken = Date.now() - new Date(attempt.startTime).getTime();

      participant.levelsPassed += 1;
      participant.totalTime += timeTaken;
      await participant.save();
    }

    // ===== CASE 2: ADMIN REJECT (rollback if needed) =====
    if (adminResult === "rejected" && attempt.adminResult === "accepted") {
      const timeTaken = Date.now() - new Date(attempt.startTime).getTime();

      participant.levelsPassed -= 1;
      participant.totalTime -= timeTaken;
      await participant.save();
    }

    attempt.adminResult = adminResult;
    await attempt.save();

    // Recompute leaderboard (exclude disqualified)
    const leaderboard = await Participant.find({
      contestId: attempt.contestId,
      status: { $ne: "disqualified" },
    })
      .sort({ levelsPassed: -1, totalTime: 1 })
      .select("name levelsPassed totalTime status");

    getIO()
      .to(`contest:${attempt.contestId}`)
      .emit("leaderboard:update", leaderboard);

    return res.status(200).json({
      success: true,
      message: "Level result overridden",
      attempt,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const listSubmissions = async (req, res) => {
  try {
    const { contestId, participantId } = req.params;

    const submissions = await Submission.find({
      contestId,
      participantId,
    }).sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      submissions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =========================================================
   5) LIST QUESTION POOLS (for Create Contest dropdowns)
   GET /api/admin/question-pool
========================================================= */

const pools = {
  1: level1Questions,
  2: level2Questions,
  3: level3Questions,
  4: level4Questions,
  5: level5Questions,
};

export const listQuestionPools = (req, res) => {
  try {
    const result = {};
    for (const [level, questions] of Object.entries(pools)) {
      result[level] = questions.map((q) => ({ id: q.id, title: q.title }));
    }
    return res.status(200).json({ success: true, pools: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
