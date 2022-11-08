import mongoose, { Types } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [50, "your name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Your password must be longer than 6 characters"],
  },
  organisations: [
    {
      organisationId: {
        type: Types.ObjectId,
        required: true,
        ref: "organisation",
      },
    },
  ],
  inbox: [
    {
      name: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      organisation: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
      },
      status: {
        type: String,
        default: "PENDING",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  assigned: {
    type: Number,
    default: 0,
  },
  workingOn: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models.User || mongoose.model("User", userSchema);
