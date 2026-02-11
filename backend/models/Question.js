import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    level: {
      type: Number,   // 1 to 5
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    problemStatement: {
      type: String,
      required: true,
    },
    starterHTML: {
      type: String,
      default: "",
    },
    starterCSS: {
      type: String,
      default: "",
    },
    starterJS: {
      type: String,
      default: "",
    },

    // basic auto-grading tests (we’ll refine later)
    tests: [
      {
        type: String, // e.g. "must contain h1"
      },
    ],
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
