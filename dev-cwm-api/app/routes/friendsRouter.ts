import { json, Router, Request, Response } from "express";
import jwtCheck from "../auth/jwtCheck";
import {
  createFriendRequest,
  respondToFriendRequest,
  getFriendsList,
  getFriendRequests,
} from "../handlers/friendsHandler";
import { IFriendRequest } from "../database/documentTypes/friendRequests.type";

const router = Router();
// Get Friend List
// /api/v1/friends
router.get("", jwtCheck, async (request: Request, response: Response) => {
  getFriendsList(request, response);
});
router.get("/requests", jwtCheck, getFriendRequests);
// Create Friend Request
// /api/v1/friends/requests
router.post(
  "/requests",
  jwtCheck,
  json(),
  async (request: Request<{}, {}, IFriendRequest>, response: Response) => {
    createFriendRequest(request, response);
  }
);

// /api/v1/friends/requests/:requestId?accepted={accepted}
router.patch(
  "/requests/:requestId",
  jwtCheck,
  async (
    request: Request<{ requestId: string }, {}, {}, { accepted: string }>,
    response: Response
  ) => {
    respondToFriendRequest(request, response);
  }
);

export default router;
