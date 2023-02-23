import React from 'react'
import Highlight from 'react-highlight'
import {classNames} from '../../utils/helper'
import mermaid from 'mermaid'
import {Mermaid} from './Mermaid'

type Props = {
  children: any
}
export default function Fence ({ children }: Props) {
  console.log(children)
  const language = children.className?.split('-')[1]

  if (language === 'mermaid') {
    mermaid.initialize({
      startOnLoad: true
    })
    return (
     <Mermaid text={children.children[0]} />
    )
  }

  return (
    <Highlight className={classNames(
      'language', children.className
    )}>
      {children.children[0]}
    </Highlight>
  )
}