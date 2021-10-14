import mongoose from "mongoose";
const { Schema, model } = mongoose;

const scoreSchema = new Schema(
  {
    id: String,
    time: String,
  },
  {
    collection: "score",
  }
);

const ScoreModel = model("Score", scoreSchema);

export default ScoreModel;
