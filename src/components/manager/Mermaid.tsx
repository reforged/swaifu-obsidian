import React, {useEffect, useRef} from 'react'
import mermaid from 'mermaid'

export interface MermaidProps {
  text: string
}

export const Mermaid = ({ text }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.mermaidAPI.initialize({
      startOnLoad: true,
      theme: "forest",
      logLevel: 5
    })
  })

  useEffect(() => {
    console.log(text)
    if (ref.current && text) {
      try {
        mermaid.mermaidAPI.render("preview", text, result => {
          ref.current!.innerHTML = result;
        });
      } catch {
        console.log("erreur diagram")
      }

    }
  }, [text])

  return (
    <div key="preview" ref={ref} />
  )
}