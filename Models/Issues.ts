import mongoose, { Types } from "mongoose";

const IssueModel = new mongoose.Schema({
  projectId: {
    type: Types.ObjectId,
    require: true,
    ref: "project",
  },
  subIssues: [
    {
      subIssuesId: {
        type: Types.ObjectId,
        required: true,
        ref: "subissues",
      },
    },
  ],
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Todo",
  },
  assignedTo: {
    type: Types.ObjectId,
    ref: "user",
  },
});

export default mongoose.models.Issue || mongoose.model("Issue", IssueModel);
