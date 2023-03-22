import {Fragment, useContext, useEffect, useState} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {classNames} from "../../../../utils/helper";
import DeleteRow from "./buttons/delete-row";
import SelectOperator from "./select-menus/select-operator";
import ValueRow from "./value";
import {ConditionContract} from "./types";
import BoardContext from "../../../../contexts/BoardContext";
import SelectField from "./select-menus/select-field";

type Props = {
  condition: ConditionContract
}

export default function Condition ({ condition }: Props) {
  const [board, setBoard] = useContext(BoardContext)

  return (
    <div className="border flex-1 rounded-md flex divide-x relative">
      <SelectField condition={condition} />
      <SelectOperator condition={condition} />
      <ValueRow condition={condition} />
      <div>
        <DeleteRow condition={condition} />
      </div>

    </div>
  )
}