import { Dispatch, SetStateAction, createContext } from 'react'

export type NavigationContract = {
  label: string
  href: string
  icon: (...props: never[]) => JSX.Element
  children?: NavigationContract[]
}

type State = [
  navigation: NavigationContract[],
  setNavigation: Dispatch<SetStateAction<NavigationContract[]>>
]

export default createContext<State>(null)
