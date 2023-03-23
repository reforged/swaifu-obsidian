import {useCookies} from "react-cookie";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {http} from "../utils/helper";
import {useNavigate} from "react-router";
import {queryKeys} from "./query-keys";
import {useContext} from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";

type PropsLoginEmail = {
  email: string
  password: string
}

type PropsRegister = {
  email: string
  firstname: string
  lastname: string
  password: string
}

type PropsLoginCode = {
  numero: string
  password: string
}

const useAuthentication = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['token'])
  const [ user, setUser ] = useContext(AuthenticationContext)
  const queryClient = useQueryClient()
  const router = useNavigate()

  function loginEmail () {
    return useMutation(async (data: PropsLoginEmail) => {
      const response = await http.post('/authentication/login/email', data,{
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        }
      })

      setCookie('token', `${response.data.token}`, {
        path: '/',
        sameSite: true
      })
      http.defaults.headers.common['Authorization'] = `${response.data.token.token}`

      return response.data
    }, {
      onSuccess: async () => {
        router('/')
      }
    })
  }

  function loginCode () {
    return useMutation(async (data: PropsLoginCode) => {
      const response = await http.post('/authentication/login/numero', data, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        }
      })

      setCookie('token', `${response.data.token}`, {
        path: '/',
        sameSite: true
      })
      http.defaults.headers.common['Authorization'] = `${response.data.token.token}`

      return response.data
    }, {
      onSuccess: async () => {
        router('/')
      }
    })
  }

  function logout () {
    return useMutation(async () => {
      const reponse = await http.delete('/authentication/logout', {
        method: 'DELETE',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": cookie.token
        }
      })

      return reponse.data
    }, {
      onSuccess: async () => {
        router('/authentication/login')
        removeCookie('token')
      }
    })
  }

  function register () {
    return useMutation(async (data: PropsRegister) => {
      const response = await http.post('/authentication/register', data, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        }
      })

      setCookie('token', `${response.data.token}`, {
        path: '/',
        sameSite: true
      })
      http.defaults.headers.common['Authorization'] = `${response.data.token.token}`
      return response.data
    }, {
      onSuccess: async () => {
        router('/')
      }
    })
  }

  function me () {
    return useQuery(queryKeys.auth, async () => {
      try {
        const response = await http.get('/authentication/me', {
          headers: {
            "Authorization": cookie.token
          }
        })

        setUser(response.data)
        return response.data
      } catch (e) {}
    })
  }

  return { loginEmail, loginCode, logout, register, me }
}

export default useAuthentication