import asyncHandler from "express-async-handler";
import Organisation from "../Models/Organisation";
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
      model: Organisation,
    })
    .populate({
      path: "projects.projectId",
      select: "name description team issues",
      model: Organisation,
    });

  res.status(200).json({
    success: true,
    organisation,
    message: "Successful",
  });
});

const addMemebers = asyncHandler(async (req, res) => {
  const body = req.body;
  const organisation = await Organisation.create(body);

  organisation.members.push({ userId: req.user?._id });

  await organisation.save();

  const user = await User.findOne({ email: body.email });

  user.organisations.push({ organisationId: organisation._id });

  await user.save();

  res.status(201).json({
    success: true,
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
