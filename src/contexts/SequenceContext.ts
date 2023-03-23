import {Dispatch, SetStateAction, createContext} from 'react'
import {ISequence} from "../utils";

type State = [
  sequence: ISequence,
  setSequence: Dispatch<SetStateAction<ISequence>>
]

export default createContext<State>(null)