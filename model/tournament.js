const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  tournament: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("Tournament", tournamentSchema);
