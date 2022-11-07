import asyncHandler from "express-async-handler";
import Organisation from "../Models/Organisation";
import Issues from "../Models/Issues";
import Projects from "../Models/Projects";
import { NotAuthorizedError } from "../errors/not-authorized-error";

const getAllIssues = asyncHandler(async (req, res) => {
  const issues = await Issues.find();
  res.json({ issues });
});

const creaetIssues = asyncHandler(async (req, res) => {
  const body = req.body;

  const project = await Projects.findById(body.projectId);

  console.log(project.team, req.body);
  if (project.team) {
    // let inTeam: boolean;
    project.team.forEach((item: any) => {
      if (item.userId.toString() !== req.user?._id.toString()) {
        throw new NotAuthorizedError();
      }
    });
  }

  const issue = await Issues.create(body);

  res.status(201).json({
    success: true,
    issue,
    message: "Created Issue",
  });
});

export { getAllIssues, creaetIssues };
