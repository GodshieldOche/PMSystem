import asyncHandler from "express-async-handler";
import { BadRequestError } from "../errors/bad-request";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import Organisation from "../Models/Organisation";
import Projects from "../Models/Projects";
import User from "../Models/User";

const getAllOrganisations = asyncHandler(async (req, res) => {
  const orgainisations = await Organisation.find();
  res.json({ orgainisations });
});

const createOrganisation = asyncHandler(async (req, res) => {
  const body = req.body;
  const organisation = await Organisation.create(body);

  organisation.members.push({ userId: req.user?._id });

  await organisation.save();

  const user = await User.findById(req.user?._id);

  user.organisations.push({ organisationId: organisation._id });

  await user.save();

  res.status(201).json({
    success: true,
    organisation,
    message: "Created organisation",
  });
});

const getOrganisation = asyncHandler(async (req, res) => {
  const organisation = await Organisation.findById(req.query.id)
    .populate({
      path: "members.userId",
      select: "fullName email workingOn assigned",
      model: User,
    })
    .populate({
      path: "projects.projectId",
      select: "name description team issues",
      model: Projects,
    });

  res.status(200).json({
    success: true,
    organisation,
    message: "Successful",
  });
});

const addMemebers = asyncHandler(async (req, res) => {
  const { email, organisationId } = req.body;
  const organisation = await Organisation.findById(organisationId);
  const user = await User.findOne({ email });

  if (organisation.superAdmin.toString() !== req.user?._id.toString()) {
    throw new NotAuthorizedError();
  }

  if (!email) {
    throw new BadRequestError("Invalid Email");
  }

  organisation.invites.push({ email });

  await organisation.save();

  user.inbox.push({
    name: req.user?.fullName,
    message: `${req.user?.fullName} has invited you to join ${organisation.name}`,
    organisation: organisation._id,
  });

  await user.save();

  res.status(200).json({
    success: true,
    user,
    organisation,
    message: "Created organisation",
  });
});

export {
  getAllOrganisations,
  createOrganisation,
  addMemebers,
  getOrganisation,
};
