import nc from "next-connect";
import { getUsers } from "../../../controllers/usersController";
import dbConnect from "../../../utils/dbConnect";
import onError from "../../../Middleware/errorHandler";
import { currentUser } from "../../../Middleware/currentUser";
import { requireAuth } from "../../../Middleware/authHandler";

const handler = nc({ onError });

dbConnect();

handler.use(currentUser, requireAuth).get(getUsers);

export default handler;
