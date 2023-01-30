import React, {Dispatch, SetStateAction} from 'react'
import {classNames} from "../../../utils/helper";
import ModalEtiquettes from "./ModalEtiquettes";

type Props = {
  label: string
  setLabel: Dispatch<SetStateAction<string>>
}

export default function Header ({ label, setLabel }: Props) {
  return (
    <div className="relative w-full p-12">
      <div>
        <input
          type="text"
          maxLength={40}
          defaultValue={label}
          placeholder={"Untitled"}
          onChange={(e) => setLabel(e.currentTarget.value)}
          className={classNames(
            'block w-full py-1 focus:outline-none focus:border-none border-none font-bold text-3xl'
          )}
        />
      </div>
      <div className="pt-8">
        <ModalEtiquettes />
      </div>
    </div>
  )
}