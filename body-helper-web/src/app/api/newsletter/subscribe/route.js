import { NextResponse } from "next/server";
import Subscription from "../../../../../db/models/Subscription.model";

export async function POST(request) {
  const { email } = await request.json();

  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org|net)$/i;
  const isValid = emailRegex.test(email);

  if (!email || !isValid) {
    return NextResponse(
      { message: "Invalid Email.", success: false },
      { status: 404 }
    );
  }

  const subscription = await Subscription.create({ email });

  if (!subscription) {
    return NextResponse(
      { message: "Subscription failed!", success: false },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { message: "Your subscription is accepted!", success: true },
    { status: 200 }
  );
}
