import {io} from "socket.io-client";

const baseUrl: string = 'wss://api.reforged.fr'

export function useWebsocket () {
  const socket = io(baseUrl, {
    autoConnect: true,
    reconnectionAttempts: 15
  })


  return { socket }
}

export default useWebsocket