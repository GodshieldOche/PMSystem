import asyncHandler from "express-async-handler";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import Issues from "../Models/Issues";
import Organisation from "../Models/Organisation";
import Project from "../Models/Projects";
import User from "../Models/User";

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

  organisation.projects.push({ projectId: project._id });

  await organisation.save();

  res.status(201).json({
    success: true,
    project,
    organisation,
    message: "Created Project",
  });
});

const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.query.id)
    .populate({
      path: "team.userId",
      select: "fullName email workingOn assigned",
      model: User,
    })
    .populate({
      path: "issues.issuesId",
      select: "name description status issues deadline",
      model: Issues,
    });

  res.status(200).json({
    success: true,
    project,
    message: "Successful",
  });
});

export { getAllProjects, createProject, getProject };
