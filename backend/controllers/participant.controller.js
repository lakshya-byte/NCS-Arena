import { Participant } from "../models/Participant.js";

export const registerParticipant = async (req, res) => {
  try {
    const { contestId, name, rollNo, branch, year } = req.body;

    const participant = await Participant.create({
      contestId,
      name,
      rollNo,
      branch,
      year,
    });

    res.status(201).json({
      success: true,
      message: "Participant registered successfully",
      participant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const listParticipants = async (req, res) => {
  try {
    const { contestId } = req.params;

    const participants = await Participant.find({ contestId })
      .sort({ createdAt: 1 })
      .select(
        "name rollNo branch year status levelsPassed totalTime createdAt"
      );

    res.status(200).json({
      success: true,
      participants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
