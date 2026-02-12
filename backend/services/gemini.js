import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

/**
 * Strip ```json fences that Gemini often adds
 */
function sanitizeGeminiOutput(text) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

/**
 * BUILD GOD-LEVEL GRADING PROMPT
 */
export const buildGradingPrompt = ({
  level,
  questionTitle,
  questionProblem,
  html,
  css,
  js,
}) => `
You are a strict exam judge evaluating a frontend coding contest submission.

=============================
📌 CONTEST CONTEXT
=============================
Level: ${level}

Question Title:
"${questionTitle}"

Problem Description:
"""
${questionProblem}
"""

=============================
📄 STUDENT SUBMISSION
=============================

HTML:
"""
${html}
"""

CSS:
"""
${css || "— not provided —"}
"""

JavaScript:
"""
${js || "— not provided —"}
"""

=============================
🚨 YOUR JOB (CRITICAL RULES)
=============================

Judge ONLY against the problem requirements.

YOU MUST:
- Be strict, factual, and direct.
- Behave like an exam grader.
- Never give hints, examples, or code.
- Never explain how to solve the problem.
- Never be polite or motivational.

You can respond in ONLY TWO ways:

ACCEPTED CASE (exact JSON):
{
  "result": "accepted",
  "reason": "OK"
}

REJECTED CASE (exact JSON):
{
  "result": "rejected",
  "reason": "<single clear sentence of what is missing or wrong>"
}

=============================
FINAL INSTRUCTION
=============================
Return ONLY the JSON.
`;

/**
 * CALL GEMINI FOR GRADING
 */
export const evaluateWithGemini = async ({
  level,
  questionTitle,
  questionProblem,
  html,
  css,
  js,
}) => {
  const prompt = buildGradingPrompt({
    level,
    questionTitle,
    questionProblem,
    html,
    css,
    js,
  });

  try {
    const response = await model.generateContent(prompt);
    const raw = response.response.text();
    const clean = sanitizeGeminiOutput(raw);

    return JSON.parse(clean);
  } catch (err) {
    console.error("Gemini grading error:", err);

    // SPEC-COMPLIANT FALLBACK
    return {
      result: "pending",
      reason:
        "AI grading temporarily unavailable — submission queued for admin review.",
    };
  }
};
