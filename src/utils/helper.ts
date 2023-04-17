import { createElement, ReactNode } from 'react'
import axios from "axios";
import * as stringSimilarity from 'string-similarity'

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type ReactElementProps = {
  tag: (...props: unknown[]) => JSX.Element,
  children?: ReactNode | JSX.Element
  [props: string]: any
}
export function ReactElement ({ tag, children, ...props }: ReactElementProps): JSX.Element {
  return createElement(tag, props, children)
}

export const http = axios.create({
  baseURL: 'https://api.reforged.fr',
  withCredentials: true,
})

export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function exist<T> (item: T, list: T[]): boolean {
  return list.includes(item)
}

export function isEmpty<T> (a: T[], b: T[]): boolean {
  let empty: boolean = true
  a.forEach((item) => {
    if (!exist(item, b)) {
      empty = false
    }
  })

  return empty
}

export function filteredData<T> (data: any[], keys: (keyof T)[], search: string) {
  return data.filter(
    (item: T) => {
      const value = keys.map((key) => item[key]).join(' ')
      return value.toLowerCase().indexOf(search.toLowerCase()) !== -1
    }
  )
}

export function factorielle (n: number): number {
  if (n <= 0) return 1
  return n * factorielle(n-1)
}

export function combinaison (k: number, n: number): number {
  return factorielle(n) / (factorielle(k) * factorielle(n-k))
}

export function randomInt (max: number) {
  return Math.floor(Math.random() * max)
}

export function somme (li: number[]) {
  return li.reduce(
    (acc, current) => acc += current, 0
  )
}

interface WordCount {
  word: string
  count: number
}

export interface GroupedWords {
  [key: string]: {
    words: string[]
    count: number
  }
}

export function groupSimilarStrings (strings: string[]): GroupedWords {
  const groups: GroupedWords = {}

  for (let i = 0; i < strings.length; i++) {
    const group: string[] = [strings[i]];

    for (let j = i + 1; j < strings.length; j++) {
      const similarity = stringSimilarity.compareTwoStrings(strings[i], strings[j]);

      if (similarity >= 0.55) {
        group.push(strings[j]);
        strings.splice(j, 1);
        j--;
      }
    }

    const wordCounts: WordCount[] = group.reduce((acc, cur) => {
      const index = acc.findIndex(item => item.word === cur)

      if (index >= 0) {
        acc[index].count++
      } else {
        acc.push({ word: cur, count: 1 })
      }

      return acc
    }, [])

    const topWord = wordCounts.reduce((acc, cur) => cur.count > acc.count ? cur : acc, { word: '', count: 0 })

    if (groups[topWord.word]) {
      groups[topWord.word].words.push(...group)
      groups[topWord.word].count += group.length
    } else {
      groups[topWord.word] = {
        words: group,
        count: group.length,
      };
    }
  }

  return groups
}