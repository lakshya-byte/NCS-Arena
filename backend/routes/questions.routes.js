import express from "express";
import { getQuestionById } from "../controllers/question.controller.js";

const router = express.Router();

router.get("/:questionId", getQuestionById);

export default router;
