import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },

    // leaderboard fields
    totalTime: {
      type: Number, // milliseconds
      default: 0,
    },
    levelsPassed: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "disqualified"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Participant = mongoose.model(
  "Participant",
  participantSchema
);
