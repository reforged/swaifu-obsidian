import Profil from "../../../components/manager/Profil";
import {Link} from "react-router-dom";
import Hero from "../../../components/manager/Hero";
import {INavigation} from "../../../utils";
import Manager from "../../../layouts/manager";

const pages = [
  { name: 'Accueil', href: '/accounts', current: true},
  { name: 'Utilisateurs', href: '/accounts/users', current: false},
]

export default function HomeComptes () {
  return (
    <Manager
      layout={{
        label: 'Comptes',
        location: [],
        navigation: pages
      }}
    >
      <div>
        Hello Comptes
      </div>
    </Manager>
  )
}
