import { level1Questions } from "../questions/level1.questions.js";
import { level2Questions } from "../questions/level2.questions.js";
import { level3Questions } from "../questions/level3.questions.js";
import { level4Questions } from "../questions/level4.questions.js";
import { level5Questions } from "../questions/level5.questions.js";

export const getQuestionById = (req, res) => {
  const { questionId } = req.params;

  const allQuestions = [
    ...level1Questions,
    ...level2Questions,
    ...level3Questions,
    ...level4Questions,
    ...level5Questions,
  ];

  const q = allQuestions.find(q => q.id === questionId);

  if (!q) {
    return res.status(404).json({ success: false, message: "Question not found" });
  }

  res.json({
    success: true,
    question: {
      id: q.id,
      title: q.title,
      problem: q.problem
    }
  });
};
