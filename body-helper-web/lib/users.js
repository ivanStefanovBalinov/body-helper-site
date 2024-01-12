"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "../db/connectdb";
import User from "../db/models/User.Schema";
import { isInvalidText } from "./helperFunctions";
import { v2 as cloudinary } from "cloudinary";
import { dailyCaloriesCalculation } from "./calculateDailyCalories";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function registerAccount(formData) {
  const user = {
    username: formData.get("username"),
    name: formData.get("name"),
    email: formData.get("email"),
    image: formData.get("image"),
    password: formData.get("password"),
    height: formData.get("height"),
    weight: formData.get("weight"),
    ages: formData.get("ages"),
    gender: formData.get("gender"),
    activity: formData.get("activity"),
    desireWeight: formData.get("desireWeight"),
  };

  if (
    isInvalidText(user.username) ||
    isInvalidText(user.name) ||
    isInvalidText(user.email) ||
    isInvalidText(user.password) ||
    isInvalidText(user.height) ||
    isInvalidText(user.weight) ||
    isInvalidText(user.ages) ||
    isInvalidText(user.gender) ||
    isInvalidText(user.activity) ||
    isInvalidText(user.desireWeight)
  ) {
    throw new Error(
      "Account Registration Failed! Please check fields for missing data."
    );
  }

  if (!user.image || user.image.size === 0) {
    user.image = undefined;
  }

  const dailyCalories = dailyCaloriesCalculation(
    user.gender,
    user.desireWeight,
    user.height,
    user.ages,
    user.weight,
    user.activity
  );

  const arrayBuffer = await user.image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  cloudinary.uploader
    .upload_stream({}, async function (error, result) {
      if (error) {
        console.log(error);
        return;
      }
      const newUser = {
        ...user,
        image: result.secure_url,
        dailyCalories: dailyCalories,
      };

      await connectDB();
      await User.create(newUser);
      console.log("Account was successfully created!");
    })
    .end(buffer);

  revalidatePath("/", "layout");
  redirect("/");
}
