import { NextResponse } from "next/server";
import User from "../../../../../db/models/User.Schema";
import connectDB from "../../../../../db/connectdb";

export async function POST(request) {
  const { email } = await request.json();
  await connectDB();
  const user = await User.findOne({ email: email });

  if (!user) {
    return NextResponse.json(
      { message: "User not found", success: false },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { data: user.historyOfMeals, success: true },
    { status: 200 }
  );
}
