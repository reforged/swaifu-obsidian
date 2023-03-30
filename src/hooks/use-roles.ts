import { useCookies } from 'react-cookie'
import {useMutation, useQuery, useQueryClient} from "react-query";
import {http} from "../utils/helper";


export default function useRoles () {
  const [cookie, setCookie] = useCookies(['token'])
  const queryClient = useQueryClient()

  function index () {
    return useQuery('roles', async () => {
      const response = await http.get('/roles', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        },
        withCredentials: true
      })

      return response.data
    })
  }

  function store () {
    return useMutation(async (data: any) => {
      const response = await http.post('/roles/create', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        },
        withCredentials: true
      })

      return response.data
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['roles'])
      }
    })
  }

  function destroy () {
    return useMutation(async (data: any) => {
      const response = await http.delete(`/roles/${data.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        },
        withCredentials: true
      })

      return response.data
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['roles'])
      }
    })
  }

  return { index, store, destroy }
}