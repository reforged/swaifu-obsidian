import React from 'react'
import Highlight from 'react-highlight'
import {classNames} from '../utils/helper'
import mermaid from 'mermaid'
import {Mermaid} from './Mermaid'

type Props = {
  children: any
  language: string
}
export default function Fence ({ children, language }: Props) {
  if (language === 'mermaid') {
    mermaid.initialize({
      startOnLoad: true
    })
    return (
     <Mermaid text={children} />
    )
  }

  return (
    <Highlight className={classNames(
      'language', language
    )}>
      {children}
    </Highlight>
  )
}