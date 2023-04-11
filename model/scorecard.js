const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreCardSchema = new Schema({
  matchId: {
    type: Number,
    required: false,
  },
  teamA: {
    type: String,
    required: false,
  },
  teamB: {
    type: String,
    required: false,
  },
  teamAScore: {
    type: String,
    required: false,
  },
  teamBScore: {
    type: String,
    required: false,
  },
  summary: {
    type: Array,
    required: false,
  },
  batsmenAStats: {
    type: Array,
    required: false,
  },
  batsmenBStats: {
    type: Array,
    required: false,
  },
  bowlerAStats: {
    type: Array,
    required: false,
  },
  bowlerBStats: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("scorecard", ScoreCardSchema);
