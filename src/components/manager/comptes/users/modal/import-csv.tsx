import {Dispatch, useContext, useEffect, useRef, useState} from "react";
import {CircleStackIcon, TrashIcon} from "@heroicons/react/24/outline";
import {classNames} from "../../../../../utils/helper";
import {IUser} from "../../../../../utils";
import useUsers from "../../../../../hooks/use-users";

type RowCsv = [
  firstname: string,
  lastname: string,
  ine: string
]

export default function ImportCsv () {
  const [csvFile, setCsvFile] = useState(null)
  const [csvArray, setCsvArray] = useState<any>([])
  const [ine, setIne] = useState<string[]>([])
  const { index } = useUsers()
  const { data, isLoading } = index()
  const [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    setIne(data.map((item) => item.ine))
  }, [data])

  function processCsv (str: string) {
    let rows: any = str.split("\n")
    rows = rows.map((row: any) => {
      return row.replace(/;/g, " ").split(' ');
    }).filter((item) => !ine.includes(item[2]))
    setCsvArray(rows)
  }

  function handleFileUpload () {
    const file = csvFile
    const reader = new FileReader()

    reader.onload = (e) => {
      const text = e.target!.result as string
      processCsv(text)
    }

    reader.readAsText(file!)
  }

  useEffect(() => {
    if (csvFile) {
      handleFileUpload()
    }
  }, [csvFile])

  return (
    <div className="p-8 flex flex-col h-full justify-between">
      <div>
        <h3 className="font-title text-2xl font-medium">Importer des utilisateurs</h3>
        <div>
          {
            !csvFile ? <div className="pt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">Utilisateurs</label>
              <UploadCsv setCsvFile={setCsvFile} />
            </div>
              : <div>{ csvFile.name}</div>
          }

        </div>

        <div>
          {csvArray.length ?
            <div className="flex flex-col">
              { csvArray.map((item: RowCsv, key: number) => (
                <div key={key}>
                  <ViewUser
                    user={item}
                    csvArray={csvArray}
                    setCsvArray={setCsvArray}
                    index={key}
                  />
                </div>

              ))}
            </div>
            : <div>Pas importé le csv</div>
          }
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-12">
        <div>
          <button
            disabled={disabled}
            className={classNames(
              'rounded-md px-3 py-2 border',
              disabled ? 'text-gray-400 bg-gray-50' : 'bg-indigo-500 text-white'
            )}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}


function UploadCsv ({ setCsvFile }: any) {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const inputRef = useRef(null)

  function handleDrag (e: any) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  function handleDrop (e: any) {
    e.preventDefault()
    e.stopPropagation()
    setCsvFile(e.dataTransfer.files[0])
  }

  function handleChange (e: any) {
    e.preventDefault()
    setCsvFile(e.target.files[0]);
  }

  function onButtonClick () {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div onDrop={handleDrop} onDragOver={handleDrag} className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6" ref={inputRef}>
      <div className="space-y-1 text-center">
        <CircleStackIcon className="mx-auto h-12 text-gray-400" />

        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className={classNames(
              "relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500",
            )}
          >
            <button onClick={onButtonClick}>
              <span>Upload a CSV file</span>
            </button>

            <input
              type="file"
              ref={inputRef}
              id="file-upload"
              name="file-upload"
              accept=".csv"
              onChange={(e: any) => {
                setCsvFile(e.target.files[0]);
              }}
              className="sr-only"
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">CSV up to 10MB { dragActive ? <span>Active</span> : <span>pas active</span>}</p>
      </div>
    </div>
  )
}


type UserProps = {
  user: RowCsv
  setCsvArray: Dispatch<any>
  csvArray: []
  index: number
}
function ViewUser ({ user, setCsvArray, csvArray, index }: UserProps) {

  function removeUser () {
    const list = csvArray
    csvArray.splice(index, 1)
    setCsvArray([...list])
  }
  return (
    <div className="flex items-center relative justify-between group hover:bg-gray-100 p-3 pr-12 rounded-md">
      <div
        className={classNames(
          'flex items-center gap-1',
        )}
      >
        <span>{user[0]}</span>
        <span>{user[1]}</span>
      </div>

      <span>{user[2]}</span>

      <div className="absolute invisible group-hover:visible right-2">
        <button onClick={removeUser}>
          <span>
            <TrashIcon className="w-6 text-gray-500" />
          </span>
        </button>
      </div>
    </div>
  )
}