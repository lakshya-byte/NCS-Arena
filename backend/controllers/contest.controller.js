import { Contest } from "../models/Contest.js";

export const createContest = async (req, res) => {
  try {
    const contest = await Contest.create(req.body);

    res.status(201).json({
      success: true,
      message: "Contest created successfully",
      contest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find().sort({ startTime: 1 });

    res.status(200).json({
      success: true,
      contests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
