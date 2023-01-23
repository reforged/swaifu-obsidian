import {useCookies} from "react-cookie";
import {useMutation} from "react-query";
import {http} from "../utils/helper";

type Props = {
  data: any
}

export default () => {
  const [cookie, setCookie] = useCookies(['token'])

  return useMutation(async ({ data }: Props) => {
    const response = await http.post('/etiquettes/create', data, {
      method: 'POST',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': cookie.token
      }
    })
  })
}