import { NextResponse } from "next/server";
import connectDB from "../../../../../db/connectdb";
import User from "../../../../../db/models/Users.model";

export async function POST(request) {
  const { email, password } = await request.json();
  await connectDB();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Please provide email and password!", success: false },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return NextResponse.json(
      { message: "Wrong credentials", success: false },
      { status: 401 }
    );
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return NextResponse.json(
      { message: "Wrong credentials", success: false },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: `User ${user.username} Sign in`, success: true },
    { status: 200 }
  );
}
