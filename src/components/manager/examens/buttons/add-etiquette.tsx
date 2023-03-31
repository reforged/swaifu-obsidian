import { Menu, Transition } from '@headlessui/react'
import {PlusIcon} from "@heroicons/react/20/solid";
import React, {Fragment, useContext, useEffect, useState} from "react";
import ExamenContext from "../../../../contexts/ExamenContext";
import useEtiquettes from "../../../../hooks/use-etiquettes";
import {classNames} from "../../../../utils/helper";
import {IEtiquette} from "../../../../utils";

export default function AddEtiquette () {
  const [examen, setExamen] = useContext(ExamenContext)
  const { fetch } = useEtiquettes()
  const { data: etiquettes } = fetch()
  const [filtered, setFiltered] = useState<IEtiquette[]>([])

  useEffect(() => {
    const data = etiquettes.filter((etiquette: IEtiquette) => {
      if (!etiquette.questions.length) return false
      if (!examen.options.length) return true
      const li = examen.options.map((item) => item.etiquette.id)
      return !li.includes(etiquette.id)
    })
    setFiltered(data)
  }, [examen])

  function add (etiquette: IEtiquette) {
    setExamen({
      ...examen,
      options: [
        ...examen.options,
        { etiquette, max: etiquette.questions.length, min: 0}
      ]
    })
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <button className="bg-blue-100 px-4 py-2 font-thin text-lg rounded-md text-blue-500 flex items-center">
            <PlusIcon className="w-6 font-bold" />
            <span>Ajouter étiquette</span>
          </button>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 p-4 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="relative">
            { filtered &&
            <div className="flex flex-col gap-2 w-auto">
              { filtered.map((etiquette: IEtiquette) => (
                <button
                  onClick={() => add(etiquette)}
                  className={classNames(
                    'inline-flex items-center  rounded-full  px-2.5 py-0.5 text-xs font-medium text-gray-800',
                    etiquette.color
                  )}
                  key={etiquette.id}
                >
                  {etiquette.label}
                </button>
              ))}
              { !filtered.length &&
                <span className="text-gray-500">Plus d'étiquettes disponibles</span>
              }
            </div>
            }
          </div>

        </Menu.Items>
      </Transition>
    </Menu>
  )
}