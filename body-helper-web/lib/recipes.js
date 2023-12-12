"use server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "../db/connectdb";
import Recipe from "../db/models/Recipe.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import xss from "xss";
import slugify from "slugify";
import { isInvalidText } from "./helperFunctions";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createRecipe(prevState, formData) {
  const recipe = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
    author: formData.get("author"),
    image: formData.get("image"),
  };

  if (
    isInvalidText(recipe.title) ||
    isInvalidText(recipe.summary) ||
    isInvalidText(recipe.ingredients) ||
    isInvalidText(recipe.author) ||
    isInvalidText(recipe.ingredients) ||
    !recipe.image ||
    recipe.image.size === 0
  ) {
    return {
      message: "Upload failed! Please check fields for missing data.",
    };
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
        content: xss(recipe.content),
      };

      await connectDB();
      await Recipe.create(newArticle);
      console.log("Article is uploaded successfully");
    })
    .end(buffer);

  revalidatePath("/", "layout");

  //   redirect("/blog");
}
