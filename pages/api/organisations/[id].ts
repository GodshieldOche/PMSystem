import nc from "next-connect";
import dbConnect from "../../../utils/dbConnect";
import onError from "../../../Middleware/errorHandler";
import { getOrganisation } from "../../../controllers/organisationController";
import { currentUser } from "../../../Middleware/currentUser";
import { requireAuth } from "../../../Middleware/authHandler";

const handler = nc({ onError });

dbConnect();

handler.use(currentUser, requireAuth).get(getOrganisation);

export default handler;
