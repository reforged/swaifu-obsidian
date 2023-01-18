import { createElement, ReactNode } from 'react'

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