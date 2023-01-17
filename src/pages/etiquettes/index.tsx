import React, {Dispatch, SetStateAction, useState} from 'react'
import {ChatBubbleLeftRightIcon, PlusIcon} from "@heroicons/react/24/outline";
import useComponentVisible from "../../hooks/useComponentVisible";
import {AnimatePresence, motion} from "framer-motion";
import { IEtiquette } from '../../utils'
import ProfilEtiquette from "../../components/etiquettes/ProfilEtiquette";

type EtiquetteProps = {
  data: IEtiquette
  toggle: any
  setData: Dispatch<SetStateAction<IEtiquette | null>>
}

const data: IEtiquette[] = [
  {label: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', color: 'red'},
  {label: 'Test 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', color: 'blue'},
  {label: 'Java', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', color: 'gray'},
]

export default function HomeEtiquette () {
  const { ref, isVisible, toggle } = useComponentVisible()
  const [etiquette, setEtiquette] = useState<IEtiquette | null>(null)
  return (
    <div className={"relative"}>
      <h1 className="text-2xl font-medium">Hello Etiquettes</h1>

      <div className="grid grid-cols-4 mt-12 gap-4">
        {data.map((item: IEtiquette) => (
          <Etiquette data={item} toggle={toggle} setData={setEtiquette}/>)
        )}
        <CreateEtiquette />
      </div>
      {
        etiquette && <ProfilEtiquette open={isVisible} setOpen={toggle} etiquette={etiquette}/>
      }
    </div>
  )
}

const Etiquette = ({ data, toggle, setData }: EtiquetteProps) => {
  const click = () => {
    toggle()
    setData(data)
  }
  return (
    <button onClick={() => click()}>
      <div className="col-span-1 border border-gray-200 rounded-md shadow hover:shadow-xl p-5 duration-200 ease-in-out">
        <div className="w-10 h-10 flex items-center justify-center">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-800" />
        </div>
        <div className="space-y-2">
          <p className="text-md font-medium">{ data.label }</p>
          <p className="text-sm">{ data.description }</p>
        </div>
      </div>
    </button>

  )
}

const CreateEtiquette = () => {
  const { ref, isVisible, toggle } = useComponentVisible()
  return (
    <div className={"col-span-1 h-full"}>
      <button
        type="button"
        onClick={() => toggle()}
        className="relative block w-full h-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >

        <PlusIcon className="mx-auto h-12 w-12 text-gray-400" />

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
                  <form action="" method={"POST"} className="text-gray-600 flex flex-col gap-4" encType="multipart/form-data">
                    <div className="">
                      <label htmlFor="name">Name of application</label>
                      <div className="mt-1">
                        <input type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="description">Description of application</label>
                      <div className="mt-1">
                        <input type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                      </div>
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