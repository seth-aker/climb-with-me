import Config from "app/config"
import { io } from "socket.io-client"
const socket = io(Config.SOCKET_ORIGIN, { transports: ["websocket"] })
export default socket
