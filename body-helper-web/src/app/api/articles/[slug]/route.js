import { NextResponse } from "next/server";
import connectDB from "../../../../../db/connectdb";
import Article from "../../../../../db/models/Article.model";

export async function GET(request, context) {
  const { params } = context;
  const slug = params.slug;

  const article = await Article.find({ slug: slug });

  if (!article) {
    return NextResponse.json(
      { message: "Article not found", success: false },
      { status: 404 }
    );
  }
  return NextResponse.json({ data: article, success: true }, { status: 200 });
}

export async function PUT(request, context) {
  const { params } = context;
  const slug = params.slug;
  const { title, summary, author, sources, content } = await request.json();

  const article = await Article.find({ slug: slug });

  if (!article) {
    return NextResponse.json(
      { message: "Article not found", success: false },
      { status: 404 }
    );
  }

  const updateArticle = {
    ...article,
    title: title,
    summary: summary,
    author: author,
    sources: sources,
    content: content,
  };

  const filter = { slug: slug };

  const update = await Article.findOneAndUpdate(filter, updateArticle, {
    new: true,
  });

  if (!update) {
    return NextResponse.json(
      { message: "Article Update Failed", success: false },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Article updated.", success: true },
    { status: 200 }
  );
}

export async function DELETE(request, context) {
  const { params } = context;
  const slug = params.slug;

  const article = await Article.findOneAndDelete({ slug: slug });

  if (!article) {
    return NextResponse.json(
      { message: "Article not found", success: false },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { message: "Article was deleted successfully.", success: true },
    { status: 200 }
  );
}
