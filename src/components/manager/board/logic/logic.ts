import { ConditionContract } from '../filter/types'

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

  abstract evaluate (): boolean

  public getCondition(): ConditionContract {
    return this.condition
  }

  public getData (): T {
    return this.data
  }
}