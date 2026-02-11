import mongoose from "mongoose";

const levelAttemptSchema = new mongoose.Schema(
  {
    participantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant",
      required: true,
      index: true,
    },
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
      index: true,
    },
    level: {
      type: Number, // 1 to 5
      required: true,
      index: true,
    },

    // timing fields
    startTime: {
      type: Date,      // when user opened the level
      required: true,
    },
    firstSubmitTime: {
      type: Date,
      default: null,
    },
    bestSubmitTime: {
      type: Date,
      default: null,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    autoResult: {
      type: String,
      enum: ["accepted", "rejected"],
      default: "rejected",
    },

    adminResult: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

levelAttemptSchema.index(
  { participantId: 1, contestId: 1, level: 1 },
  { unique: true }
);

export const LevelAttempt = mongoose.model(
  "LevelAttempt",
  levelAttemptSchema
);
