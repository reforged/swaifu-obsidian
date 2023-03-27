import Logic from "./logic";
import {ConditionContract} from "../filter/types";

/**
 * @obsidian/logic
 *
 * (c) Bonnal Nathaël <pro.nathaelbonnal@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export default class TextLogic<T> extends Logic<T> {
  private value: string

  constructor(condition: ConditionContract, data: T, value: string ) {
    super(condition, data)
    this.value = value
  }

  public contains (): boolean {
    const data = (this.getData()[this.getCondition().field as keyof T] as string)
    if (!data) return false
    return data.toLowerCase()
      .includes(this.value.toLowerCase())
  }

  public notContains (): boolean {
    return !this.contains()
  }

  public is (): boolean {
    const data = (this.getData()[this.getCondition().field as keyof T] as string)
    if (!data) return false
    return data.toLowerCase() === this.value.toLowerCase()
  }

  public isNot (): boolean {
    return !this.is()
  }

  public evaluate(): boolean {
    const condition = this.getCondition()
    switch (condition.operator) {
      case "contains":
        return this.contains()
      case "not contains":
        return this.notContains()
      case "is not":
        return this.isNot()
      case "is":
        return this.is()
      default: return false
    }
  }
}