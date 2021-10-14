import express from "express";
import { getScores, saveScore } from "../controllers/score.js";

const router = express.Router();

router.get("/", getScores);
router.post("/", saveScore);

export default router;
