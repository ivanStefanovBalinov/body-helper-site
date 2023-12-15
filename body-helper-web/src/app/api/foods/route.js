import { NextResponse } from "next/server";
import connectDB from "../../../../db/connectdb";
import Food from "../../../../db/models/Food.model";

export async function GET(request) {
  await connectDB();
  const foods = await Food.find({});

  if (!foods) {
    return NextResponse.json(
      { message: "Resource not found", success: false },
      { status: 404 }
    );
  }
  return NextResponse.json({ foods, success: true }, { status: 200 });
}

export async function POST(request) {
  const { value, calories, protein, fat, carbs } = await request.json();

  if (!value || !calories || !protein || !fat || !carbs) {
    return NextResponse.json(
      { message: "Adding new food failed", success: false },
      { status: 400 }
    );
  }

  await connectDB();
  const newFood = await Food.create({ value, calories, protein, fat, carbs });

  return NextResponse.json({ food: newFood, success: true }, { status: 201 });
}
