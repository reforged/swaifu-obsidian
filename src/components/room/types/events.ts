import {IReponse, ISession} from "../../../utils";

export type QuestionUpdateEvent = {
  session: ISession
  waiting: boolean
  locked: boolean
}

export type StartSessionEvent = {
  session: ISession
  waiting: boolean
  locked: boolean
}


export type ShowAnswerEvent = {
  session: ISession
  reponses: IReponse[]
  waiting: boolean
  locked: boolean
}

export type LockAnswerEvent = {
  locked: boolean
}

export type JoinSuccessfulEvent = {
  session: ISession
  waiting: boolean
  locked: boolean
}

export type StopSessionEvent = {
  session: ISession
}