import {useCookies} from "react-cookie";
import {useMutation, useQueryClient} from "react-query";
import {http} from "../utils/helper";

type Props = {
  data: any
}

export default () => {
  const [cookie, setCookie] = useCookies(['token'])
  const queryClient = useQueryClient()

  return useMutation(async ({ data }: Props) => {
    const response = await http.post('/etiquettes/create', data, {
      method: 'POST',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': cookie.token
      }
    })

    return response.data
  }, {
    onSuccess: async (data, variables,context) => {
      console.log(data, variables, context)
      queryClient.setQueryData(['etiquettes'], (oldData: any) => {
        return [...oldData, data]
      })
    }
  })
}