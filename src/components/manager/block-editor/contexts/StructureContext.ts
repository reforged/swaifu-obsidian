import { createContext, Dispatch, SetStateAction } from 'react'

type State<T> = [T, Dispatch<SetStateAction<T>>]

export default createContext<State<{[p: string]: any}[]>>(null)
