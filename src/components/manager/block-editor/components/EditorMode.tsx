import SettingsContext from '../contexts/SettingsContext'

type Props = {
  mode: 'preview' | 'editor'
  children: JSX.Element
}

export default function EditorMode (props: Props): JSX.Element {
  return (
    <SettingsContext.Consumer>
      {(settings) => settings.mode === props.mode && props.children}
    </SettingsContext.Consumer>
  )
}
