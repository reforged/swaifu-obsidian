import {useCookies} from "react-cookie";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {http} from "../utils/helper";
import {ISession} from "../utils";

export default function useSessions () {
  const [cookie, setCookie] = useCookies(['token'])
  const queryClient = useQueryClient()

  function index () {
    return useQuery('sessions', async () => {
      const response = await http.get('/sessions', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        },
        withCredentials: true
      })
      return response.data
    })
  }

  function show (data: string) {
    return useQuery('session', async () => {
      const response = await http.get(`/sessions/${data}`, {
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
    return useMutation(async (sequenceId: string) => {
      const response = await http.post('/sessions/create', { sequence: sequenceId}, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        }
      })

      return response.data
    }, {
      onSuccess: async (session: ISession) => {

      }
    })
  }

  return { index, store, show }
}