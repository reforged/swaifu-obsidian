import {EtiquetteOptions, ISujet} from "./types";
import {combinaison, randomInt} from "../../../utils/helper";

/**
 * @obsidian/examen
 *
 * (c) Bonnal Nathaël <pro.nathaelbonnal@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export default class Examen {
  private nbSujet: number
  private nbQuestion: number
  private combinaison: number
  private options: EtiquetteOptions[]
  private readonly sujets: Array<string[]>

  constructor (nbSujet: number, nbQuestion: number, combinaison: number, options: EtiquetteOptions[]) {
    this.nbSujet = nbSujet
    this.nbQuestion = nbQuestion
    this.combinaison = combinaison
    this.options = options
    this.sujets = new Array<string[]>()
  }

  public isEmpty () {
    return this.sujets.length === 0
  }

  public generateSujet (): string[] {
    const sujet: string[] = []
    const tab = this.generateTab()
    this.options.forEach((option, index) => {
      for (let i = 0; i < tab[index]; i++) {
        const data = option.etiquette.questions.filter((question) => !sujet.includes(question.id!))
        const value = data[randomInt(data.length)].id
        sujet.push(value)
      }
    })
    return sujet
  }

  public generateTab(): number[] {
    const li: number[] = this.options.map(option => option.min)
    while (this.sommeListe(li) < this.nbQuestion) {
      const value = this.options
        .map((option, index) => (option.max > li[index] ? index : null))
        .filter(item => item !== null)

      if (!value.length) {
        return []
      }

      const random = randomInt(value.length - 1)
      const index = value[random]

      li[index] += 1

      if (this.options[index].max <= li[index]) {
        value.splice(random, 1)
      }
    }

    return li
  }

  public numberQuestionsUnique (): number {
    const li: string[] = []
    this.options.forEach((option) => {
      option.etiquette.questions.forEach((question) => {
        if (!li.includes(question.id!)) {
          li.push(question.id!)
        }
      })
    })


    return li.length
  }

  /**
   *
   * @param li
   */
  public sommeListe (li: number[]): number {
    return li.reduce(
      (acc, current) => acc += current, 0
    )
  }

  public getSujets () {
    return this.sujets
  }

  public isPresent (li: string[]) {
    return this.sujets
      .map((sujet) => sujet
        .map((item) => li.includes(item)))
      .map((item) => !item.includes(false))
      .includes(true)
  }


  public execute (): string[][] {
    console.log(this.numberQuestionsUnique() < this.nbQuestion)
    console.log(this.combinaison, this.nbSujet)
    if (this.numberQuestionsUnique() < this.nbQuestion || this.combinaison < this.nbSujet) {
      return []
    }

    let count = 0
    while (this.sujets.length < this.nbSujet) {
      const sujet = this.generateSujet()
      if (!this.isPresent(sujet)) {
        this.sujets.push(sujet)
      }
      count++

      if (count > 5000) {
        this.nbSujet--
      }
    }

    return this.sujets
  }
}