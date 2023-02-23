import {ForwardRefExoticComponent, SVGProps} from "react";
import {BlockContextContract, BlockContract} from "../components/manager/block-editor/contexts/BlocksContext";

export type IUser = {
  id?: string
  firstname: string
  lastname: string
  email: string
  permissions: IPermission[]
  roles: IRole[]
}

export type IReponse = {
  body: string
  valide: boolean
}

export type ITypeQuestion = {
  name: string
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement> & { title?: string | undefined; titleId?: string | undefined; }>
  value: string
}

export type IRole = {
  id?: string
  label: string
  power: number
  permissions: IPermission[]
}

export type IPermission = {
  id?: string
  key: string
  label: string
}

export type IEtiquette = {
  id?: string
  label: string
  color: string
}

export type IColor = {
  label: string
  value: string
}

export type IQuestion = {
  id?: string
  label: string
  type: string
  enonce: BlockContract[]
  etiquettes: IEtiquette[]
  reponses: IReponse[]
}

export type IBlock = {
  id: string
  html: string
  tag: string
}