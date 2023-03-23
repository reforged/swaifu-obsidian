import {createContext, Dispatch, SetStateAction} from 'react'
import { IUser } from '../utils'


type State = [
  user: IUser | null,
  setUser: Dispatch<SetStateAction<IUser | null>>
]

export default createContext<State>(null)