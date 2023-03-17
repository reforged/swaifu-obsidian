import {StructureContract} from "../../../../contexts/BoardContext";

export type Option = 'filter' | 'column' | 'mode'
export type View = 'galerie' | 'liste'

export type Column = {
  label: string
  key: string
  checked: boolean
  default: boolean
}

type key<T> = keyof T

export type Options<T> = {
  label: string
  view: 'liste' | 'galerie'
  search: string
  option: Option[]
  structure: StructureContract[]
  keys: key<T>[]
  open: boolean
  rowAction?: (item: T) => void
}
