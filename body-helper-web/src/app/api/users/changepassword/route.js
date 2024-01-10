const { NextResponse } = require("next/server");
import connectDB from "../../../../../db/connectdb";
import User from "../../../../../db/models/User.Schema";

export async function PUT(request) {
  connectDB();

  const { email, newPassword, currentPassword } = await request.json();
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return NextResponse.json(
      { message: "User not found!", success: false },
      { status: 404 }
    );
  }

  if (!(await user.comparePassword(currentPassword))) {
    return NextResponse.json(
      { message: "Password is incorrect", success: false },
      { status: 401 }
    );
  }
  user.password = newPassword;
  await user.save();
  return NextResponse.json(
    {
      message: "Password changed successfully",

      success: true,
    },
    { status: 201 }
  );
}
