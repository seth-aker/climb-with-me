import { Request, Response, Router, json } from "express";
import {
  getUserPrivate,
  getUserPublic,
  createUser,
} from "../handlers/userHandler";
import jwtCheck from "../auth/jwtCheck";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../database/documentTypes/user.type";

const router = Router();
// /api/v1/users
// router.get('/')

// /api/v1/users/vbjalire
router.get(
  "/:id",
  jwtCheck,
  async (request: Request<{ id: string }>, response) => {
    const authHeader = request.header("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwtDecode(token ?? "");
    console.log("Sub: " + decoded.sub);
    if (request.params.id !== decoded.sub?.split("|")[1]) {
      getUserPublic(request, response);
    } else {
      getUserPrivate(request, response);
    }
  }
);

// /api/v1/users
router.post(
  "",
  jwtCheck,
  json(),
  async (request: Request<{}, {}, IUser>, response: Response) => {
    createUser(request, response);
  }
);
export default router;
