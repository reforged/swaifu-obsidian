import {io} from "socket.io-client";

const baseUrl: string = 'ws://localhost:3333'

export function useWebsocket () {
  const socket = io(baseUrl, {
    autoConnect: true,
    reconnectionAttempts: 15
  })


  return { socket }
}

export default useWebsocket