import Manager from "../../../../layouts/manager";
import Board from "../../../../components/manager/board/Board";
import {IExamen} from "../../../../utils";
import {Options} from "../../../../components/manager/board/types";
import {uid} from "../../../../utils/helper";
import CreateExamen from "../../../../components/manager/examens/create-examen";

const pages = [
  { label: 'Home', href: '/manager/qcm', current: false},
  { label: 'Questions', href: '/manager/qcm/questions', current: false},
  { label: 'Etiquettes', href: '/manager/qcm/etiquettes', current: false},
  { label: 'Séquences', href: '/manager/qcm/sequences', current: false},
  { label: 'Sessions', href: '/manager/qcm/sessions', current: false},
  { label: 'Examens', href: '/manager/qcm/examens', current: true}
]

const navigation = [
  {name: "QCM", href: '/manager/qcm', current: false},
  {name: 'Examens', href: '/manager/qcm/examens', current: true}
]

export default function HomeExamen () {
  const options: Options<IExamen> = {
    filter: {
      uid: uid(),
      conjunction: 'and',
      conditions: []
    },
    rowAction(item: IExamen): void {},
    view: 'galerie',
    label: 'Questions',
    search: '',
    structure: [],
    keys: ['label'],
    open: false,
    option: ['filter', "mode"]
  }

  return (
    <Manager layout={{
      label: 'Examens',
      location: navigation,
      navigation: pages
    }}>
      <div>
        <Board<IExamen> name={"Examen"} options={options} action={<CreateExamen />}>
          lorem
        </Board>
      </div>
    </Manager>
  )
}