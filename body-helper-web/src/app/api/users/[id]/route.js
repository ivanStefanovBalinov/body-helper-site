import { NextResponse } from "next/server";
import connectDB from "../../../../../db/connectdb";
import User from "../../../../../db/models/Users.model";

export async function GET(request, context) {
  const { params } = context;
  const { id } = params;
  connectDB();
  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json(
      { message: "User not found!", success: false },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { data: { username: user.username, email: user.email }, success: true },
    { status: 200 }
  );
}

export async function PUT(request, { params }) {
  //Alternative way to get Id from context is to destructure it in params of function
  const { id } = params;
  connectDB();
  const body = await request.json();
  const user = await User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return NextResponse.json(
      { message: "User not found!", success: false },
      { status: 404 }
    );
  }
  return NextResponse.json(
    {
      data: {
        username: user.username,
        email: user.email,
        message: "User info successfully updated.",
      },
      success: true,
    },
    { status: 201 }
  );
}

export async function DELETE(request, { params }) {
  const { id } = params;
  connectDB();
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return NextResponse.json(
      { message: "User not found!", success: false },
      { status: 404 }
    );
  }
  return NextResponse.json(
    {
      data: {},
      success: true,
    },
    { status: 200 }
  );
}
