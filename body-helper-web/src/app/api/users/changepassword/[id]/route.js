const { NextResponse } = require("next/server");
import connectDB from "../../../../../../db/connectdb";
import User from "../../../../../../db/models/User.model";

export async function PUT(request, { params }) {
  //Alternative way to get Id from context is to destructure it in params of function
  const { id } = params;
  connectDB();
  const body = await request.json();
  const user = await User.findById(id).select("+password");
  if (!user) {
    return NextResponse.json(
      { message: "User not found!", success: false },
      { status: 404 }
    );
  }

  if (!(await user.comparePassword(body.password))) {
    return NextResponse.json(
      { message: "Password is incorrect", success: false },
      { status: 401 }
    );
  }
  user.password = body.newPassword;
  await user.save();
  return NextResponse.json(
    {
      data: {
        message: "Password changed successfully",
      },
      success: true,
    },
    { status: 201 }
  );
}
