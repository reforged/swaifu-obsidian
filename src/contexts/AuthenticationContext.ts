import { createContext } from 'react'
import { IUser } from '../utils'

export const AuthenticationContext = createContext<{ user: IUser | null, setUser: any}>({
  user: null,
  setUser: (user: any) => {}
})