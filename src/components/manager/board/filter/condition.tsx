import {Fragment, useContext, useEffect, useState} from 'react'
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
    <div className="border rounded-md flex divide-x relative">
        <SelectField condition={condition} />
        <SelectOperator condition={condition} />
        <ValueRow condition={condition} />

      <div className="flex flex-end">
        <DeleteRow condition={condition} />
      </div>

    </div>
  )
}