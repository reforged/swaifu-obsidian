import {Link, useLocation} from "react-router-dom";
import Profil from "./Profil";
import {INavigation} from "../../utils";
import {classNames} from "../../utils/helper";

type Props = {
  navigation: INavigation[]
}
export default function Hero ({ navigation }: Props) {
  const location = useLocation()

  return (
    <div className="bg-[#F7F9FC] w-full p-4 flex items-center justify-between relative">
      <div>
        <div className="flex items-center gap-4">
          { navigation.map((item, index) => (
            <div key={index}>
              <Link to={item.href} className={classNames(
                location.pathname === item.href ? 'bg-white border !text-gray-900 font-medium' : '',
                'px-3 py-2 rounded-md text-gray-500'
              )}>
                { item.label}
              </Link>
            </div>
          ))}

        </div>
      </div>
      <div className="relative">
        <Profil />
      </div>
    </div>
  )
}