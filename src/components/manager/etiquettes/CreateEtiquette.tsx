import useComponentVisible from '../../../hooks/useComponentVisible'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SelectMenu from '../SelectMenu'
import { classNames } from '../../../utils/helper'
import { IColor, IEtiquette } from '@obsidian/type'
import useEtiquettes from "../../../hooks/use-etiquettes";

type Props = {
  data: IEtiquette[]
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
  {label: 'Rouge', value: 'bg-[#FFE2DD]'},
]
export default function CreateEtiquette ({ } ) {
  const { ref, isVisible, toggle } = useComponentVisible()
  const [name, setName] = useState<string>('')

  const [color, setColor] = useState<IColor>(colorData[0])
  const [disable, setDisable] = useState<boolean>(true)
  const { create } = useEtiquettes()
  const { mutate: InitEtiquette } = create()

  useEffect(() => {
    if (name) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [name])

  const submit = () => {
    const newEtiquette = {
      label: name,
      color: color.value
    }
    InitEtiquette(newEtiquette)
    toggle()
  }

  return (
    <div className={"col-span-1 h-full"}>
      <button
        type="button"
        onClick={() => toggle()}
        className="relative block w-full h-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span className="mt-2 block text-sm font-medium text-gray-900">Créer une étiquette</span>
      </button>
      <AnimatePresence>
        { isVisible &&
          <motion.div
            className="fixed z-[99] inset-0 bg-black bg-opacity-75"
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
              ease: [0.5, 0.71, 1, 1.5],
            }}
            exit={{ opacity: 0}}
            initial={{ opacity: 0}}
          >
            <div ref={ref} className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-96 p-8 bg-white border border-gray-200 rounded-lg shadow-2xl">
              <div className="flex flex-col">
                <div className="flex flex-col gap-2">
                  <h3 className="font-title text-2xl text-[#565a90] font-medium">Créer une étiquette</h3>
                  <h4 className="text-xs text-gray-500">You can configure your application once created</h4>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                  <form action="src/components/manager/etiquettes/CreateEtiquette" method={"POST"} className="text-gray-600 flex flex-col gap-4" encType="multipart/form-data">
                    <div className="">
                      <label htmlFor="name">Nom de l'étiquette</label>
                      <div className="mt-1">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                
                    <div>
                      <SelectMenu data={colorData} setColor={setColor} color={color}/>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className={classNames(
                          disable ? 'button--disable' : 'button--not--disable',
                          'button'
                        )}
                        disabled={disable}
                        onClick={submit}
                        type={"button"}
                      >
                        Créer étiquette
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <button
                className="absolute top-0 right-0 m-4 bg-slate-100 shadow-sm rounded-full p-2"
                onClick={toggle}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>

  )
}