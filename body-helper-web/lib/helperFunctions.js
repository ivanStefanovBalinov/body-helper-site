import connectDB from "../db/connectdb";
import { revalidatePath } from "next/cache";
//VALIDATE STRING
export function isInvalidText(text) {
  return !text || text.trim() === "";
}

//GET LATEST DATA FROM DB
export async function getLatestData(model, itemsCount, revalidatePathParam) {
  await connectDB();
  const data = await model.find({});
  const latestData = data.reverse().slice(0, itemsCount);

  revalidatePath(revalidatePathParam);
  return latestData;
}

//GET ALL DATA FOR REFERRED TO DB MODEL
export async function getAllData(model, revalidatePathParam) {
  await connectDB();
  const data = await model.find({});

  revalidatePath(revalidatePathParam);
  return data;
}

//GET DATA FROM REFERRED DB MODEL BY SLUG
export async function getDataBySlug(model, slug) {
  await connectDB();
  const data = await model.findOne({ slug: slug });

  return data;
}
