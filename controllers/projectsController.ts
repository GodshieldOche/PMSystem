import asyncHandler from "express-async-handler";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import Organisation from "../Models/Organisation";
import Project from "../Models/Projects";

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.json({ projects });
});

const createProject = asyncHandler(async (req, res) => {
  const body = req.body;
  const organisation: any = await Organisation.findById(body.organisation);

  if (organisation.superAdmin.toString() !== req.user?._id.toString()) {
    throw new NotAuthorizedError();
  }

  const project = await Project.create(body);

  project.team.push({ userId: req.user?._id });

  await project.save();

  res.status(201).json({
    success: true,
    project,
    message: "Created Project",
  });
});

export { getAllProjects, createProject };
