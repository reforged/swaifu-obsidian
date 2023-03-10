import {Dispatch, SetStateAction, createContext} from 'react'
import {View} from '../components/manager/board/types'

export type StructureContract = {
  label: string
  key: string
  checked: boolean
  default: boolean
}

export type BoardContract = {
  view: View
  search: string
  structure: StructureContract[]
}

type State = [
  board: BoardContract,
  setBoard: Dispatch<SetStateAction<BoardContract>>
]

export default createContext<State>(null)

