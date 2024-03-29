declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

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
    enonce: string
    etiquettes: IEtiquette[]
    reponses: IReponse[]
  }

  export type IBlock = {
    id: string
    html: string
    tag: string
  }
}