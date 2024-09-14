import { Router } from "express";
import jwtCheck from "../auth/jwtCheck";
import { getUserChats } from "../handlers/messageHandler";

const router = Router();
// /api/v1/chats
router.get("/", jwtCheck, getUserChats);

export default router;
