import {INavigation} from "../../../utils";
import Hero from "../../../components/manager/Hero";
import Manager from "../../../layouts/manager";

const pages = [
  { label: 'Home', href: '/qcm', current: true},
  { label: 'Questions', href: '/qcm/questions', current: false},
  { label: 'Etiquettes', href: '/qcm/etiquettes', current: false},
  { label: 'Séquences', href: '/qcm/sequences', current: false},
  { label: 'Sessions', href: '/qcm/sessions', current: false},
  { label: 'Examens', href: '/qcm/examens', current: false},
]

const navigation = [
  {name: "QCM", href: '/manager/qcm', current: true},
]

export default function HomeQCM () {
  return (
    <Manager
      layout={{
        label: 'QCM',
        location: navigation,
        navigation: pages
      }}
    >
      <div>
        Hello QCM
      </div>
    </Manager>

  )
}