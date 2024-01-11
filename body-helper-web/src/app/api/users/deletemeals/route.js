import { NextResponse } from "next/server";
import connectDB from "../../../../../db/connectdb";
import User from "../../../../../db/models/User.Schema";

export async function DELETE(request) {
  const { id, email } = await request.json();

  await connectDB();

  const user = await User.findOne({ email: email });

  if (!user) {
    return NextResponse.json(
      {
        message: "User not founded",
        success: false,
      },
      { status: 404 }
    );
  }

  const filteredHistory = user.historyOfMeals.filter(
    (meal) => meal._id.toString() !== id
  );

  user.historyOfMeals = filteredHistory;

  await user.save();

  return NextResponse.json(
    { message: "Data successfully updated", success: true },
    { status: 200 }
  );
}
