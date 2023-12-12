"use server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "../db/connectdb";
import Article from "../db/models/Article.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import xss from "xss";
import slugify from "slugify";
import User from "../db/models/User.Schema";
import {
  getAllData,
  getDataBySlug,
  getLatestData,
  isInvalidText,
} from "./helperFunctions";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Create Article function

export async function createArticle(prevState, formData) {
  const article = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    content: formData.get("content"),
    sources: formData.get("sources"),
    author: formData.get("author"),
    image: formData.get("image"),
  };

  if (
    isInvalidText(article.title) ||
    isInvalidText(article.summary) ||
    isInvalidText(article.content) ||
    isInvalidText(article.author) ||
    isInvalidText(article.sources) ||
    !article.image ||
    article.image.size === 0
  ) {
    return {
      message: "Upload failed! Please check fields for missing data.",
    };
  }

  const arrayBuffer = await article.image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  cloudinary.uploader
    .upload_stream({}, async function (error, result) {
      if (error) {
        console.log(error);
        return;
      }
      const newArticle = {
        ...article,
        image: result.secure_url,
        slug: slugify(article.title, { lower: true }),
        content: xss(article.content),
      };

      await connectDB();
      await Article.create(newArticle);
      console.log("Article is uploaded successfully");
    })
    .end(buffer);

  revalidatePath("/", "layout");
  //Must change redirect path
  redirect("/blog");
}

//GET LATEST ARTICLES
export async function getLatestArticles() {
  return await getLatestData(Article, 4, "/");
}

//GET ALL ARTICLES
export async function getAllArticles() {
  return await getAllData(Article, "/blog");
}

//GET ARTICLE WITH SLUG
export async function getArticle(slug) {
  return await getDataBySlug(Article, slug);
}

//CREATE NEW COMMENT
export async function createArticleComment(commentInfo) {
  const { rating, comment, userEmail, slug } = commentInfo;

  await connectDB();

  const article = await Article.findOne({ slug: slug });
  const user = await User.findOne({ email: userEmail });

  const newComment = {
    name: user.username,
    rating: Number(rating),
    comment,
    user: user._id,
  };

  const isUserAlreadyComment = article.comments.find(
    (comment) => comment.user.toString() === user._id.toString()
  );

  if (isUserAlreadyComment) {
    return;
  }

  article.comments.push(newComment);

  article.numComments = article.comments.length;

  article.rating =
    article.comments.reduce((acc, currComment) => acc + currComment.rating, 0) /
    article.comments.length;

  await article.save();

  revalidatePath("/", "layout");
}
