import { jwtDecode } from "jwt-decode";

/**
 * @param authHeader the authorization header from the Request Object
 * @returns the parsed user id
 */
export const parseUserId = (authHeader: string | undefined) => {
  if (!authHeader) {
    throw Error("Error: Auth header could not be found");
  }
  const token = authHeader.split(" ")[1];
  const decoded = jwtDecode(token);
  const userId = decoded.sub?.split("|")[1];
  if (!userId) {
    throw Error("User id could not be parsed");
  }
  return userId;
};
