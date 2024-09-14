import Config from "app/config"
import React, { createContext, ReactNode, useContext, useState } from "react"

import { io, Socket } from "socket.io-client"

type TSocketContext = {
  socket: Socket
}

type SocketProviderProps = {
  children: ReactNode
  token?: string
}

export const SocketContext = createContext({} as TSocketContext)

/**
 *  React context provider that allows any component to call context hook: useWebSocket()
 *  @param token The access token provided from Auth0.
 *
 */
export function SocketProvider({ children, token }: SocketProviderProps) {
  const [socket] = useState<Socket>(io(Config.SOCKET_ORIGIN, { auth: { token } }))
  if (!socket) {
    throw new Error("Connection error, socket not defined")
  }
  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}

export function useWebSocket() {
  return useContext(SocketContext)
}
