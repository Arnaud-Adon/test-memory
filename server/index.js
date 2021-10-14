import express from "express";
import dotenv from "dotenv";
import scoreRouter from "./routes/score.route.js";
import path from "path";
import cors from "cors";

const app = express();
const api = express.Router();
const __dirname = path.resolve();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api", api);
api.use("/score", scoreRouter);
api.use("/images", express.static(path.join(__dirname, "images")));

export default app;
