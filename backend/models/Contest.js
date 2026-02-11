import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    levels: {
      type: [Number],
      required: true,
    },

    questions: [
      {
        level: {
          type: Number,
          required: true,
        },
        questionId: {
          type: String,
          required: true,
        },
      },
    ],

    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    overallTimeLimitMinutes: {
      type: Number,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Contest = mongoose.model("Contest", contestSchema);
