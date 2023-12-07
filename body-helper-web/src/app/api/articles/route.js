import { NextResponse } from "next/server";
import connectDB from "../../../../db/connectdb";
import Article from "../../../../db/models/Article.model";

export async function GET(request) {
  connectDB();
  const articles = await Article.find({});
  if (!articles) {
    return NextResponse.json(
      { message: "Resource not NotFoundBoundary...", success: false },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: articles, success: true }, { status: 200 });
}

export async function POST(request) {
  const { title, image, content, author } = await request.json();
  await connectDB();
  const user = await Article.create({ title, image, content, author });
  if (!title || !image || !content) {
    return NextResponse.json(
      { message: "Registration Failed", success: false },
      { status: 400 }
    );
  }
  return NextResponse.json({ user, success: true }, { status: 201 });
}
