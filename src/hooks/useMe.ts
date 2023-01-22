import { useQuery } from 'react-query'
import { queryKeys } from './query-keys'
import { http } from '../utils/helper'
import { useCookies } from 'react-cookie'
import { useContext } from 'react'
import { AuthenticationContext } from '../contexts/AuthenticationContext'

export default () => {
  const [cookie] = useCookies(['token'])
  const { setUser } = useContext(AuthenticationContext)

  return useQuery(queryKeys.auth, async () => {
    try {
      const response = await http.get('http://localhost:3333/authentication/me', {
        headers: {
          "Authorization": cookie.token
        }
      })
      setUser(response.data)
      return response.data
    } catch (e) {}
  }, {staleTime: Infinity})
}