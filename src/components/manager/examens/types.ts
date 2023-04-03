import {IEtiquette, IQuestion} from '../../../utils'

export type IExamen = {
  id?: string
  label: string
  combinaison: number
  nbSujets: number
  nbQuestions: number
  totalSujets: number
  totalQuestions: number
  options: EtiquetteOptions[]
  anonymat: boolean
  sujets: string[][]
}

export type EtiquetteOptions = {
  min: number
  max: number
  etiquette: IEtiquette
}

export type ISujet = {
  questions: IQuestion[]
}

export type Interval = [number, number]