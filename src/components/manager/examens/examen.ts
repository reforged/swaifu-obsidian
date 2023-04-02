import { EtiquetteOptions, Interval } from './types'
import { randomInt } from '../../../utils/helper'

/**
 * @obsidian/examen
 *
 * (c) Bonnal Nathaël <pro.nathaelbonnal@gmail.com>
 * (c) Hawkins Oscar
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export default class Examen {
  private readonly intervales: Interval[]
  private options: EtiquetteOptions[]
  private readonly nbQuestions: number
  private readonly nbSujets: number
  private readonly sujets: Array<string[]>

  constructor(questions: number, sujets: number, options: EtiquetteOptions[]) {
    this.nbQuestions = questions
    this.options = options
    this.nbSujets = sujets
    this.intervales = options.map((item) => [item.min, item.max]) as Interval[]
    this.sujets = new Array<string[]>()
  }

  private combinaison (k: number, tab: Interval[]) {
    const [min, max] = tab[0]

    if (k-min < 0) return null

    if (tab.length === 1) {
      if (k <= max) {
        return [[k]]
      }
      return null
    }

    const generated = []

    for (let i = min; i <= max ; i++) {
      if (k-i >= 0) {
        const res = this.combinaison(k-i, tab.slice(1, tab.length))
        if (res) {
          for (const value of res) {
            generated.push([i, ...value])
          }
        }
      } else {
        break
      }
    }

    return generated
  }

  public numberQuestionsUnique (): number {
    const li = []
    this.options.forEach((option) => {
      option.etiquette.questions.forEach((question) => {
        if (!li.includes(question.id)) {
          li.push(question.id)
        }
      })
    })
    return li.length
  }

  public isPresent (li: string[]) {
    return this.sujets
      .map((sujet) => sujet
        .map((item) => li.includes(item)))
      .map((item) => !item.includes(false))
      .includes(true)
  }

  private generateSujet (tab: number[]): string[] {
    const li: string[] = []
    this.options.forEach((option, index) => {
      for (let i = 0; i < tab[index]; i++) {
        const data = option.etiquette.questions.filter((question) => !li.includes(question.id))
        const key = randomInt(data.length)
        if (data.length) {
          const value = data[key].id

          li.push(value)
        }

      }
    })
    return li
  }

  public getCombinaison (): Interval[] {
    return this.combinaison(this.nbQuestions, this.intervales)
  }

  public execute (): Array<string[]> {
    const tab = this.combinaison(this.nbQuestions, this.intervales)

    if (tab.length < this.nbSujets) {
      return []
    }

    while (this.sujets.length < this.nbSujets) {
      if (!tab.length) break

      const random = randomInt(tab.length)
      const sujet = this.generateSujet(tab[random])
      if (!this.isPresent(sujet) && sujet.length === this.nbQuestions) {
        this.sujets.push(sujet)
      }
      tab.splice(random, 1)

    }
    console.log(this.sujets)
    return this.sujets
  }
}