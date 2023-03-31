import {classNames} from "../../../utils/helper";
import React, {useContext, useEffect, useState} from "react";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";
import ExamenContext from "../../../contexts/ExamenContext";

export default function TotalQuestion () {
  const [examen, setExamen] = useContext(ExamenContext)
  const [valide, setValide] = useState(true)



  function update (e) {
    setExamen({
      ...examen,
      nbQuestions: parseInt(e.currentTarget.value)
    })
  }

  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="number"
          name="number_subject"
          id="number_subject"
          min={0}
          value={examen.nbQuestions}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onChange={update}
          className={classNames(
            'block w-full appearance-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6',
            !valide ? 'ring-red-300 placeholder:text-red-300 focus:ring-red-500' : 'ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
          )}
          placeholder="1"
        />
        <div className={classNames(
          'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-8',
          !valide ? 'visible' : 'invisible'
        )}>
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
      </div>
      { !valide && (
        <p className="text-sm text-red-500">Vous indiquez plus de questions qu'il en existe</p>
      )}
      <p className="mt-2 text-sm text-gray-500" id="email-description">
        Indiquez le nombre de questions que vous désirez
      </p>
    </div>
  )
}