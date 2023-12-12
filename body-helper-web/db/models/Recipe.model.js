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
    content: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    rating: {
      type: String,
      required: true,
      default: 0,
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

const Recipe =
  mongoose.models.Recipe || mongoose.model("Article", recipeSchema);
export default Recipe;
