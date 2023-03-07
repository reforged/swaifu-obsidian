import Profil from "../../../components/manager/Profil";
import {Link} from "react-router-dom";
import Hero from "../../../components/manager/Hero";
import {INavigation} from "../../../utils";

const navigation: INavigation[] = [
  { label: 'Home', href: '/manager/comptes'},
  { label: 'Users', href: '/manager/comptes/users'},
  { label: 'Roles', href: '/manager/comptes/roles'},
  { label: 'Permissions', href: '/manager/comptes/permissions'}
]

export default function HomeComptes () {
  return (
    <div>
      <Hero navigation={navigation}/>
      Hello Comptes
    </div>
  )
}
