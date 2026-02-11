import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
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

    html: {
      type: String,
      required: true,
    },
    css: {
      type: String,
      // required: true,
    },
    js: {
      type: String,
      // required: true,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    result: {
      type: String,
      enum: ["accepted", "rejected"],
      default: "rejected",
    },
  },
  { timestamps: true }
);

export const Submission = mongoose.model(
  "Submission",
  submissionSchema
);
