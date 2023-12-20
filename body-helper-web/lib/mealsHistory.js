import { revalidatePath } from "next/cache";
import connectDB from "../db/connectdb";
import User from "../db/models/User.Schema";

//ADD MEAL TO TABLE
export async function addMealToTable(mealDetails) {
  const {
    breakfastCalories,
    lunchCalories,
    snackCalories,
    dinnerCalories,
    email,
  } = mealDetails;

  await connectDB();

  const user = await User.findOne({ email: email });

  if (!user) {
    return;
  }

  const newMealsDetails = {
    breakfastCalories: breakfastCalories,
    lunchCalories: lunchCalories,
    snackCalories: snackCalories,
    dinnerCalories: dinnerCalories,
  };

  user.historyOfMeals.push(newMealsDetails);

  await user.save();

  revalidatePath("/profile");
}
