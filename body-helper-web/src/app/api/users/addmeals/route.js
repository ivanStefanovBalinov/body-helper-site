const { NextResponse } = require("next/server");
const { default: connectDB } = require("../../../../../db/connectdb");
const { default: User } = require("../../../../../db/models/User.Schema");

export async function POST(request) {
  const {
    email,
    breakfastCalories,
    lunchCalories,
    snackCalories,
    dinnerCalories,
    date,
  } = await request.json();

  await connectDB();

  const user = await User.findOne({ email: email });
  console.log("USER:", user);
  if (!user) {
    return NextResponse.json(
      {
        message: "User not founded",
        success: false,
      },
      { status: 404 }
    );
  }

  const newMealsDetails = {
    breakfastCalories: breakfastCalories,
    lunchCalories: lunchCalories,
    snackCalories: snackCalories,
    dinnerCalories: dinnerCalories,
    date: date,
  };

  console.log("NEW DATA:", newMealsDetails);

  await user.historyOfMeals.push(newMealsDetails);

  await user.save();

  return NextResponse.json({ newMealsDetails, success: true }, { status: 200 });
}
