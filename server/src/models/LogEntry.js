const mongoose = require("mongoose");
const { Schema } = mongoose;

let defaultDate = {
  type: Date,
  default: Date.now,
  required: true,
};

let defaultNumber = {
  type: Number,
  required: true,
};

let logEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  comments: String,
  rating: {
    type: Number,
    min: [0, "A bit too low"],
    max: [10, "Seems overrated"],
    default: 0,
  },
  image: String,
  latitude: defaultNumber,
  longitude: defaultNumber,
  created_at: defaultDate,
  updated_at: defaultDate,
});
