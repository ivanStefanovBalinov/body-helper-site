import { NextResponse } from "next/server";
import Recipe from "../../../../../db/models/Recipe.model";

export async function GET(request, context) {
  const { params } = context;
  const slug = params.slug;

  const recipe = await Recipe.find({ slug: slug });

  if (!recipe) {
    return NextResponse.json(
      { message: "Recipe not found", success: false },
      { status: 404 }
    );
  }
  return NextResponse.json({ data: recipe, success: true }, { status: 200 });
}

export async function PUT(request, context) {
  const { params } = context;
  const slug = params.slug;
  const {
    title,
    summary,
    ingredients,
    instructions,
    calories,
    protein,
    fats,
    carbs,
    fiber,
    sugar,
    author,
    category,
  } = await request.json();

  const recipe = await Recipe.find({ slug: slug });

  if (!recipe) {
    return NextResponse.json(
      { message: "recipe not found", success: false },
      { status: 404 }
    );
  }

  const updateRecipe = {
    ...recipe,
    title: title,
    summary: summary,
    author: author,
    ingredients: ingredients,
    instructions: instructions,
    calories: calories,
    protein: protein,
    fats: fats,
    carbs: carbs,
    fiber: fiber,
    sugar: sugar,
    category: category,
  };

  const filter = { slug: slug };

  const update = await Recipe.findOneAndUpdate(filter, updateRecipe, {
    new: true,
  });

  if (!update) {
    return NextResponse.json(
      { message: "Recipe Update Failed", success: false },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Recipe updated.", success: true },
    { status: 200 }
  );
}

export async function DELETE(request, context) {
  const { params } = context;
  const slug = params.slug;

  const recipe = await Recipe.findOneAndDelete({ slug: slug });

  if (!recipe) {
    return NextResponse.json(
      { message: "Recipe not found", success: false },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { message: "Recipe was deleted successfully.", success: true },
    { status: 200 }
  );
}
