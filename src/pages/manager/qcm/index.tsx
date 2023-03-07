import {INavigation} from "../../../utils";
import Hero from "../../../components/manager/Hero";

const navigation: INavigation[] = [
  { label: 'Home', href: '/manager/qcm'},
  { label: 'Questions', href: '/manager/qcm/questions'},
  { label: 'Etiquettes', href: '/manager/qcm/etiquettes'},
  { label: 'Séquences', href: '/manager/qcm/sequences'},
]

export default function HomeQCM () {
  return (
    <div>
      <Hero navigation={navigation} />
      Hello QCM
    </div>
  )
}