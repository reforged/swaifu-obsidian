import {createElement, useRef} from "react";
import {classNames} from "../../../../../utils/helper";

type Props = {
  onChange: (value: string) => void
  className?: string
  value: string
  placeholder: string
  id?: string
}

export function Title ({ onChange, className, value, placeholder, id }: Props) {
  const textRef = useRef(value)
  const defaultProps = {
    id: id,
    className: classNames(className ? className : '', 'focus:outline-none'),
    contentEditable: true,
    suppressContentEditableWarning: true,
    placeholder: placeholder,
    onInput: (event: any) => onChange(event.target.innerText)
  }

  return createElement('h1', defaultProps as never, textRef.current ? textRef.current : 'Untitled')
}