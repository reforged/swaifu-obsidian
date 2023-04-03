import {useContext, useEffect} from "react";
import RoomContext from "../../../contexts/RoomContext";
import ReactWordcloud, {Word} from 'react-wordcloud'
import {WordCloud} from "../../../utils/room";

export default function ReponseNuageWords () {
  const [room, setRoom] = useContext(RoomContext)

  return (
    <div>
      <div className="" id="container">
        <div id="world-cloud">
          { room.reponses &&
            <div>
              <ReactWordcloud
                words={room.reponses as WordCloud[]}
                options={{
                  fontSizes: [20, 60],
                  fontFamily: "sans-serif",
                  margin: "8px",
                  rotations: 0,
                  rotationAngles: [0, 0],
                  enableTooltip: false,
                  colors: [
                    "#fafafa",
                    "yellow",
                    "green",
                    "pink",
                    "yellow",
                    "green",
                    "pink",
                    "orange"
                  ]
                }}
              />
            </div>
          }
        </div>
      </div>
    </div>
  )
}