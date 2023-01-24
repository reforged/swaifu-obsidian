import { useCookies } from 'react-cookie'
import { useMutation } from 'react-query'
import { http } from '../utils/helper'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthenticationContext } from '../contexts/AuthenticationContext'

export default () => {
  const [cookie, setCookie, removeCookie] = useCookies(['token'])
  const router = useNavigate()
  const { setUser } = useContext(AuthenticationContext)
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
      setUser(null)
      removeCookie('token')
      router('/login')
    }
  })
}