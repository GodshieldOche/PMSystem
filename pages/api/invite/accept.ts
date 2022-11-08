import nc from "next-connect";
import dbConnect from "../../../utils/dbConnect";
import onError from "../../../Middleware/errorHandler";
import { requireAuth } from "../../../Middleware/authHandler";
import { currentUser } from "../../../Middleware/currentUser";
import { acceptInvite } from "../../../controllers/usersController";

const handler = nc({ onError });

dbConnect();

handler.use(currentUser, requireAuth).post(acceptInvite);

export default handler;
