import puppeteer from "puppeteer";
import { Submission } from "../models/Submission.js";
import { LevelAttempt } from "../models/LevelAttempt.js";
import { Participant } from "../models/Participant.js";
import { level1Questions } from "../questions/level1.questions.js";
import { getIO } from "../socket.js";

// pick correct test
function getQuestionTest(level, questionId) {
  if (level === 1) {
    const q = level1Questions.find((q) => q.id === questionId);
    if (!q) throw new Error("Invalid questionId for level 1");
    return q.tests;
  }
  throw new Error("Tests for this level not wired yet");
}

// run puppeteer
async function runPuppeteerTest(html, css, js, testFn) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const fullPage = `
    <!DOCTYPE html>
    <html>
      <head><style>${css}</style></head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;

  await page.setContent(fullPage, { waitUntil: "domcontentloaded" });
  const passed = await testFn(page);
  await browser.close();
  return passed;
}

export const submitLevel = async (req, res) => {
  try {
    const { contestId, participantId, level, questionId, html, css, js } =
      req.body;

    const attempt = await LevelAttempt.findOne({
      contestId,
      participantId,
      level,
    });

    if (!attempt) {
      return res.status(400).json({
        success: false,
        message: "Call /level/start first.",
      });
    }

    const testFn = getQuestionTest(level, questionId);
    const isAccepted = await runPuppeteerTest(html, css, js, testFn);

    const submission = await Submission.create({
      contestId,
      participantId,
      level,
      html,
      css: css || "",
      js: js || "",
      result: isAccepted ? "accepted" : "rejected",
    });

    attempt.attempts += 1;

    if (!attempt.firstSubmitTime) {
      attempt.firstSubmitTime = new Date();
    }

    let participant = await Participant.findById(participantId);

    if (isAccepted) {
      const timeTaken = new Date() - new Date(attempt.startTime);

      attempt.bestSubmitTime = new Date();
      attempt.autoResult = "accepted";

      participant.levelsPassed += 1;
      participant.totalTime += timeTaken;
      await participant.save();
    }

    await attempt.save();

    // -------- REALTIME LEADERBOARD EMIT (ROOM-BASED) --------
    const leaderboard = await Participant.find({ contestId })
      .sort({ levelsPassed: -1, totalTime: 1 })
      .select("name levelsPassed totalTime status");

    const room = `contest:${contestId}`;
    getIO().to(room).emit("leaderboard:update", leaderboard);
    // -------------------------------------------------------

    res.status(201).json({
      success: true,
      message: isAccepted ? "Accepted" : "Rejected",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
