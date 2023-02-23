import { createElement, FunctionComponent, useContext, useRef } from 'react'
import { classNames } from '../../../../utils/helper'
import SettingsContext from '../contexts/SettingsContext'

type Props = {
  onChange: (value: string | number) => void
  className?: string
  value: string | number | boolean
  placeholder: string
  as: string | FunctionComponent
  id?: string
}

export default function ContentEditable (props: Props) {
  const settings = useContext(SettingsContext)
  const textRef = useRef(props.value)

  const defaultProps = {
    id: props.id,
    className: classNames(props.className, 'focus:outline-none'),
    contentEditable: settings.mode === 'editor',
    suppressContentEditableWarning: true,
    placeholder: props.placeholder,
    onInput: (event) => props.onChange(event.target.innerText),
  }

  return createElement(props.as, defaultProps as never, textRef.current)
}
