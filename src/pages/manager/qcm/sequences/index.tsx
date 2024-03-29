import React, { useState} from 'react'
import useComponentVisible from "../../../../hooks/useComponentVisible";
import {IQuestion, IReponse, ISequence} from "../../../../utils";
import {classNames, uid} from "../../../../utils/helper";
import useQuestions from "../../../../hooks/use-questions";
import useSequences from "../../../../hooks/use-sequences";
import CreateSequence from "../../../../components/manager/sequences/CreateSequence";
import SequenceContext from "../../../../contexts/SequenceContext";
import Manager from "../../../../layouts/manager";
import Board from "../../../../components/manager/board/Board";
import {Options} from "../../../../components/manager/board/types";
import SequenceStories from "../../../../components/manager/sequences/sequence-stories";

const pages = [
  { label: 'Home', href: '/manager/qcm', current: false},
  { label: 'Questions', href: '/manager/qcm/questions', current: false},
  { label: 'Etiquettes', href: '/manager/qcm/etiquettes', current: false},
  { label: 'Séquences', href: '/manager/qcm/sequences', current: true},
  { label: 'Sessions', href: '/manager/qcm/sessions', current: false},
  { label: 'Examens', href: '/manager/qcm/examens', current: false},
]

const navigation = [
  {name: "QCM", href: '/manager/qcm/home', current: false},
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
