import {IRoom} from "../utils/room";
import {Dispatch, SetStateAction, createContext} from "react";

type State = [
  room: IRoom,
  setRoom: Dispatch<SetStateAction<IRoom>>
]

export default createContext<State>(null)