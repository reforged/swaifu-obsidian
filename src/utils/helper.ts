import { createElement, ReactNode } from 'react'
import axios from "axios";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type ReactElementProps = {
  tag: (...props: any) => JSX.Element,
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
