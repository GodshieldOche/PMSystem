import nc from "next-connect";
import { getCurrentUser, loginUser } from "../../controllers/usersController";
import dbConnect from "../../utils/dbConnect";
import onError from "../../Middleware/errorHandler";
import { requireAuth } from "../../Middleware/authHandler";
import { currentUser } from "../../Middleware/currentUser";

const handler = nc({ onError });

dbConnect();

handler.use(currentUser).get(getCurrentUser);

handler.post(loginUser);

export default handler;
