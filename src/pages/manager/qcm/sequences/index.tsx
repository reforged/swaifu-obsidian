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
import {classNames, uid} from "../../../../utils/helper";
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
import Manager from "../../../../layouts/manager";
import Board from "../../../../components/manager/board/Board";
import {Options} from "../../../../components/manager/board/types";
import SequenceStories from "../../../../components/manager/sequences/sequence-stories";
import {CoupleConditionContract} from "../../../../components/manager/board/filter/types";


type ReponsesPreviewProps = {
  data: IReponse[]
}

type View = 'galerie' | 'liste'

const pages = [
  { label: 'Home', href: '/manager/qcm', current: false},
  { label: 'Questions', href: '/manager/qcm/questions', current: false},
  { label: 'Etiquettes', href: '/manager/qcm/etiquettes', current: false},
  { label: 'Séquences', href: '/manager/qcm/sequences', current: true},
  { label: 'Sessions', href: '/manager/qcm/sessions', current: false},
]

const navigation = [
  {name: "QCM", href: '/manager/qcm', current: false},
  {name: "Séquences", href: '/manager/qcm/sequences', current: true},
]

export default function HomeSequence () {
  const { ref, isVisible, toggle } = useComponentVisible()
  const [sequence, setSequence] = useState<ISequence>({
    label: '',
    questions: []
  })
  const { fetchByUser } = useQuestions()
  const { fetch } = useSequences()
  const { data } = fetch()

  const options: Options<ISequence> = {
    label: 'Séquence',
    view: 'galerie',
    data: data,
    filter: {
      uid: uid(),
      conjunction: 'and',
      conditions: []
    },
    search: '',
    structure: [],
    keys: ['label'],
    option: [],
    open: false
  }

  return (
    <Manager
      layout={{
        label: 'Séquences',
        location: navigation,
        navigation: pages
      }}
    >
      <SequenceContext.Provider value={[ sequence, setSequence ]}>
         <div>
           <div className="relative">
             <div className="mt-12">
               <Board name={"Séquence"} options={options} action={<CreateSequence toggle={toggle} />}>
                 { data ? <div>
                   <SequenceStories sequences={data} />
                 </div>: 'pas de données'}
               </Board>
             </div>
           </div>
         </div>
      </SequenceContext.Provider>
    </Manager>
  )
}
