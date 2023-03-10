import React, {Dispatch, Fragment, SetStateAction, useContext, useEffect, useState} from 'react'
import useComponentVisible from "../../../../hooks/useComponentVisible";
import {AnimatePresence, motion} from "framer-motion";
import { Menu, Transition } from '@headlessui/react'
import {
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/react/20/solid";
import {IQuestion, IReponse, ISequence} from "../../../../utils";
import MarkDownRender from "../../../../components/manager/questions/editor/MarkDownRender";
import {classNames} from "../../../../utils/helper";
import useQuestions from "../../../../hooks/use-questions";
import useSequences from "../../../../hooks/use-sequences";
import {useQuery} from "react-query";
import CreateSequence from "../../../../components/manager/sequences/CreateSequence";
import Hero from "../../../../components/manager/Hero";
import {INavigation} from "../../../../utils";
import {Link} from "react-router-dom";
import {
  FolderIcon,
  PlusIcon,
  QueueListIcon,
  SwatchIcon,
  ViewColumnsIcon
} from "@heroicons/react/24/outline";
import Search from "../../../../components/Search";
import DragIcon from "../../../../components/icons/DragIcon";
import SequenceContext from "../../../../contexts/SequenceContext";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Manager from "../../../../layouts/manager";


type ReponsesPreviewProps = {
  data: IReponse[]
}

type View = 'galerie' | 'liste'

const navigation: INavigation[] = [
  { label: 'Home', href: '/manager/qcm'},
  { label: 'Questions', href: '/manager/qcm/questions'},
  { label: 'Etiquettes', href: '/manager/qcm/etiquettes'},
  { label: 'Séquences', href: '/manager/qcm/sequences'},
]

const pages = [
  { name: 'QCM', href: '/manager/qcm', current: false},
  { name: 'Séquences', href: '/manager/qcm/sequences', current: true},
]

export default function HomeSequence () {
  const { ref, isVisible, toggle } = useComponentVisible()
  const [sequence, setSequence] = useState<ISequence>({
    label: '',
    questions: []
  })
  const { fetchByUser } = useQuestions()
  const { getAll } = useSequences()
  const { data } = useQuery('sequences', getAll)
  const [search, setSearch] = useState<string>('')
  const [view, setView] = useState<View>('liste')

  return (
    <Manager>
      <div className="h-full">
        <SequenceContext.Provider value={[ sequence, setSequence ]}>
          <div className="relative min-h-full">
            <Hero navigation={navigation} />
            <div className="p-12">
              <Breadcrumbs pages={pages} />
              <div className="mt-12">
                <h1 className="text-title">Séquences</h1>

                <div className="w-full bg-[#F7F9FC] rounded-md border mt-8">
                  <div className="flex items-center py-3 px-8 justify-between border-b">
                    <div>
                      <button className="flex items-center gap-2 border rounded-md px-3 py-2">
                      <span>
                        <PlusIcon className="w-6 " />
                      </span>
                        <span>Séquence</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <Search value={search} setValue={setSearch} />

                      <div className="relative">
                        <Menu>
                          <Menu.Button>
                            <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                       <span>
                          <SwatchIcon className="w-6" />
                        </span>
                              <span>Filter</span>
                            </div>
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 p-4 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
                              filter
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>

                      <div className="relative">
                        <ViewForm setView={setView} view={view} />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-4 gap-3 pt-4 relative z-none">
                  { data && <span>Existe</span>
                  }
                  <div>
                    <button
                      type="button"
                      onClick={toggle}
                      className="relative w-full h-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-0"
                    >
                      <span className="mt-2 block text-sm font-medium text-gray-900">Créer une séquence</span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <AnimatePresence>
                  { isVisible &&
                    <motion.div
                      className=""
                      animate={{opacity: 1}}
                      transition={{
                        duration: 0.2,
                        ease: [0.5, 0.71, 1, 1.5],
                      }}
                      exit={{opacity: 0}}
                      initial={{opacity: 0}}
                    >
                      <CreateSequence toggle={toggle} />
                    </motion.div>
                  }
                </AnimatePresence>
              </div>
            </div>
          </div>
        </SequenceContext.Provider>
      </div>
    </Manager>
  )
}

type ViewProps = {
  view: View
  setView: Dispatch<SetStateAction<View>>
}
function ViewForm ({ view, setView}: ViewProps) {
  return (
    <div>
      <>
        { view === 'galerie' && <Galerie view={view} setView={setView} />}
        { view === 'liste' && <Liste view={view} setView={setView} /> }
      </>

    </div>
  )
}

function Galerie ({ setView }: ViewProps) {
  return (
    <button
      className="flex items-center gap-2 border rounded-md px-3 py-2"
      onClick={() => {
        setView('liste')
      }}
    >
      <span>
        <FolderIcon className="w-6" />
      </span>
      <span>Galerie</span>
    </button>
  )
}

function Liste ({ setView }: ViewProps) {
  return (
    <button
      className="flex items-center gap-2 border rounded-md px-3 py-2"
      onClick={() => {
        setView('galerie')
      }}
    >
      <span>
        <QueueListIcon className="w-6" />
      </span>
      <span>Liste</span>
    </button>
  )
}