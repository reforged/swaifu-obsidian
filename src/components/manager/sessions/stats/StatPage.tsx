import {CheckIcon, QuestionMarkCircleIcon, UsersIcon} from '@heroicons/react/24/outline'
import {Link} from "react-router-dom";
import Board from "../../board/Board";
import {Options} from "../../board/types";
import Question from "../../questions/ShowQuestion";
import {IQuestion} from "../../../../utils";
import {uid} from "../../../../utils/helper";
import QuestionStat from "./panel/ShowQuestionStat";



const questiontest: IQuestion[] = [
      { id:"1", label: "salut", type :"yes",enonce:[],
        etiquettes: [
          {id: '2',label: 'Test 2', color: 'blue'},
          {id: '3',label: 'Java', color: 'gray'}
        ],
        reponses: [
          {body: "test", valide: true}
        ]
      },
      { id:"2", label: "salutation", type :"no",enonce:[],
        etiquettes: [
          {id: '1', label: 'Lorem ipsum', color: 'red'},
        ],
        reponses: [
          {body: "tt", valide: false},
          {body: "hgfhzvhdzbjzsjbhz", valide: true}
        ]
      }
]



const stats = [
  { id: 1, name: 'Nombre Total de personne', stat: '80', icon: UsersIcon},
  { id: 2, name: 'Nombre de question', stat: '10', icon: QuestionMarkCircleIcon},
  { id: 3, name: 'Pourcentage de réussite', stat: '57.26%', icon: CheckIcon},
]

const options: Options<IQuestion> = {
    filter: {
        uid: uid(),
        conjunction: 'and',
        conditions: []
    },

    data: questiontest,
    view: 'liste',
    label: 'Questions',
    search: '',
    structure: [],
    keys: ['label'],
    open: false,
    option: ["mode"]
}

export default function StatPage() {
  return(

      <div>

          <h3 className="text-center font-semibold leading-6 text-gray-900">Sujet de Mr. Toto</h3>
          <Board<IQuestion> name={'StatPage'} options={options}>
              <div>
                  {questiontest.map((item) => (
                      <div className="grid grid-cols-3 gap-4 p-4">
                          <QuestionStat question={item} />
                      </div>
                  ))}
              </div>

          </Board>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {stats.map((item) => (
                      <div
                          key={item.id}
                          className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
                      >
                          <dt>
                              <div className="absolute rounded-md bg-indigo-500 p-3">
                                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                              </div>
                              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                          </dt>
                          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                              </div>
                          </dd>
                      </div>
                  ))}
              </dl>
      </div>



  )
}


