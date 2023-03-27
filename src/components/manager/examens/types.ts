import {IQuestion} from '../../../utils'

export type IExamen = {
  id?: string
  label: string
  options: QuestionOptions[]
}

type QuestionOptions = {
  min: number
  max: number
  question: IQuestion
}