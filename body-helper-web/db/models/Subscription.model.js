import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add valid email",
    ],
  },
  {
    timestamps: true,
  }
);

const Subscription =
  mongoose.model.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
