import React, {useContext, useEffect, useState} from "react";
import ExamenContext from "../../../contexts/ExamenContext";
import {ExclamationCircleIcon, PlusIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {classNames, combinaison} from "../../../utils/helper";
import {ChevronDownIcon, CircleStackIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import AddEtiquette from "./buttons/add-etiquette";
import OptionEtiquette from "./option-etiquette";
import { Disclosure } from '@headlessui/react'
import {Tooltip, Button} from "flowbite-react";
import MultiRangeSlider from "../form/multi-range-slider/multi-range-slider";

export default function Modal ({ toggle }) {
  const [examen, setExamen] = useContext(ExamenContext)
  const [value, setValue] = useState(0)
  const [nbSujet, setNbSujet] = useState(0)
  const [disabled, setDisabled] = useState<boolean>(true)

  function factorielle (n: number): number {
    if (n === 0) return 1
    return n * factorielle(n-1)
  }

  useEffect(() => {
    const data = examen.options.reduce(
      (acc, current) => acc = combinaison(current.max, current.etiquette.questions.length)*acc, 1
    )

    setValue(data)

  }, [examen])
  return (
    <div>
      <div className="w-full bg-gray-100 flex border-b justify-between items-center p-4 relative">
        <div className="text-center w-full">
          <span className="font-title uppercase">Créer examen</span>
        </div>
        <div>
          <button
            onClick={toggle}
            className="hover:bg-gray-200 p-1 rounded-md"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="p-8 bg-gray-50 h-full">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-8">
          <div>
            <input
              type="text"

              placeholder={"Titre de l'examen"}
              maxLength={15}
              className={classNames('border-none bg-transparent text-2xl font-bold !ring-0 !outline-0 ')}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-gray-400 flex items-center gap-2 px-3 py-1 rounded-full border">
              <span>
                <CircleStackIcon className="w-4" />
              </span>
              <span className="flex items-center gap-2">
                <span className="">Nombres de sujet:</span>
                <span className='text-gray-900'>86</span>
              </span>
            </div>
          </div>

        </div>
        {/* BOARD */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-9">
            {/* FIRST BOARD */}
            <div className="border p-4 bg-white shadow-sm rounded-md">
              <div className="flex justify-between items-center pb-8">
                <div>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="number"
                      name="number_subject"
                      id="number_subject"
                      min={0}
                      value={nbSujet}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      onChange={e => setNbSujet(e.currentTarget.value)}
                      className={classNames(
                        'block w-full appearance-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6',
                        nbSujet > value ? 'ring-red-300 placeholder:text-red-300 focus:ring-red-500' : 'ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
                      )}
                      placeholder="1"
                    />
                    <div className={classNames(
                      'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-8',
                      nbSujet > value ? 'visible' : 'invisible'
                    )}>
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  </div>
                  { nbSujet > value && (
                    <p className="text-sm text-red-500">Vous ne pouvez pas créer autant de sujet avec cette combinaison</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500" id="email-description">
                    Indiquez le nombre de sujet que vous désirez
                  </p>
                </div>
                <AddEtiquette />
              </div>
              <span>Nombre de sujets possibles : {value}</span>
              <div className="border rounded-md mt-8">
                { examen.options.length ?
                  <div className="flex flex-col divide-y">
                    {examen.options.map((option, index) => (
                      <OptionEtiquette option={option} key={index} index={index} />
                    ))}
                  </div>
                  : <div className="p-4">Pas d'étiquettes sélectionné</div>
                }



              </div>

              <div className="flex justify-end mt-4">
                <div className="">
                  <button
                    className={classNames(
                      'rounded-md px-3 py-2 border w-full',
                      disabled ? 'text-gray-400 bg-gray-50' : 'bg-indigo-500 text-white'
                    )}
                  >
                    Créer les sujets
                  </button>
                </div>

              </div>

            </div>
          </div>
          <div className="col-span-3 relative">

            <div className="p-6 rounded-md border bg-white shadow-sm">
              <div>
                <span className="text-md text-gray-900 font-semibold">Informations</span>

                <div className='mt-4'>
                  <div>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>Étiquettes ({examen.options.length})</span>
                            <ChevronUpIcon
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-purple-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            <div className="flex-1 flex">
                              { examen.options.length
                                ? <div className="flex flex-wrap gap-1">
                                  { examen.options.map((item) => (
                                    <span className={classNames(
                                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-gray-800',
                                      item.etiquette.color
                                    )}>
                                      {item.etiquette.label}
                                    </span>
                                    ))}
                                </div>
                                : <div>Aucune étiquettes sélectionnés</div>
                              }
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}