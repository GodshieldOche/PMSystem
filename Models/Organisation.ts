import mongoose, { Types } from "mongoose";

const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  projects: [
    {
      projectId: {
        type: Types.ObjectId,
        required: true,
        ref: "project",
      },
    },
  ],
  members: [
    {
      userId: {
        type: Types.ObjectId,
        required: true,
        ref: "user",
      },
    },
  ],
  invites: [
    {
      email: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  superAdmin: {
    type: Types.ObjectId,
    require: true,
    ref: "user",
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Organisation ||
  mongoose.model("Organisation", organisationSchema);
