import mongoose, { Types } from "mongoose";

const SubIssue = new mongoose.Schema({
  issueId: {
    type: Types.ObjectId,
    require: true,
    ref: "issue",
  },
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
    require: true,
    default: "Todo",
  },
  assignedTo: {
    type: Types.ObjectId,
    ref: "user",
  },
});

export default mongoose.models.SubIssue || mongoose.model("SubIssue", SubIssue);
