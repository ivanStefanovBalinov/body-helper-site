import { NextResponse } from "next/server";
import connectDB from "../../../../db/connectdb";
import Article from "../../../../db/models/Article.model";

export async function GET(request) {
  await connectDB();
  const articles = await Article.find({});

  if (!articles) {
    return NextResponse(
      { message: "Articles not found", success: false },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: articles, success: true }, { status: 200 });
}
