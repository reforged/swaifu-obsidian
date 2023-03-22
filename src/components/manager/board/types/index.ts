import {StructureContract} from "../../../../contexts/BoardContext";
import {ConditionContract, ConditionGroupContract} from "../filter/types";

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
  filter: ConditionGroupContract
  structure: StructureContract[]
  keys: key<T>[]
  open: boolean
  data: any
  rowAction?: (item: T) => void
}
