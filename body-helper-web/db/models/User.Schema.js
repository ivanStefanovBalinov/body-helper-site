import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const mealsSchema = mongoose.Schema(
  {
    breakfastCalories: {
      type: Number,
      default: 0,
    },
    lunchCalories: {
      type: Number,
      default: 0,
    },
    snackCalories: {
      type: Number,
      default: 0,
    },
    dinnerCalories: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: Date.now().toString(),
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add username"],
      trim: true,
      maxlength: [20, "Name can not be more than 50 characters"],
    },
    name: {
      type: String,
      required: [true, "Please add username"],
      trim: true,
      maxlength: [20, "Name can not be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add valid email",
      ],
    },
    image: {
      type: String,
      default: "/images/default-user-avatar.png",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    ages: {
      type: Number,
    },
    desireWeight: {
      type: Number,
    },
    dailyCalories: {
      type: Number,
    },
    historyOfMeals: [mealsSchema],
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

mealsSchema.pre("save", function () {
  this.total =
    this.breakfastCalories +
    this.snackCalories +
    this.lunchCalories +
    this.dinnerCalories;
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
