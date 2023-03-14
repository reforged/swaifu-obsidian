import { useCookies } from 'react-cookie'
import ApiRequestBuilder from "./ApiRequestBuilder";
import {useQuery, useQueryClient} from "react-query";
import {http} from "../utils/helper";
import {IUser} from "../utils";

export default function usePermissions () {
  const [cookie, setCookie] = useCookies(['token'])
  const queryClient = useQueryClient()

  function index () {
    return useQuery('Permissions', async () => {
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