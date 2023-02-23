import BlocksContext from './contexts/BlocksContext'
import SettingContext from './contexts/SettingsContext'
import { SettingsContract } from './contexts/SettingsContext'
import StructureContext from './contexts/StructureContext'
import CurrentBlockContext from "./contexts/CurrentBlockContext";
import { useEffect, useState } from 'react'
import BlockContainer from './components/BlockContainer'

type Props = {
  blocks: {}
  settings: SettingsContract
  value: { [key: string]: any }[]
  onChange: Function
}

export default function BlockEditor (props: Props) {
  const structure = useState(props.value)
  const currentBlock = useState(null)

  useEffect(() => {
    props.onChange(structure[0])
  }, [props, structure])

  return (
    <SettingContext.Provider value={props.settings}>
      <BlocksContext.Provider value={props.blocks}>
        <StructureContext.Provider value={structure}>
          <CurrentBlockContext.Provider value={currentBlock}>
            <BlockContainer />
          </CurrentBlockContext.Provider>
        </StructureContext.Provider>
      </BlocksContext.Provider>
    </SettingContext.Provider>
  )
}
