import { LevelAttempt } from "../models/LevelAttempt.js";

export const startLevel = async (req, res) => {
  try {
    const { contestId, participantId, level } = req.body;

    // Try to find existing attempt
    let attempt = await LevelAttempt.findOne({
      contestId,
      participantId,
      level,
    });

    // If first time opening this level, create record
    if (!attempt) {
      attempt = await LevelAttempt.create({
        contestId,
        participantId,
        level,
        startTime: new Date(),
      });
    }

    res.status(200).json({
      success: true,
      message: "Level timer started",
      attempt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
