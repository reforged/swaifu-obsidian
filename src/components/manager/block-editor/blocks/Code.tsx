import { githubLight } from '@uiw/codemirror-theme-github'
import { javascript } from '@codemirror/lang-javascript'
import CodeMirror from '@uiw/react-codemirror'
import SettingsContext from '../contexts/SettingsContext'
import { useBlock } from '../utils'
import ContentEditable from '../components/ContentEditable'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import {useState} from "react";
import {Mermaid} from "../../Mermaid";
import useComponentVisible from "../../../../hooks/useComponentVisible";
import {AnimatePresence, motion} from "framer-motion";

type Props = {
  uid: string
  fields: {
    lineNumbers: boolean
    legend: string
    code: string
  }
}

export default function Code (props: Props): JSX.Element {
  const { ref, isVisible, toggle, setIsVisible } = useComponentVisible()
  const [type, setType] = useState<'code' | 'mermaid'>('code')
  const { updateBlock } = useBlock(props.uid)

  function handleChange (field: string, value: string) {
    updateBlock({ [field]: value })
  }

  async function handleClipboardCopy (): Promise<void> {
    await navigator.clipboard.writeText(props.fields.code)
  }

  function switchMode () {
    if (type === 'code') {
      setType('mermaid')
    } else {
      setType('code')
    }
  }

  function showMermaidForm () {
    console.log("DROP MENU")
    toggle()
  }

  return (
    <SettingsContext.Consumer>
      {(settings) => (
        <div className="py-10">
          <div className="text-left rounded-md px-5 py-2 bg-gray-100">
            <div className="flex justify-between items-center">
              {(settings.mode === 'editor' || (settings.mode === 'preview' && props.fields.legend !== '')) && (
                <ContentEditable
                  as="p"
                  value={props.fields.legend}
                  onChange={(value: string) => handleChange('legend', value)}
                  className="text-gray-500 text-opacity-50 text-xs"
                />
              )}
              <div className="flex items-center gap-2">
                <div>
                  <button onClick={switchMode}>
                    { type === 'code' ?
                      <span>Code</span>
                      : <span>Mermaid</span>
                    }
                  </button>
                </div>
                <button onClick={handleClipboardCopy} className="w-8 h-8 flex items-center justify-center">
                  <ClipboardDocumentListIcon className="w-5 h-5 text-gray-600 opacity-50 hover:opacity-100" />
                </button>
              </div>
            </div>
            { type === 'code'
             ? <CodeMirror
                editable={settings.mode === 'editor'}
                readOnly={settings.mode === 'preview'}
                basicSetup={{
                  tabSize: 2,
                  lineNumbers: props.fields.lineNumbers,
                }}
                value={props.fields.code}
                height="auto"
                theme={githubLight}
                extensions={[javascript({ jsx: true, typescript: true })]}
                onChange={(value) => handleChange('code', value)}
              />

              :
              <button
                onClick={showMermaidForm}
                className={"relative"}
              >
                <Mermaid text={props.fields.code} />
                <AnimatePresence>
                  {isVisible &&
                    <motion.div
                      className="relative z-[100]"
                      animate={{opacity: 1}}
                      transition={{
                        duration: 0.2,
                        ease: [0.5, 0.71, 1, 1.5],
                      }}
                      exit={{opacity: 0}}
                      initial={{opacity: 0}}
                    >
                      <div className={"bg-red-400 absolute top-0 left-0 z-[100]"} ref={ref}>
                        lol
                      </div>
                    </motion.div>
                  }
                </AnimatePresence>
              </button>

            }

          </div>
        </div>
      )}
    </SettingsContext.Consumer>
  )
}
