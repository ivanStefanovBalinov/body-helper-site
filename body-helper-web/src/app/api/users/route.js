import { NextResponse } from "next/server";
import connectDB from "../../../../db/connectdb";
import User from "../../../../db/models/User.Schema";

export async function POST(request) {
  const { username, name, email, password, image } = await request.json();
  await connectDB();
  const user = await User.create({ username, name, email, password });
  if (!username || !name || !email || !password) {
    return NextResponse.json(
      { message: "Registration Failed", success: false },
      { status: 400 }
    );
  }
  return NextResponse.json({ user, success: true }, { status: 201 });
}
