import { useCookies } from 'react-cookie'
import ApiRequestBuilder from "./ApiRequestBuilder";
import {useQuery, useQueryClient} from "react-query";
import {http} from "../utils/helper";

export default function useUsers () {
  const [cookie, setCookie] = useCookies(['token'])
  const queryClient = useQueryClient()

  function index () {
    return useQuery('users', async () => {
      const response = await http.get('/users', {
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