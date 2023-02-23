import {createContext, Dispatch, SetStateAction} from "react";
import { IQuestion } from '../utils'

type State = [ question: IQuestion, setQuestion: Dispatch<SetStateAction<IQuestion>>]

export default createContext<State>(null)