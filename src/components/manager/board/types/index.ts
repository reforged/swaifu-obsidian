export type Option = 'filter' | 'column' | 'mode'
export type View = 'galerie' | 'liste'

export type Column = {
  label: string
  key: string
  checked: boolean
  default: boolean
}
