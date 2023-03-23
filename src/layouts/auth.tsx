import {useContext} from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";
import {Outlet, useNavigate} from "react-router";
import useAuthentication from "../hooks/use-authentication";

export default function Auth () {
  const [user, setUser] = useContext(AuthenticationContext)
  const {  me } = useAuthentication()
  const router = useNavigate()

  const { data } = me()

  if (!user) {
    router('/login')
    return <div>Non Connecté</div>
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}