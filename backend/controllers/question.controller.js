import { level1Questions } from "../questions/level1.questions.js";
import { level2Questions } from "../questions/level2.questions.js";
import { level3Questions } from "../questions/level3.questions.js";
import { level4Questions } from "../questions/level4.questions.js";
import { level5Questions } from "../questions/level5.questions.js";

export const getQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;

    if (!questionId) {
      return res.status(400).json({
        success: false,
        message: "questionId is required",
      });
    }

    // Derive level from id: "l3q5" -> 3
    const level = Number(questionId.charAt(1));

    let questionPool;

    switch (level) {
      case 1:
        questionPool = level1Questions;
        break;
      case 2:
        questionPool = level2Questions;
        break;
      case 3:
        questionPool = level3Questions;
        break;
      case 4:
        questionPool = level4Questions;
        break;
      case 5:
        questionPool = level5Questions;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid question level",
        });
    }

    const question = questionPool.find((q) => q.id === questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Return only what frontend needs (NEVER tests)
    return res.status(200).json({
      success: true,
      question: {
        id: question.id,
        title: question.title,
        problem: question.problem,
        hints: question.hints || [],
      },
    });
  } catch (err) {
    console.error("Error fetching question:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
