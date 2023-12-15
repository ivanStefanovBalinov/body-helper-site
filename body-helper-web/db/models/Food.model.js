import mongoose, { Schema } from "mongoose";

const foodSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
    default: 0,
  },
  protein: {
    type: Number,
    required: true,
    default: 0,
  },
  carbs: {
    type: Number,
    required: true,
    default: 0,
  },
  fat: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);
export default Food;
