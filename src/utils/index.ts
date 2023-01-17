export type IEtiquette = {
  id: string
  label: string
  description: string
  color: string
}

export type IQuestion = {
  id: string
  label: string
  enonce: string
  max_reponse: number
  etiquettes: IEtiquette[]
}