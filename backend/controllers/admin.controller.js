import { Participant } from "../models/Participant.js";
import { getIO } from "../socket.js";
import { LevelAttempt } from "../models/LevelAttempt.js";

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

    res.status(200).json({
      success: true,
      message: "Participant disqualified",
      participant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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

    // If admin accepts and it was NOT already accepted
    if (adminResult === "accepted" && attempt.adminResult !== "accepted") {
      const timeTaken =
        new Date(attempt.bestSubmitTime || new Date()) -
        new Date(attempt.startTime);

      await Participant.findByIdAndUpdate(attempt.participantId, {
        $inc: {
          levelsPassed: 1,
          totalTime: timeTaken,
        },
      });
    }

    // If admin rejects and it WAS previously accepted, rollback score
    if (adminResult === "rejected" && attempt.adminResult === "accepted") {
      const timeTaken =
        new Date(attempt.bestSubmitTime || new Date()) -
        new Date(attempt.startTime);

      await Participant.findByIdAndUpdate(attempt.participantId, {
        $inc: {
          levelsPassed: -1,
          totalTime: -timeTaken,
        },
      });
    }

    attempt.adminResult = adminResult;
    await attempt.save();

    // -------- RECALCULATE + EMIT LEADERBOARD --------
    const participant = await Participant.findById(attempt.participantId);

    const leaderboard = await Participant.find({
      contestId: attempt.contestId,
    })
      .sort({ levelsPassed: -1, totalTime: 1 })
      .select("name levelsPassed totalTime status");

    const room = `contest:${attempt.contestId}`;
    getIO().to(room).emit("leaderboard:update", leaderboard);
    // -----------------------------------------------

    res.status(200).json({
      success: true,
      message: "Level result overridden",
      attempt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
