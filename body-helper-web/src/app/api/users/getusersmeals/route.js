import { NextResponse } from "next/server";
import User from "../../../../../db/models/User.Schema";
import connectDB from "../../../../../db/connectdb";

export async function POST(request) {
  const { email, pageNumber } = await request.json();
  await connectDB();
  const user = await User.findOne({ email: email });

  if (!user) {
    return NextResponse.json(
      { message: "User not found", success: false },
      { status: 404 }
    );
  }

  const sortedData = user.historyOfMeals.sort(
    (prev, curr) => new Date(curr.date) - new Date(prev.date)
  );

  const pageSize = 10;
  const totalRecordedMeals = user.historyOfMeals.length;
  const pageCount = Math.ceil(totalRecordedMeals / pageSize);
  const currentPageNumber = pageNumber || 1;
  const startIndex = (currentPageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const data = sortedData.slice(startIndex, endIndex);
  const paginationData = {
    data: data,
    totalPages: pageCount,
    totalRecords: totalRecordedMeals,
    currentPage: pageNumber,
  };

  return NextResponse.json(
    {
      user: user,
      pagination: paginationData,
      success: true,
    },
    { status: 200 }
  );
}
