import nc from "next-connect";
import dbConnect from "../../../utils/dbConnect";
import onError from "../../../Middleware/errorHandler";
import {
  creaetIssues,
  getAllIssues,
} from "../../../controllers/issuesController";
import { currentUser } from "../../../Middleware/currentUser";
import { requireAuth } from "../../../Middleware/authHandler";

const handler = nc({ onError });

dbConnect();

handler.get(getAllIssues);
handler.use(currentUser, requireAuth).post(creaetIssues);

export default handler;
