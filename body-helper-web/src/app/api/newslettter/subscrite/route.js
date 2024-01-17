import { NextResponse } from "next/server";
import Subscription from "../../../../../db/models/Subscription.model";

export async function POST(request) {
  const { email } = await request.json();

  const subscription = await Subscription.create({ email });

  if (!subscription) {
    return NextResponse(
      { message: "This Email is already subscribed", success: false },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { message: "Your subscription is accepted!", success: true },
    { status: 200 }
  );
}
