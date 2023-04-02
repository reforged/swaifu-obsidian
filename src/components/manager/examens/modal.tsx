import React, {useContext, useEffect, useState} from "react";
import ExamenContext from "../../../contexts/ExamenContext";
import {ExclamationCircleIcon, PlusIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {classNames, combinaison} from "../../../utils/helper";
import {ChevronDownIcon, CircleStackIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import AddEtiquette from "./buttons/add-etiquette";
import OptionEtiquette from "./option-etiquette";
import { Disclosure } from '@headlessui/react'
import Examen from "./examen";
import TotalQuestion from "./total-question";
import TotalSujets from "./total-sujets";
import {Interval} from "./types";

export default function Modal ({ toggle }) {
  const [examen, setExamen] = useContext(ExamenContext)
  const [nbSujet, setNbSujet] = useState(0)
  const [disabled, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    //const data = combinaison(examen.nbQuestions, examen.totalQuestions)
    if (examen.options.length) {
      const data = new Examen(examen.nbQuestions, examen.nbSujets, examen.options)
      const combinaisonEtiquettes: Interval[] = data.getCombinaison()
      const total = data.numberQuestionsUnique()
      const combinaisonTotal = combinaison(examen.nbQuestions, total)

      if (total) {
        if (total !== examen.totalQuestions) {
          setExamen({
            ...examen,
            totalQuestions: total
          })
        }
      }
      if (combinaisonEtiquettes) {
        if (combinaisonEtiquettes.length > combinaisonTotal) {
          if (combinaisonTotal !== examen.combinaison) {
            setExamen({
              ...examen,
              combinaison: combinaisonTotal
            })
          }
        } else {
          if (combinaisonEtiquettes.length !== examen.combinaison) {
            setExamen({
              ...examen,
              combinaison: combinaisonEtiquettes.length
            })
          }
        }
      }
    }


  }, [examen])

  useEffect(() => {
    if (
      examen.combinaison >= examen.nbSujets &&
      examen.nbQuestions <= examen.totalQuestions &&
      examen.label.length
    ) setDisabled(false)
    else setDisabled(true)
  }, [examen])


  function createExamen () {
    const data = new Examen(examen.nbQuestions, examen.nbSujets, examen.options)
    const result = data.execute()
    setExamen({
      ...examen,
      sujets: result
    })
  }

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
              <div className="flex justify-between items-start pb-8">
                <div className="flex flex-col">

                  <TotalSujets />
                  <TotalQuestion />
                  <span>
                    {examen.totalQuestions}
                  </span>
                </div>


                <AddEtiquette />
              </div>
              <span>Nombre de sujets possibles : {examen.combinaison}</span>
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
                    onClick={createExamen}
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