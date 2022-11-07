import nc from "next-connect";
import { getAllUsers, loginUser } from "../../controllers/usersController";
import dbConnect from "../../utils/dbConnect";
import onError from "../../Middleware/errorHandler";

const handler = nc({ onError });

dbConnect();

handler.get(getAllUsers);

handler.post(loginUser);

export default handler;
