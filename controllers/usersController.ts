import User from "../Models/User";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request";
import Organisation from "../Models/Organisation";
import { NotAuthorizedError } from "../errors/not-authorized-error";

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ currentUser: req.user || null });
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

const acceptInvite = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  const organisation = await Organisation.findById(req.body.organisation);

  const notInvited = organisation.invites.find(
    (item: any) => item.email.toString() === req?.user?.email.toString()
  );

  if (!notInvited) {
    throw new NotAuthorizedError();
  }

  let alreadyMemeber;

  alreadyMemeber = organisation.members.find(
    (item: any) => item.userId.toString() === req.user?._id.toString()
  );

  // Add user to organisation
  if (!alreadyMemeber) {
    organisation.members.push({ userId: req.user?._id });
  }

  organisation.invites.forEach((item: any) => {
    if (item.email.toString() === req?.user?.email.toString()) {
      return (item.status = "ACCEPTED");
    }
  });

  await organisation.save();

  alreadyMemeber = user.organisations.find(
    (item: any) =>
      item.organisationId.toString() === organisation._id.toString()
  );

  if (!alreadyMemeber) {
    user.organisations.push({ organisationId: organisation._id });
  }

  user.inbox.forEach((item: any) => {
    if (item.organisation.toString() === req.body.organisation.toString()) {
      return (item.status = "ACCEPTED");
    }
  });

  await user.save();

  res.status(200).json({
    success: true,
    user,
    organisation,
    message: "Accepted Invitation",
  });
});

export { getCurrentUser, registerUser, loginUser, acceptInvite };
