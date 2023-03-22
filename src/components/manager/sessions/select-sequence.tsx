import React, {Fragment, useContext, useEffect, useState} from "react";
import { Listbox, Transition } from '@headlessui/react'
import useSequences from "../../../hooks/use-sequences";
import {ISequence} from "../../../utils";
import {classNames} from "../../../utils/helper";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {QueueListIcon} from "@heroicons/react/24/outline";
import useSessions from "../../../hooks/use-sessions";
import SessionContext from "../../../contexts/SessionContext";

export default function SelectSequence () {
  const [session, setSession] = useContext(SessionContext)
  const { fetch } = useSequences()
  const { store } = useSessions()
  const { data } = fetch()
  const { mutate, data: sessionData } = store()
  const [disabled, setDisabled] = useState<boolean>(true)
  const [selected, setSelected] = useState<ISequence | null>(null)

  useEffect(() => {
    if (sessionData) {
      setSession(sessionData)
    }
  }, [sessionData])

  useEffect(() => {
    if (selected) setDisabled(false)
    else setDisabled(true)
  }, [selected])

  function onCreate () {
    if (selected) {
      console.log(selected.id)
      mutate(selected.id!)
    }
  }
  return (
    <div className="p-12">
      <div>
        <h1>Sélectionner la séquence pour votre session</h1>
      </div>
      { data &&
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-12">
          {data.map((sequence: ISequence) => (
            <button
              key={sequence.id}
              onClick={() => setSelected(sequence)}
              className={classNames(
                "relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400",
                selected && selected.id === sequence.id ? 'bg-indigo-500' : ''
              )}
            >
              <div className="flex-shrink-0">
                <QueueListIcon className="w-10" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="focus:outline-none text-left">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className={classNames(
                    "text-sm font-medium text-gray-900",
                    selected && selected.id === sequence.id ? '!text-white' : ''
                  )}>{sequence.label}</p>
                  <p className={classNames(
                    "truncate text-sm text-gray-500",
                    selected && selected.id === sequence.id ? '!text-gray-200' : ''
                  )}>Elle est composé de {sequence.questions.length} questions</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      }

      <div>
        <div className="flex justify-end pt-8 items-center gap-2">
          <button
            onClick={close}
            className="rounded-md px-3 py-2 border bg-red-200 text-red-500"
          >
            Cancel
          </button>
          <button
            disabled={disabled}
            onClick={onCreate}
            className={classNames(
              'rounded-md px-3 py-2 border',
              disabled ? 'text-gray-400 bg-gray-50' : 'bg-indigo-500 text-white'
            )}
          >
            Créer session
          </button>
        </div>
      </div>
    </div>
  )
}

