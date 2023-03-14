import {Dispatch, SetStateAction, createContext} from 'react'
import {Options, View} from '../components/manager/board/types'

export type StructureContract = {
  label: string
  key: string
  checked: boolean
  default: boolean
}

export type BoardContract<T> = Options<T>

type State<T> = [
  board: BoardContract<T>,
  setBoard: Dispatch<SetStateAction<BoardContract<T>>>
]


export default createContext<State<any>>(null as any)