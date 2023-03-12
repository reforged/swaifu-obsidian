import useComponentVisible from "../../../../../hooks/useComponentVisible";
import { Tab } from "@headlessui/react";
import {AnimatePresence, motion} from "framer-motion";
import {LegacyRef, useContext, useEffect, useRef, useState} from "react";
import BoardContext from "../../../../../contexts/BoardContext";
import {XMarkIcon} from "@heroicons/react/20/solid";
import {CircleStackIcon, InboxArrowDownIcon, UserPlusIcon} from "@heroicons/react/24/outline";
import useUsers from "../../../../../hooks/use-users";
import {classNames} from "../../../../../utils/helper";

export default function CreateUser () {
  const { ref, isVisible, toggle, setIsVisible } = useComponentVisible()
  const { index } = useUsers()
  const { data, isLoading } = index()
  const [board, setBoard] = useContext(BoardContext)
  const [csvFile, setCsvFile] = useState(null)
  const [csvArray, setCsvArray] = useState<any>([])

  useEffect(() => {
    if (board.open) setIsVisible(true)
  }, [board.open])

  useEffect(() => {
    if (!isVisible) setBoard({
      ...board, open: false
    })
  }, [isVisible])

  function processCsv (str: string) {
    let rows: any = str.split("\n")
    rows = rows.map((row: any) => {
      return row.replace(/;/g, " ").split(' ');
    })
    setCsvArray(rows);
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
    console.log(csvArray);
  }, [csvArray])

  useEffect(() => {
    console.log(csvFile);
    if (csvFile) {
      handleFileUpload()
    }
  }, [csvFile])

  return (
    <div>
      <AnimatePresence>
        { isVisible &&
          <motion.div
            className="fixed z-20 inset-0 bg-black bg-opacity-25"
            animate={{ opacity: 1}}
            transition={{
              duration: 0.2,
              ease: [0.5, 0.71, 1, 1.5]
            }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <div ref={ref} className="absolute left-1/2 overflow-hidden top-12 transform -translate-x-1/2 h-[90%] w-[60%] bg-white border border-gray-200 rounded-md">
              <div className="relative h-full">
                <button
                  className="absolute top-0 right-8 bg-gray-100 rounded-md text-gray-400 p-1 my-4"
                  onClick={toggle}
                >
                <span>
                  <XMarkIcon className="w-6" />
                </span>
                </button>

                <div className="max-h-full h-full">
                  <div className="border-b py-4">
                    <h1 className="font-title  font-medium text-2xl text-gray-700 text-center">Utilisateurs</h1>
                  </div>
                  <div className=" h-full">
                    <Tab.Group>
                      <div className="grid grid-cols-12 divide-x h-full">
                        <div className="col-span-4">
                          <Tab.List>
                            <div className="flex flex-col text-left p-8 gap-2">
                              <Tab className="ui-selected:bg-gray-100 rounded-md p-3 group hover:bg-gray-50">
                                <div className="flex gap-3 items-center">
                              <span>
                                <UserPlusIcon className="w-6" />
                              </span>
                                  <span className="text-left">Créer un utilisateur</span>
                                </div>
                              </Tab>
                              <Tab className="ui-selected:bg-gray-100 rounded-md p-3 group hover:bg-gray-50">
                                <div className="flex gap-3 items-center">
                              <span>
                                <InboxArrowDownIcon className="w-6" />
                              </span>
                                  <span className="text-left">Importer un CSV</span>
                                </div>
                              </Tab>
                            </div>

                          </Tab.List>
                        </div>
                        <div className="col-span-8">
                          <Tab.Panels>
                            <Tab.Panel>
                              Panel 1
                            </Tab.Panel>
                            <Tab.Panel>
                              <div className="p-8">
                                <h3 className="font-title text-2xl font-medium">Importer des utilisateurs</h3>
                                <div>

                                  <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
                                    <UploadCsv setCsvFile={setCsvFile} />
                                  </div>

                                </div>
                                <span>Import csv</span>
                                <input
                                  type="file"
                                  accept=".csv"
                                  onChange={(e: any) => {
                                    setCsvFile(e.target.files[0]);
                                  }}
                                />
                              </div>
                              <div>
                                {csvArray.length ? <div className="flex flex-col">
                                  { csvArray.map((item, key) => (
                                    <div key={key}>
                                      <span>{item[0]} {item[1]} {item[2]}</span>
                                    </div>
                                    ))}
                                </div>
                                  : <div>Pas importé le csv</div>
                                }
                              </div>
                            </Tab.Panel>
                          </Tab.Panels>
                        </div>
                      </div>
                    </Tab.Group>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

function UploadCsv ({ setCsvFile }) {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const inputRef = useRef(null)

  function handleDrag (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  function handleDrop (e) {
    e.preventDefault()
    e.stopPropagation()
    console.log(e.dataTransfer.files);
  }
  function handleChange (e) {
    e.preventDefault()
    setCsvFile(e.target.files[0]);
  }

  function onButtonClick () {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  useEffect(() => {
    console.log(dragActive, inputRef);
  }, [dragActive])


  return (
    <div onDrop={handleDrop} onDragOver={handleDrag} className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6" ref={inputRef}>
      <div className="space-y-1 text-center">
        <CircleStackIcon className="mx-auto h-12 text-gray-400" />

        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className={classNames(
              "relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500",
              dragActive ? '!bg-red-500' : ''
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