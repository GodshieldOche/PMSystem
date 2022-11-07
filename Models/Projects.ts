import mongoose, { Types } from "mongoose";

const projectModel = new mongoose.Schema({
  organisation: {
    type: Types.ObjectId,
    require: true,
    ref: "organisation",
  },
  issues: [
    {
      issuesId: {
        type: Types.ObjectId,
        required: true,
        ref: "issue",
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
  team: [
    {
      userId: {
        type: Types.ObjectId,
        required: true,
        ref: "user",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project ||
  mongoose.model("Project", projectModel);
