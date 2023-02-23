import { createContext } from 'react'

export type SettingsContract = {
  mode: 'editor' | 'preview'
}

export default createContext<SettingsContract>(null)
