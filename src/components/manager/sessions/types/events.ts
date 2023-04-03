import {ISession} from '../../../../utils'

/**
 * preload('users')
 */
export type UserJoinSessionEvent = {
  session: ISession
}

/**
 * preload('reponses')
 */
export type NewAnswerEvent = {
  session: ISession
}