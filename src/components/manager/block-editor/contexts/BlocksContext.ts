import { createContext } from 'react'

export type BlockContract = {
  uid: string
  type: string
  fields: { [key: string]: any }
}

export type BlockContextContract = {
  block: (...props) => JSX.Element
  structure: BlockContract
}

export default createContext<{ [identifier: string]: () => BlockContextContract }>(null)
