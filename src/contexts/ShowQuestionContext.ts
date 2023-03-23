import {IQuestion} from "../utils";
import {createContext, Dispatch, SetStateAction} from "react";

type State = [
  question: IQuestion | null,
  setShowQuestion: Dispatch<SetStateAction<IQuestion | null>>
]

export default createContext<State>(null)