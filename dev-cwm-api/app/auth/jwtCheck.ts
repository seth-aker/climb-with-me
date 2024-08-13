import { auth } from "express-oauth2-jwt-bearer";

// setup authorization process to run when api calls are made
export default auth({
  audience: "http://localhost:8080",
  issuerBaseURL: "https://dev-sethaker.us.auth0.com/",
  tokenSigningAlg: "RS256",
});
