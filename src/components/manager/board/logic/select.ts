import Logic from './logic'
import { ConditionContract } from '../filter/types'

export default class SelectLogic<T> extends Logic<T> {
  private value: T[]

  constructor(condition: ConditionContract, data: T, value: T[]) {
    super(condition, data)
    this.value = value
  }

  public contains () {
    const value: T[] = this.getCondition().value
    const liId = this.getData()[this.getCondition().field].map((item) => item.id)
    const list = value.map((item) => {
      return !!liId.includes(item)
    })
    return !!list.includes(true)
  }

  public notContains () {
    return !this.contains()
  }

  evaluate(): boolean {
    const condition = this.getCondition()
    switch (condition.operator) {
      case "contains":
        return this.contains()
      case "not contains":
        return this.notContains()
      default: return false
    }
  }
}