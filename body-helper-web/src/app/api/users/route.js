import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ message: "GET ALL USERS" });
}

export async function POST(request) {
  return NextResponse.json({ message: "CREATE USER" });
}

export async function PUT(request) {
  return NextResponse.json({ message: "UPDATE USER" }, { status: 201 });
}

export async function DELETE(request) {
  return NextResponse.json({ message: "DELETE USER" });
}
