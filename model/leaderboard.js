const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
  matches: { type: String, required: true },
  innings: { type: String, required: true },
  runs: { type: String, required: true },
  highest: { type: String, required: true },
  average: { type: String, required: true },
  strikeRate: { type: String, required: true },
  sixes: { type: String, required: true },
  fours: { type: String, required: true },
  fifty: { type: String, required: true },
  hundred: { type: String, required: true },
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

module.exports = Leaderboard;
