import { useCookies } from 'react-cookie'
import {useQuery, useQueryClient} from "react-query";
import {http} from "../utils/helper";

export default function usePermissions () {
  const [cookie, setCookie] = useCookies(['token'])
  const queryClient = useQueryClient()

  function index () {
    return useQuery('permissions', async () => {
      const response = await http.get('/permissions', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        },
        withCredentials: true
      })

      return response.data
    })
  }

  return { index }
}