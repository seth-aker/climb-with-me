import { Request, Router } from "express";
import { getUserPrivate } from "../handlers/user";
import jwtCheck from "../auth/jwtCheck";
import {jwtDecode} from 'jwt-decode'


const router = Router();
// /api/users
// router.get('/')

// /api/users/vbjalire
router.get("/:id", jwtCheck, async (req: Request<{id: string}>, res) => {
  const authHeader = req.header("authorization")
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwtDecode(token ?? "");
  console.log("Sub: " + decoded.sub)
  if(req.params.id !== decoded.sub) {
    res.sendStatus(401);
  } else {
    getUserPrivate(req, res)
  }
  
})

export default router;
