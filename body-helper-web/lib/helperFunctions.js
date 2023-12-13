import connectDB from "../db/connectdb";
import { revalidatePath } from "next/cache";
import User from "../db/models/User.Schema";
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

//POST COMMENT
export async function createComment(model, commentInfo) {
  const { rating, comment, userEmail, slug } = commentInfo;

  await connectDB();

  const modelTarget = await model.findOne({ slug: slug });
  const user = await User.findOne({ email: userEmail });

  const newComment = {
    name: user.username,
    rating: Number(rating),
    comment,
    user: user._id,
  };

  const isUserAlreadyComment = modelTarget.comments.find(
    (comment) => comment.user.toString() === user._id.toString()
  );

  if (isUserAlreadyComment) {
    return;
  }

  modelTarget.comments.push(newComment);

  modelTarget.numComments = modelTarget.comments.length;

  modelTarget.rating =
    modelTarget.comments.reduce(
      (acc, currComment) => acc + currComment.rating,
      0
    ) / modelTarget.comments.length;

  await modelTarget.save();

  revalidatePath("/", "layout");
}
