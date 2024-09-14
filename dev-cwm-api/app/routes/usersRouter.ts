import { Request, Response, Router, json } from "express";
import {
  getUserPrivate,
  getUserPublic,
  createUser,
  updateUser,
} from "../handlers/userHandler";
import jwtCheck from "../auth/jwtCheck";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../database/documentTypes/user.type";
import { parseUserId } from "../util/parseUserId";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new S3Client({ region: process.env.AWS_REGION });
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET ?? "dev-cwm-images",
    metadata: function (req, file, callback) {
      callback(null, { fieldName: file.fieldname });
    },
    key: function (req: Request<{ id: string }>, file, callback) {
      callback(
        null,
        `${file.fieldname}/${req.params.id}.${file.mimetype.split("/").pop()}`
      );
    },
  }),
});
// /api/v1/users
const router = Router();

// Get User Profile
// /api/v1/users/vbjalire
router.get(
  "/:id",
  jwtCheck,
  async (request: Request<{ id: string }>, response) => {
    const authHeader = request.header("authorization");
    const userId = parseUserId(authHeader);
    if (request.params.id !== userId) {
      getUserPublic(request, response);
    } else {
      getUserPrivate(request, response);
    }
  }
);

// createUser
// /api/v1/users
router.post(
  "",
  jwtCheck,
  json(),
  async (request: Request<{}, {}, IUser>, response: Response) => {
    createUser(request, response);
  }
);

// Update User
router.put(
  "/:id",
  jwtCheck,
  json(),
  async (request: Request<{ id: string }, {}, IUser>, response: Response) => {
    const authHeader = request.header("authorization");
    const userId = parseUserId(authHeader);
    if (request.params.id !== userId) {
      response.sendStatus(401);
    } else {
      updateUser(request, response);
    }
  }
);
router.post(
  "/:id/img",
  jwtCheck,
  async (request: Request<{ id: string }>, response: Response, next) => {
    const authHeader = request.header("authorization");
    const userId = parseUserId(authHeader);
    if (request.params.id !== userId) {
      response.sendStatus(401);
    }
    console.log("Post Received");
    next();
  },
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  (request: Request<{ id: string }>, response: Response) => {
    response.sendStatus(204);
  }
);
export default router;
