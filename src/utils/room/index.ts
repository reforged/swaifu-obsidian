import {IQuestion, IReponse, ISession} from "../index";

export type IRoom = {
  session: ISession | null
  question?: IQuestion
  reponses?: IReponse[]
  locked: boolean
  waiting: boolean
}