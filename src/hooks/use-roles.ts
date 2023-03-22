import { useCookies } from 'react-cookie'
import ApiRequestBuilder from "./ApiRequestBuilder";
import {useQuery, useQueryClient} from "react-query";
import {http} from "../utils/helper";
import {IUser} from "../utils";

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

  return { index }
}