import {Dispatch, SetStateAction, createContext} from "react";

type State<T> = [
  state: T,
  setState: Dispatch<SetStateAction<T>>
]

export default createContext<State<any>>(null)