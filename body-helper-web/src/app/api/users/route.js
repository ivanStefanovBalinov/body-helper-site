import { NextResponse } from "next/server";
import connectDB from "../../../../db/connectdb";
import User from "../../../../db/models/Users.model";

export async function GET(request) {
  connectDB();
  return NextResponse.json({ message: "GET ALL USERS" });
}

export async function POST(request) {
  const { username, email, password } = await request.json();
  await connectDB();
  const user = await User.create({ username, email, password });
  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "Registration Failed", success: false },
      { status: 400 }
    );
  }
  return NextResponse.json({ user, success: true }, { status: 201 });
}

export async function PUT(request) {
  return NextResponse.json({ message: "UPDATE USER" }, { status: 201 });
}

export async function DELETE(request) {
  return NextResponse.json({ message: "DELETE USER" });
}
