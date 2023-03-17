import ApiRequestBuilder from "./ApiRequestBuilder";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {http} from "../utils/helper";
import {useCookies} from "react-cookie";

export default function useSequences () {
  const [cookie, setCookie] = useCookies(['token'])
  const queryClient = useQueryClient()

  function fetch () {
    return useQuery('sequences', async () => {
      const response = await http.ge('/sequences', {
        headers: {
          "Authorization": cookie.token
        }
      })

      return response.data
    })
  }

  function store () {
    return useMutation(async (data: any) => {
      const response = await http.post('/sequences/create', data, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        }
      })

      return response.data
    }, {
      onSuccess: async (data) => {
        queryClient.setQueryData(['sequences'], (oldData: any) => [data, ...oldData])
      }
    })
  }


  return { store, fetch }
}