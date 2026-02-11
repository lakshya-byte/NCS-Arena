import { Participant } from "../models/Participant.js";

export const getLeaderboard = async (req, res) => {
  try {
    const { contestId } = req.params;

    const leaderboard = await Participant.find({
      contestId,
      status: { $ne: "disqualified" },
    })
      .sort({ levelsPassed: -1, totalTime: 1 })
      .select("name levelsPassed totalTime status");

    res.status(200).json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
