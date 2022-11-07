import asyncHandler from "express-async-handler";
import Organisation from "../Models/Organisation";

const getAllOrganisations = asyncHandler(async (req, res) => {
  const orgainisations = await Organisation.find();
  res.json({ orgainisations });
});

const createOrganisation = asyncHandler(async (req, res) => {
  const body = req.body;
  const organisation = await Organisation.create(body);

  res.status(201).json({
    success: true,
    organisation,
    message: "Created organisation",
  });
});

export { getAllOrganisations, createOrganisation };
