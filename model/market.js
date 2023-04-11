const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketSchema = new Schema({
  products: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("market", marketSchema);
