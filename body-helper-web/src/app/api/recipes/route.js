import { NextResponse } from "next/server";
import connectDB from "../../../../db/connectdb";
import Recipe from "../../../../db/models/Recipe.model";

export async function GET(request) {
  await connectDB();
  const recipes = await Recipe.find({});

  if (!recipes) {
    return NextResponse.json(
      { message: "Recipes not found", success: false },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: recipes, success: true }, { status: 200 });
}
