import {IQuestion, IReponse, ISession} from "../index";

export type WordCloud = {
  text: string
  value: number
}

export type IRoom = {
  session: ISession | null
  question?: IQuestion
  reponses?: IReponse[] | WordCloud[]
  locked: boolean
  waiting: boolean
}