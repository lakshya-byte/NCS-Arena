import { Submission } from "../models/Submission.js";
import { LevelAttempt } from "../models/LevelAttempt.js";
import { Participant } from "../models/Participant.js";
import { evaluateWithGemini } from "../services/gemini.js";
import { getIO } from "../socket.js";

// Import real question pools
import { level1Questions } from "../questions/level1.questions.js";
import { level2Questions } from "../questions/level2.questions.js";
import { level3Questions } from "../questions/level3.questions.js";
import { level4Questions } from "../questions/level4.questions.js";
import { level5Questions } from "../questions/level5.questions.js";

const pools = {
  1: level1Questions,
  2: level2Questions,
  3: level3Questions,
  4: level4Questions,
  5: level5Questions,
};

export const submitLevel = async (req, res) => {
  try {
    const {
      contestId,
      participantId,
      level,
      questionId,
      html,
      css = "",
      js = "",
    } = req.body;

    // ---------- 1) Ensure level was started ----------
    const attempt = await LevelAttempt.findOne({
      contestId,
      participantId,
      level,
    });

    if (!attempt) {
      return res.status(400).json({
        success: false,
        message: "Call /api/level/start first",
      });
    }

    // ---------- 2) Load REAL question from curated pool ----------
    const pool = pools[level];

    if (!pool) {
      return res.status(400).json({
        success: false,
        message: "Invalid level",
      });
    }

    const question = pool.find((q) => q.id === questionId);

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Invalid questionId for this level",
      });
    }

    // ---------- 3) AI grading ----------
    const aiResult = await evaluateWithGemini({
      level,
      questionTitle: question.title,
      questionProblem: question.problem,
      html,
      css,
      js,
    });

    // console.log(aiResult);

    // ---------- 4) Save Submission (NEVER store 'pending') ----------
    const submissionResult =
      aiResult.result === "accepted" ? "accepted" : "rejected";

      const reason = aiResult.reason;

    const submission = await Submission.create({
      participantId,
      contestId,
      level,
      html,
      css,
      js,
      result: submissionResult,
      
      submittedAt: new Date(),
    });

    // If Gemini failed → mark attempt as pending for admin
    if (aiResult.result === "pending") {
      attempt.adminResult = "pending";
      await attempt.save();
    }

    // ---------- 5) If accepted → update score ----------
    if (aiResult.result === "accepted") {
      const participant = await Participant.findById(participantId);

      const timeTaken =
        Date.now() - new Date(attempt.startTime).getTime();

      participant.levelsPassed += 1;
      participant.totalTime += timeTaken;

      attempt.bestSubmitTime = new Date();
      attempt.autoResult = "accepted";

      await participant.save();
      await attempt.save();
    }

    // ---------- 6) Recompute leaderboard ----------
    const participants = await Participant.find({
      contestId,
      status: { $ne: "disqualified" },
    })
      .sort({ levelsPassed: -1, totalTime: 1 })
      .select("_id name levelsPassed totalTime status");

    // ---------- 7) Emit realtime update ----------
    const io = getIO();
    io.to(`contest:${contestId}`).emit("leaderboard:update", participants);

    // ---------- 8) Return result to frontend ----------
    return res.status(200).json({
      success: true,
      result: aiResult.result,
      reason: aiResult.reason,
      submissionId: submission._id,
    });
  } catch (err) {
    console.error("Submit error:", err);
    return res.status(500).json({
      success: false,
      message: "Submission failed",
    });
  }
};
