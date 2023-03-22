import {IQuestion, IReponse, ISession} from "../index";

export type IRoom = {
  session: ISession | null
  question?: IQuestion
  reponse?: IReponse
  locked: boolean
  wainting: boolean
}