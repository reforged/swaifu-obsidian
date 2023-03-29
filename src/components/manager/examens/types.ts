import {IEtiquette, IQuestion} from '../../../utils'

export type IExamen = {
  id?: string
  label: string
  options: EtiquetteOptions[]
}

export type EtiquetteOptions = {
  min: number
  max: number
  etiquette: IEtiquette
}

export type ISujet = {
  questions: IQuestion[]
}