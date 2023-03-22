import {ConditionContract, CoupleConditionContract} from "../filter/types";
import {isGroup} from "../filter/utils";
import {IQuestion} from "../../../../utils";
import Select from "./select";

export default class LogicWrapper<T> {
  private conditions: CoupleConditionContract[]
  private data: T[]

  constructor(conditions: CoupleConditionContract[], data: T[]) {
    this.conditions = conditions
    this.data = data
  }

  public filteredData (): T[] {
    return this.data
  }

  public resultConditionOfRow (data) {
    const result = this.conditions.map((value) => {
      if (!isGroup(value)) {
        const condition = value as ConditionContract
        if (typeof condition === 'string') {

        } else {
          const objet = new Select(condition, )
        }
      }
    })
  }
}