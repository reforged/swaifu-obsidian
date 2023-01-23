import {useCookies} from "react-cookie";
import {useQuery} from "react-query";
import {http} from "../../utils/helper";
import {IUser} from "@obsidian/type";

type Props = {
  user: IUser
}

export default ({ user }: Props) => {
  const [cookie, setCookie] = useCookies(['token'])

  return useQuery('questions_user', async () => {
    const response = await http.get(`/questions/user/${user.email}`, {
      headers: {
        "Authorization": cookie.token
      }
    })

    return response.data
  }, { staleTime: Infinity })
}