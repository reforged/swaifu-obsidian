declare module "@obsidian/type" {
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

  export type IRole = {
    id?: string
    label: string
    power: number
    permissions: IPermission[]
  }

  export type IPermission = {
    id?: string
    label: string
  }

  export type IEtiquette = {
    id?: string
    label: string
    description: string
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
    enonce: string
    etiquettes: IEtiquette[]
    reponses: IReponse[]
  }
}