import { createElement, ReactNode } from 'react'
import axios from "axios";

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
  baseURL: 'http://localhost:3333',
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
  if (n === 0) return 1
  return n * factorielle(n-1)
}

export function combinaison (k: number, n: number): number {
  return factorielle(n) / (factorielle(k) * factorielle(n-k))
}