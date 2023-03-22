export type ConjuctionContract = 'and' | 'or'
export type TypeInputContract = 'text' | 'select'
export type CoupleConditionContract = ConditionContract | ConditionGroupContract


export type ConditionContract = {
  uid: string
  field: string
  operator: string
  value: any
}

export type SelectTypeContract = 'etiquettes' | 'roles' | 'permissions'

export type ConditionGroupContract = {
  uid: string
  conjunction: ConjuctionContract
  conditions: CoupleConditionContract[]
}