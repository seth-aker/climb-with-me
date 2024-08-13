import { Platform } from "react-native"
/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export default {
  API_URL: `http://${Platform.OS === "android" ? "10.0.2.2" : "localhost"}:8080/api/v1`,
}
