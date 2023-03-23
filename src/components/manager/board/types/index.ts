import {StructureContract} from "../../../../contexts/BoardContext";
import {ConditionContract, ConditionGroupContract} from "../filter/types";
import {IEtiquette, IPermission, IRole} from "../../../../utils";

export type Option = 'filter' | 'column' | 'mode'
export type View = 'galerie' | 'liste'
export type DataFilterContract = IEtiquette[] | IRole[] | IPermission[]
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
  open: boolean,
  selectData?: {
    permissions: IPermission[],
    roles: IRole[],
    etiquettes: IEtiquette[]
  },
  data?: any
  rowAction?: (item: T) => void
}
