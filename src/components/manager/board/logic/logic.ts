import {ConditionContract, ConjuctionContract} from "../filter/types";
import {DataFilterContract} from "../types";

/**
 * @obsidian/logic
 *
 * (c) Bonnal Nathaël <pro.nathaelbonnal@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export default abstract class Logic<T> {
  private condition: ConditionContract
  private data: T

  protected constructor(condition: ConditionContract, data: T) {
    this.condition = condition
    this.data = data
  }

  abstract evaluate(
    conjunction: ConjuctionContract,
    exp1: ConditionContract,
    exp2: ConditionContract
  ): boolean

  /**
   * return condition
   */
  public getCondition (): ConditionContract {
    return this.condition
  }

  /**
   * return value of data
   */
  public getData (): T {
    return this.data
  }
}