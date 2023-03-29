import {EtiquetteOptions} from "./types";
import {TrashIcon} from "@heroicons/react/24/outline";
import {useContext, useEffect, useState} from "react";
import ExamenContext from "../../../contexts/ExamenContext";
import SwitchNumberInterval from "../form/switch-number-interval";
import useEtiquettes from "../../../hooks/use-etiquettes";
import MultiRangeSlider from "../form/multi-range-slider/multi-range-slider";

type Props = {
  option: EtiquetteOptions
  index: number
}

export default function OptionEtiquette ({ option, index }: Props) {
  const [examen, setExamen] = useContext(ExamenContext)
  const [min, setMin] = useState<number>(0)
  const [max, setMax] = useState<number>(0)
  const [maxItem, setMaxItem] = useState<number>(0)
  const { fetch } = useEtiquettes()
  const { data: etiquettes} = fetch()

  function onDelete () {
    const list = examen.options
    list.splice(index, 1)
    setExamen({
      ...examen,
      options: [...list]
    })
  }

  function update () {
    const li = examen.options.map((item, i) => {
      if (i !== index) return item
      return {
        min,
        max,
        etiquette: item.etiquette
      }
    })
    console.log()
    setExamen({
      ...examen,
      options: li
    })
  }

  useEffect(() => {
    update()
  }, [min, max])

  useEffect(() => {
    const data = etiquettes.find((etiquette) => etiquette.id === option.etiquette.id)
    update()
    setMaxItem(data.questions.length)
    console.log(option.etiquette)
  }, [])


  return (
    <div className=" p-4 px-8 flex items-center justify-between group">
      <div className="flex items-center gap-8">
        <div className="flex flex-col">
          <span className="w-36 truncate">
          {option.etiquette.label}
        </span>
          <span className="text-sm text-gray-500">Il y a {option.etiquette.questions.length} questions</span>
        </div>

        {/*<div className="flex items-center  gap-4">
          <div className="flex items-center gap-2">
            <span>Minimum</span>
            <SwitchNumberInterval state={min} setState={setMin} max={option.etiquette.questions.length} />
          </div>
          <span className="mx-2 text-2xl font-thin text-gray-300">/</span>

          <div className="flex items-center gap-2">
            <span>Maximum</span>
            <SwitchNumberInterval state={max} setState={setMax} max={option.etiquette.questions.length} />
          </div>
        </div>*/}

        <MultiRangeSlider
          min={0}
          max={option.etiquette.questions.length}
          onChange={({ min, max }) => {
            setMax(max)
            setMin(min)
          }}
        />



      </div>
      <div className="invisible group-hover:visible">
        <button
          className="text-gray-500 hover:bg-gray-300 p-1 rounded-md"
          type="button" onClick={onDelete}
        >
          <TrashIcon className="w-5" />
        </button>

      </div>

    </div>
  )
}