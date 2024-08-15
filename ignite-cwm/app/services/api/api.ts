import axios from "axios"
import Config from "app/config"

const api = axios.create({
  // http://localhost:8080/api/v1
  baseURL: Config.API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})

export default api
