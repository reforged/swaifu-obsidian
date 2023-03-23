import {useContext} from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";
import {Outlet, useNavigate} from "react-router";
import useMe from "../hooks/useMe";

export default function Auth () {
  const [user, setUser] = useContext(AuthenticationContext)
  const router = useNavigate()

  const { data } = useMe()

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