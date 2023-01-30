import { createContext } from 'react'
import { IEtiquette } from '@obsidian/type'

type State = {
  etiquette: IEtiquette | null,
  setEtiquette: (etiquette: IEtiquette) => void
}

export const EtiquettesContext = createContext<State>({
  etiquette: null,
  setEtiquette: (etiquette: IEtiquette) => {}
})