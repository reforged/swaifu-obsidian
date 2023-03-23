import {IQuestion, IReponse, ISession, IUser} from "../index";

export type JoinEvent = {
  user: IUser
  session: ISession
}

export type UpdateAnswersEvent = {}

export type NewQuestion = {
  question: IQuestion
  session: ISession
}

export type LockEvent = {
  message: string
  locked: boolean
  session: ISession
}

export type StartEvent = {
  session: ISession
  question: IQuestion
}

export type ShowAnswerEvent = {
  reponse: IReponse
}

export type JoinSuccessfulEvent = {
  message: string,
  session: ISession
}
export type ShowStats = {}