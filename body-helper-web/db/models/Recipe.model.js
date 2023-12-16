import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
      default: 0,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    summary: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    calories: {
      type: String,
      required: true,
    },
    protein: {
      type: String,
      required: true,
    },
    fats: {
      type: String,
      required: true,
    },
    carbs: {
      type: String,
      required: true,
    },
    fiber: {
      type: String,
      required: true,
    },
    sugar: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    rating: {
      type: String,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    numComments: {
      type: Number,
      required: true,
      default: 0,
    },
    author: {
      type: String,
      default: "Body Helper Team",
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);
export default Recipe;
