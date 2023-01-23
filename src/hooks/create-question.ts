import {useCookies} from "react-cookie";
import {useMutation} from "react-query";
import {http} from "../utils/helper";
import {IQuestion} from "@obsidian/type";

type Props = {
  data: any
}
export default () => {
  const [cookie, setCookie] = useCookies(['token'])

  return useMutation(async ({ data }: Props) => {
    const response = await http.post('/questions/create', data, {
      method: 'POST',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': cookie.token
      }
    })
  })
}