import { ConditionContract, ConditionGroupContract, CoupleConditionContract } from '../filter/types'
import { isGroup } from '../filter/utils'
import TextLogic from './text'
import SelectLogic from './select'

/**
 * @obsidian/logic-wrapper
 *
 * (c) Bonnal Nathaël <pro.nathaelbonnal@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export default class LogicWrapper<T> {
  private readonly groupCondition: ConditionGroupContract
  private data: T[]

  constructor(conditions: ConditionGroupContract, data: T[]) {
    this.groupCondition = conditions
    this.data = data
  }

  public filteredData () {
    if (this.groupCondition.conditions.length === 0) return this.data
    return this.data.filter((item) => this.verifWithConjunction(item))
  }

  public verifWithConjunction (data: T) {
    const li = this.groupCondition.conditions.map((item) => {
      if (isGroup(item)) {
        return this.verifGroupConjunction((item as ConditionGroupContract), data)
      } else {
        return this.verifCondition((item as ConditionContract), data)
      }
    })

    if (this.groupCondition.conjunction === 'and') {
      return !li.includes(false);
    } else {
      return !!li.includes(true);
    }
  }

  public verifGroupConjunction (group: ConditionGroupContract, data: T) {
    const li: boolean[] = this.verifRow(data, group.conditions)
    if (li.length === 0) return false
    if (group.conjunction === 'and') {
      return !li.includes(false);
    } else {
      return !!li.includes(true);
    }
  }

  public verifCondition (condition: ConditionContract, data: T): boolean {
    if (typeof condition.value === 'string') {
      const objet = new TextLogic(condition, data, condition.value)
      return objet.evaluate()
    } else {
      const objet = new SelectLogic(condition, data, condition.value)
      return objet.evaluate()
    }
  }

  public verifRow (data: T, conditions: CoupleConditionContract[]): any {
    return conditions.map((item) => {
      if (isGroup(item)) {
        const group = item as ConditionGroupContract
        return this.verifRow(data, group.conditions)
      } else {
        return this.verifCondition(item as ConditionContract, data)
      }
    })
  }
}