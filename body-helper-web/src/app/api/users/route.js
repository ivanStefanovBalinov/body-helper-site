import { NextResponse } from "next/server";
import connectDB from "../../../../db/connectdb";
import User from "../../../../db/models/User.Schema";
import { dailyCaloriesCalculation } from "../../../../lib/calculateDailyCalories";

export async function GET(request) {
  await connectDB();
  const users = await User.find({});

  if (!users) {
    return NextResponse(
      { message: "Users not found", success: false },
      { status: 404 }
    );
  }
  return NextResponse.json({ data: users, success: true }, { status: 200 });
}

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

export async function PUT(request) {
  const { height, weight, email, ages, desireWeight, gender, activity } =
    await request.json();

  await connectDB();

  const dailyCalories = dailyCaloriesCalculation(
    gender,
    desireWeight,
    height,
    ages,
    weight,
    activity
  );

  const filter = { email: email };
  const update = {
    height: height,
    weight: weight,
    ages: ages,
    desireWeight: desireWeight,
    gender: gender,
    activity: activity,
    dailyCalories: dailyCalories,
  };

  const user = await User.findOneAndUpdate(filter, update, {
    new: true,
  });

  if (!user) {
    return NextResponse.json(
      { message: "Registration Failed", success: false },
      { status: 400 }
    );
  }
  return NextResponse.json({ user: user, success: true }, { status: 201 });
}
