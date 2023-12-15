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
