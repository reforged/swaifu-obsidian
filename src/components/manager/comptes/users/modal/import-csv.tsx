import {Dispatch, useContext, useEffect, useRef, useState} from "react";
import {CircleStackIcon, TrashIcon} from "@heroicons/react/24/outline";
import {classNames} from "../../../../../utils/helper";
import {IUser} from "../../../../../utils";
import useUsers from "../../../../../hooks/use-users";

type RowCsv = [
  firstname: string,
  lastname: string,
  numero: string
]

type Props = {
  toggle: () => void
}
export default function ImportCsv ({ toggle }: Props) {
  const [csvFile, setCsvFile] = useState(null)
  const [csvArray, setCsvArray] = useState<any>([])
  const [numero, setNumero] = useState<string[]>([])
  const { index, createMany } = useUsers()
  const { mutate: createUsers} = createMany()
  const { data, isLoading } = index()
  const [disabled, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    if (csvArray.length) {
      const list = csvArray.map((item, index) => exist(item, index))
      if (list.includes(false)) setDisabled(false)
      else setDisabled(true)
    }
    else {
      setDisabled(true)
      setCsvFile(null)
    }
  }, [csvArray.length])

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) => !!item.numero)
      const list: string[] = filtered.map((item) => item.numero) as string[]
      setNumero(list)
    }
  }, [data])

  function reset () {
    setCsvFile(null)
    setCsvArray([])
  }

  function exist (user, index): boolean {
    if (numero.includes(user[2])) return true
    for (let i = 0; i < index ; i++) {
      if (csvArray[i][2] === user[2]) return true
    }

    return false
  }

  function handle () {
    const filtered = () => {
      const list = csvArray.filter((item, index) => {
        if (!exist(item, index)) return item
      })
      return list
    }

    const list = filtered()
    const array = list.map((item) => {
      return {
        firstname: item[0],
        lastname: item[1],
        numero: item[2],
        password: item[2]
      }
    })
    createUsers({
      users: array
    })
    toggle()

  }

  function processCsv (str: string) {
    let rows: any = str.split("\n")
    rows = rows.map((row: any) => {
      return row.replace(/;/g, " ").split(' ');
    })
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
            !csvFile && <div className="pt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">Utilisateurs</label>
              <UploadCsv setCsvFile={setCsvFile} />
            </div>

          }

        </div>

        <div>
          {csvArray.length ?
            <div className="flex flex-col ">

              { csvArray.map((item: RowCsv, key: number) => (
                <div key={key}>
                  <ViewUser
                    user={item}
                    csvArray={csvArray}
                    setCsvArray={setCsvArray}
                    index={key}
                    numero={numero}
                  />
                </div>
              ))}

              <div>

              </div>

            </div>
            : <div></div>
          }

        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-12">
        <div className="flex items-center gap-2">
          { csvFile
           &&  <button
              onClick={reset}
              className="rounded-md px-3 py-2 border bg-red-200 text-red-500"
            >
              Reset
            </button>
          }

          <button
            disabled={disabled}
            onClick={handle}
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
  user: any
  setCsvArray: Dispatch<any>
  csvArray: []
  index: number
  numero: number[]
}
function ViewUser ({ user, setCsvArray, csvArray, index, numero }: UserProps) {

  function removeUser () {
    const list = csvArray
    csvArray.splice(index, 1)
    setCsvArray([...list])
  }



  function exist (): boolean {
    if (numero.includes(user[2])) return true
    for (let i = 0; i < index ; i++) {
      if (csvArray[i][2] === user[2]) return true
    }

    return false
  }

  return (
    <div className={classNames(
      'flex items-center relative justify-between group hover:bg-gray-100 p-3 pr-12 rounded-md',
      exist() ? '!bg-red-100' : ''
    )}>
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