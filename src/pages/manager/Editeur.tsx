import {createRef, useState} from "react";

export default function Editeur () {

  function onKeyDownhandler (e) {
    if (e.key === '/') {
      console.log("Open Slash Menu")
    }
    if (e.key === 'Enter') {
      console.log("Create new block")
      e.preventDefault()
    }
  }

  return (
    <div>
      <h1>Editeur</h1>
      <div>
        <div
          onKeyDown={onKeyDownhandler}
          contentEditable="true"
          placeholder={"Type '/' for commands"}
        >

        </div>
      </div>
    </div>
  )
}

function EditableBlock () {
  const contentEditable = createRef<any>()
  const [state, setState] = useState({
    htmlBackup: null,
    html: '',
    tag: 'p',
    previousKey: ""
  })

  function onKeyDownHandler (e: KeyboardEvent) {
    if (e.key === '/') {
      console.log("Slash Command menu")
    }
    if (e.key === 'Enter') {
      if (state.previousKey !== "Shift") {
        e.preventDefault()

      }
    }
  }
}