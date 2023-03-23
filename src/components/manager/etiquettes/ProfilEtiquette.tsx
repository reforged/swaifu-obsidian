import React, {Dispatch, Fragment, SetStateAction, useContext, useEffect, useState} from 'react'
import { IColor, IEtiquette } from '../../../utils'
import { Dialog, Transition, Menu } from '@headlessui/react'
import {XMarkIcon, TrashIcon} from '@heroicons/react/24/outline'
import {classNames} from '../../../utils/helper'
import useEtiquettes from "../../../hooks/use-etiquettes";
import SelectMenu from '../SelectMenu'
import {EtiquettesContext} from "../../../contexts/EtiquettesContext";

type IProfil = {
  etiquettes: IEtiquette[]
  open: boolean
  setOpen: any
}

const colorData: IColor[] = [
  {label: 'Gris clair', value: 'bg-[#E2E3E080]'},
  {label: 'Gris', value: 'bg-[#E3E2E0]'},
  {label: 'Marron', value: 'bg-[#EEE0DA]'},
  {label: 'Orange', value: 'bg-[#FADEC9]'},
  {label: 'Jaune', value: 'bg-[#FDECC8]'},
  {label: 'Vert', value: 'bg-[#DBEDDB]'},
  {label: 'Bleu', value: 'bg-[#D3E5EF]'},
  {label: 'Violet', value: 'bg-[#E8DEEE]'},
  {label: 'Rose', value: 'bg-[#F5E0E9]'},
  {label: 'Rouge', value: 'bg-red-200'},
]

export default function ProfilEtiquette ({ open, setOpen, etiquettes }: IProfil) {
  const { destroy, update } = useEtiquettes()
  const { mutate: DestroyEtiquette } = destroy()
  const { mutate: UpdateEtiquette } = update()
  const [disabled, setDisabled] = useState<boolean>(true)
  const [etiquette, setEtiquette] = useContext(EtiquettesContext)

  const [label, setLabel] = useState<string>(etiquette.label)
  const [color, setColor] = useState<IColor>(colorData[0])

  useEffect(() => {
    const item = colorData.find((item) => item.value === etiquette.color)
    setColor(item!)
    setLabel(etiquette.label)
  }, [etiquette])

  
  function verif () {
    let valide = true
    etiquettes.forEach((item) => {
      if (item.id !== etiquette.id) {
        if (item.label === label) {
          valide = false
        }
      }
    })
    return valide
  }

  function handlerUpdate () {
    const newEtiquette: IEtiquette = {
      id: etiquette.id,
      label: label,
      color: color.value
    }
    setOpen(false)
    UpdateEtiquette(newEtiquette)
  }

  useEffect(() => {
    if (verif() && etiquette.label.length && (etiquette.label != label || etiquette.color != color.value)) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [label,color])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white pb-6 shadow-xl">
                    <div className={classNames('h-20 w-full', etiquette.color)} />

                    <div className="mt-8 h-full flex flex-col relative">
                      <div className={"absolute top-0 right-12"}>
                        <button onClick={() => {
                          DestroyEtiquette(etiquette.id)
                          setOpen(false)
                        }}>
                          <TrashIcon className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          <input
                            type="text" value={label}
                            className="block w-full border-0 "
                            onChange={(e) => {
                             setLabel(e.currentTarget.value)
                            }}
                          />
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div>
                          <SelectMenu data={colorData} setColor={setColor} color={color} />
                        </div>
                        <div className="absolute right-0 bottom-12 px-4 sm:px-6">
                          <div>
                            <div>
                              <button 
                                onClick={handlerUpdate} disabled={disabled} type="button"
                                className={classNames(
                                  disabled ? 'bg-red-500' : 'bg-green-500'
                                )}
                              >
                                Modifier
                                </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}