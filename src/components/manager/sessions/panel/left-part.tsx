import React, {useContext} from "react";
import StartRoom from "./start-room";
import RoomContext from "../../../../contexts/RoomContext";

export default function LeftPart () {
  const [room, setRoom] = useContext(RoomContext)
  return (
    <RoomContext.Consumer>
      {([room, setRoom]) => (
        <>
          { room.session &&
            <div className="col-span-4 border-r h-full p-4">
              <div className="flex flex-col">
                <h1>{room.session.sequence.label}</h1>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="flex flex-col p-3 bg-gray-100 rounded-md">
                    <span className="text-gray-900 text-sm">Code de la session</span>
                    <span className="text-gray-500">{room.session!.code}</span>
                  </div>
                  <div>
                    <StartRoom />
                  </div>
                </div>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-sm font-title text-gray-500 uppercase">Overview</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col p-3 gap-3 bg-gray-100 rounded-md aspect-video">
                    <span className="text-gray-900">Nombre de questions</span>
                    <span className="text-gray-800 text-7xl">{room.session!.sequence.questions.length}</span>
                  </div>
                  {room.session.users &&
                    <div className="flex flex-col p-3 gap-3 bg-gray-100 rounded-md aspect-video">
                      <span className="text-gray-900 text-sm">Nombre de participants</span>
                      <span className="text-gray-800 text-7xl">{room.session!.users.length}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </>

      )}
    </RoomContext.Consumer>
  )
}