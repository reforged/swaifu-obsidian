import BlocksContext from './contexts/BlocksContext'
import SettingContext from './contexts/SettingsContext'
import { SettingsContract } from './contexts/SettingsContext'
import StructureContext from './contexts/StructureContext'
import CurrentBlockContext from "./contexts/CurrentBlockContext";
import {useContext, useEffect, useState} from 'react'
import BlockContainer from './components/BlockContainer'
import ShowQuestionContext from "../../../contexts/ShowQuestionContext";
import QuestionContext from "../../../contexts/QuestionContext";

type Props = {
  blocks: {}
  settings: SettingsContract
  value: { [key: string]: any }[]
  onChange: Function
}

export default function BlockEditor (props: Props) {
  const [structure, setStructure] = useState(props.value)
  const [question, setQuestion] = useContext(QuestionContext)
  const currentBlock = useState(null)

  useEffect(() => {
    props.onChange(structure[0])
  }, [props, structure])

  useEffect(() => {
    const l1 = structure.map((item) => item.uid)
    const l2 = question.enonce.map((item) => item.uid)
    const l3 = l2.map((item, index) => {
      return item === l1[index];
    })
    if (l3.includes(false)) {
      setStructure(props.value)
    }
  }, [question])


  return (
    <SettingContext.Provider value={props.settings}>
      <BlocksContext.Provider value={props.blocks}>
        <StructureContext.Provider value={[structure, setStructure]}>
          <CurrentBlockContext.Provider value={currentBlock}>
            <BlockContainer />
          </CurrentBlockContext.Provider>
        </StructureContext.Provider>
      </BlocksContext.Provider>
    </SettingContext.Provider>
  )
}
