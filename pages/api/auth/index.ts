import nc from "next-connect";
import { registerUser } from "../../../controllers/usersController";
import dbConnect from "../../../utils/dbConnect";
import onError from "../../../Middleware/errorHandler";

const handler = nc({ onError });

dbConnect();

handler.post(registerUser);

export default handler;
