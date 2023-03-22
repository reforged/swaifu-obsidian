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
export default class Text<T> extends Logic<T> {
  private value: string

  constructor(condition: ConditionContract, data: T, value: string) {
    super(condition, data)
    this.value = value
  }

  public contains (): boolean {
    return (this.getData()[this.getCondition().field as keyof T] as string).includes(this.getCondition().value)
  }

  public is (): boolean {
    return (this.getData()[this.getCondition().field as keyof T] as string)
      .toLowerCase() === this.getCondition().value.toLowerCase()
  }

  public evaluate(): boolean {
    const condition = this.getCondition()
    switch (condition.operator) {
      case "contains":
        return this.contains()
      case "is":
        return this.is()
      default:
        return false
    }
  }
}