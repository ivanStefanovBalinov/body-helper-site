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

  //bmr - base metabolic rate
  const totalDailyEnergyExpenditure = (bmr, activityRate) =>
    Math.round(bmr * activityRate);

  const calcDeficit = (totalDailyEnergyExpenditure) =>
    Math.round(totalDailyEnergyExpenditure * 0.2);

  const calculateCaloriesDeficit = (totalDailyEnergyExpenditure, deficit) =>
    Math.round(totalDailyEnergyExpenditure - deficit);

  const dailyCalories = () => {
    if (gender === "male") {
      const basalMetabolicRate =
        10 * desireWeight + 6.25 * height - 5 * ages + 5;
      const maleTotalDailyEnergyExpenditure = totalDailyEnergyExpenditure(
        basalMetabolicRate,
        activity
      );
      const deficit = calcDeficit(maleTotalDailyEnergyExpenditure);

      if (Number(weight) < Number(desireWeight)) {
        return maleTotalDailyEnergyExpenditure;
      } else {
        return calculateCaloriesDeficit(
          maleTotalDailyEnergyExpenditure,
          deficit
        );
      }
    } else {
      const basalMetabolicRate =
        10 * desireWeight + 6.25 * height - 5 * ages - 161;
      const femaleTotalDailyEnergyExpenditure = totalDailyEnergyExpenditure(
        basalMetabolicRate,
        activity
      );

      const deficit = calcDeficit(femaleTotalDailyEnergyExpenditure);
      if (Number(weight) < Number(desireWeight)) {
        return femaleTotalDailyEnergyExpenditure;
      } else {
        return calculateCaloriesDeficit(
          femaleTotalDailyEnergyExpenditure,
          deficit
        );
      }
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
