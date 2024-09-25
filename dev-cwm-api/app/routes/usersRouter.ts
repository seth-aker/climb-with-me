import { NextFunction, Request, Response, Router, json } from "express";
import {
  getUserPrivate,
  getUserPublic,
  createUser,
  updateUser,
} from "../handlers/userHandler";
import jwtCheck from "../auth/jwtCheck";
import { IUser } from "../database/documentTypes/user.type";
import { parseUserId } from "../util/parseUserId";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { handleUserProfileImgChange } from "../database/functions/updateUserPosts";

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

// Get User Public Info
// /api/v1/users/public/vbjalire
router.get(
  "/public/:id",
  jwtCheck,
  async (req: Request<{ id: string }>, res) => {
    getUserPublic(req, res);
  }
);
//
router.get(
  "/private/:id",
  jwtCheck,
  async (req: Request<{ id: string }>, res) => {
    const authHeader = req.header("Authorization");
    const sub = parseUserId(authHeader);
    if (sub !== req.params.id) {
      res.sendStatus(403);
    } else {
      getUserPrivate(req, res);
    }
  }
);
// createUser
// /api/v1/users
router.post(
  "",
  jwtCheck,
  json(),
  async (req: Request<{}, {}, IUser>, res: Response) => {
    createUser(req, res);
  }
);

// Update User
router.put(
  "/:id",
  jwtCheck,
  json(),
  async (req: Request<{ id: string }, {}, IUser>, res: Response) => {
    // Validate Ownership of the resource
    const authHeader = req.header("Authorization");
    const sub = parseUserId(authHeader);
    if (sub !== req.params.id) {
      res.sendStatus(403);
    } else {
      updateUser(req, res);
    }
  }
);

router.post(
  "/:id/img",
  // Check for a valid user
  jwtCheck,
  // Verify if user is the owner of the resource
  async (
    req: Request<
      { id: string },
      {},
      {},
      { type: "profile" | "background"; resourceUri: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.header("authorization");
    const userId = parseUserId(authHeader);
    if (req.params.id !== userId) {
      res.sendStatus(403);
    }
    console.log("Post Received");
    next();
  },
  // Use multer to upload the image to s3 based on the query parameters of either "profile", or "background"
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  // Propagate the change to all resources using the image
  async (
    req: Request<
      { id: string },
      {},
      {},
      { type: "profile" | "background"; resourceUri: string }
    >,
    res: Response
  ) => {
    if (req.query.type === "profile") {
      await handleUserProfileImgChange(req.params.id, req.query.resourceUri);
    }
    res.sendStatus(204);
  }
);
export default router;
