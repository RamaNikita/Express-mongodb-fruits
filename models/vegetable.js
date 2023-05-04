const { Schema, model } = require("mongoose");
const veggieSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  readyToEat: Boolean,
});
const Veggie = model("Veggie", veggieSchema);

module.exports = Veggie;
