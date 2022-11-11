import nc from "next-connect";
import dbConnect from "../../../utils/dbConnect";
import onError from "../../../Middleware/errorHandler";
import { currentUser } from "../../../Middleware/currentUser";
import { requireAuth } from "../../../Middleware/authHandler";
import { getProject } from "../../../controllers/projectsController";

const handler = nc({ onError });

dbConnect();

handler.use(currentUser, requireAuth).get(getProject);

export default handler;
