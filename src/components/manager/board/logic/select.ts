import Logic from "./logic";
import {ConditionContract, SelectTypeContract} from "../filter/types";

export default class Select<T> extends Logic<T> {
  private value: T

  constructor(condition: ConditionContract, data: T, value: T) {
    super(condition, data)
    this.value = value
  }

  public containsAtLeast (): boolean {
    const value: T[] = this.getCondition().value
    const list = value.map((item) => {
      return !!(this.getData() as T[]).includes(item)
    })
    return !!list.includes(true)
  }

  public contains (): boolean {
    const value: T[] = this.getCondition().value
    const list = value.map((item) => {
      return !!(this.getData() as T[]).includes(item)
    })

    return !!list.includes(false)
  }

  evaluate(): boolean {
    const condition = this.getCondition()
    switch (condition.operator) {
      case "contains":
        return this.contains()
      case "contains at least":
        return this.containsAtLeast()
      default: return false
    }
  }
}