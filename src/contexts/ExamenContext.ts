import { Dispatch, SetStateAction, createContext } from 'react'
import {IExamen} from "../components/manager/examens/types";

type State = [
  examen: IExamen,
  setExamen: Dispatch<SetStateAction<IExamen>>
]

export default createContext<State>(null)