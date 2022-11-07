import nc from "next-connect";
import dbConnect from "../../../utils/dbConnect";
import onError from "../../../Middleware/errorHandler";
import {
  createProject,
  getAllProjects,
} from "../../../controllers/projectsController";
import { currentUser } from "../../../Middleware/currentUser";
import { requireAuth } from "../../../Middleware/authHandler";

const handler = nc({ onError });

dbConnect();

handler.get(getAllProjects);
handler.use(currentUser, requireAuth).post(createProject);

export default handler;
