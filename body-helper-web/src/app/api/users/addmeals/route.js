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

  await user.historyOfMeals.push(newMealsDetails);

  await user.save();

  return NextResponse.json({ newMealsDetails, success: true }, { status: 200 });
}

export async function PUT(request) {
  const {
    email,
    breakfastCalories,
    lunchCalories,
    snackCalories,
    dinnerCalories,
    date,
    id,
  } = await request.json();

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

  const index = user.historyOfMeals.findIndex((meal) => meal.id === id);

  if (index === -1) {
    return NextResponse.json(
      {
        message: "Data not founded",
        success: false,
      },
      { status: 404 }
    );
  }

  user.historyOfMeals[index] = {
    breakfastCalories: breakfastCalories,
    lunchCalories: lunchCalories,
    snackCalories: snackCalories,
    dinnerCalories: dinnerCalories,
    date: date,
  };

  await user.save();

  return NextResponse.json(
    { message: "Data successfully updated", success: true },
    { status: 200 }
  );
}
