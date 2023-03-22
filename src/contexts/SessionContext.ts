import { ISession } from "../utils";
import { Dispatch, SetStateAction, createContext } from "react";

type State = [
  session: ISession | null,
  setSession: Dispatch<SetStateAction<ISession | null>>
]

export default createContext<State>(null)