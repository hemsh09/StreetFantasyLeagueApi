const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  TeamAName: { type: String, required: true },
  TeamBName: { type: String, required: true },
  TeamAScore: { type: String, required: true },
  TeamBScore: { type: String, required: true },
  TeamWon: { type: String, required: true },
  WinRuns: { type: String, required: true },
  competition: { type: String, required: true },
  Date: { type: Date, required: true },
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
