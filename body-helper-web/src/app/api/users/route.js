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

export async function PUT(request) {
  const { height, weight, email, ages, desireWeight, gender, activity } =
    await request.json();

  await connectDB();

  const dailyCalories = () => {
    if (gender === "male") {
      const basalMetabolicRate =
        88.362 + 13.397 * desireWeight + 4.799 * height - 5.677 * ages;
      return Math.round(basalMetabolicRate * activity);
    } else {
      const basalMetabolicRate =
        447.593 + 9.247 * desireWeight + 3.098 * height - 4.33 * ages;
      return Math.round(basalMetabolicRate * activity);
    }
  };

  const filter = { email: email };
  const update = {
    height: height,
    weight: weight,
    ages: ages,
    desireWeight: desireWeight,
    gender: gender,
    activity: activity,
    dailyCalories: dailyCalories(),
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
