"use server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "../db/connectdb";
import Recipe from "../db/models/Recipe.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import xss from "xss";
import slugify from "slugify";
import {
  createComment,
  getAllData,
  getDataBySlug,
  getLatestData,
  isInvalidText,
} from "./helperFunctions";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createRecipe(formData) {
  const recipe = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
    calories: formData.get("calories"),
    protein: formData.get("protein"),
    fats: formData.get("fats"),
    carbs: formData.get("carbs"),
    fiber: formData.get("fiber"),
    sugar: formData.get("sugar"),
    author: formData.get("author"),
    image: formData.get("image"),
    category: formData.get("category"),
  };

  if (
    isInvalidText(recipe.title) ||
    isInvalidText(recipe.summary) ||
    isInvalidText(recipe.ingredients) ||
    isInvalidText(recipe.author) ||
    isInvalidText(recipe.ingredients) ||
    isInvalidText(recipe.carbs) ||
    isInvalidText(recipe.calories) ||
    isInvalidText(recipe.protein) ||
    isInvalidText(recipe.fats) ||
    isInvalidText(recipe.fiber) ||
    isInvalidText(recipe.sugar) ||
    !recipe.image ||
    recipe.image.size === 0
  ) {
    throw new Error("Upload failed! Please check fields for missing data.");
  }

  const arrayBuffer = await recipe.image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  cloudinary.uploader
    .upload_stream({}, async function (error, result) {
      if (error) {
        console.log(error);
        return;
      }
      const newArticle = {
        ...recipe,
        image: result.secure_url,
        slug: slugify(recipe.title, { lower: true }),
        ingredients: xss(recipe.ingredients),
        instructions: xss(recipe.instructions),
      };

      await connectDB();
      await Recipe.create(newArticle);
      console.log("Article is uploaded successfully");
    })
    .end(buffer);

  revalidatePath("/", "layout");

  // redirect("/recipes");
}

//GET LATEST RECIPES
export async function getLatestRecipes() {
  return await getLatestData(Recipe, 6, "/");
}

//GET ALL RECIPES
export async function getAllRecipes() {
  return await getAllData(Recipe, "/blog");
}

//GET RECIPES WITH SLUG
export async function getRecipe(slug) {
  return await getDataBySlug(Recipe, slug);
}

//POST COMMENT FOR RECIPE
export async function commentRecipe(commentInfo) {
  return await createComment(Recipe, commentInfo);
}

//GET RECIPES BY CATEGORY
export async function getRecipesByCategory(slug) {
  connectDB();
  const recipes = await Recipe.find({});

  if (!recipes) {
    throw new Error("Resources was not founded");
  }

  const recipesByCategory = recipes.filter(
    (recipe) => recipe.category === slug
  );

  if (!recipesByCategory) {
    throw new Error("Recipes in this category not founded");
  }

  return recipesByCategory;
}
