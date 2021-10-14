import score from "../models/score.js";

export const saveScore = async (req, res) => {
  const { time } = req.body;
  await score
    .create({ time })
    .then((result) => res.status(200).send({ message: "OK" }))
    .catch((error) => res.status(500).send({ error }));
};

export const getScores = async (req, res) => {
  await score.find({}).then((scores) => res.status(200).json({ scores }));
};
