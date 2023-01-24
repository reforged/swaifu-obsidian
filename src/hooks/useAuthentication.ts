import {useMutation, useQuery} from 'react-query'
import { queryKeys } from './query-keys'
import {useCookies} from "react-cookie";
import {http} from "../utils/helper";
import {useNavigate} from "react-router";

type PropsLogin = {
  email: string
  password: string
}

const useAuthentication = () => {
  function login ({ email, password }: PropsLogin) {
    return useQuery(queryKeys.auth, async () => {
      const response = await fetch('http://localhost:3333/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password}),
        credentials: 'same-origin',
      })

      return response.json()
    }, { staleTime: 1 })
  }

  function logout () {
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const router = useNavigate()
    return useMutation(async () => {
      const response = await http.delete('/authentication/logout', {
        method: "DELETE",
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": cookie.token
        }
      })

      return response.data
    }, {
      onSuccess: async () => {
        router('/')
        removeCookie('token')
      }
    })
  }

  return {
    login,
    logout
  }
}

export default useAuthentication