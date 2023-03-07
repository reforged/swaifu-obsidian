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
