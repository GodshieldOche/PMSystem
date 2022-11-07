import User from "../Models/User";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ users });
});

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = await User.create({
    fullName,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    user,
    message: "registered User",
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  // checking if email doesn't exist
  if (!existingUser) {
    throw new BadRequestError("Invalid Credentials");
  }

  // compare passwords
  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    throw new BadRequestError("Invalid Credentials");
  }

  // Generation JWT and setting cookie
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    },
    process.env.SECRET!
  );

  res
    .status(200)
    .json({ message: "Success", data: existingUser, token: userJwt });
});

export { getAllUsers, registerUser, loginUser };
