import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'
import { javascript } from '@codemirror/lang-javascript'
import CodeMirror from '@uiw/react-codemirror'
import SettingsContext from '../contexts/SettingsContext'
import { useBlock } from '../utils'
import ContentEditable from '../components/ContentEditable'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

type Props = {
  uid: string
  fields: {
    lineNumbers: boolean
    legend: string
    code: string
  }
}

export default function Code (props: Props): JSX.Element {
  const { updateBlock } = useBlock(props.uid)

  function handleChange (field: string, value: string) {
    updateBlock({ [field]: value })
  }

  async function handleClipboardCopy (): Promise<void> {
    await navigator.clipboard.writeText(props.fields.code)
  }

  return (
    <SettingsContext.Consumer>
      {(settings) => (
        <div className="py-10">
          <div className="text-left rounded-md px-5 py-2 bg-[#191B26]">
            <div className="flex justify-between items-center">
              {(settings.mode === 'editor' || (settings.mode === 'preview' && props.fields.legend !== '')) && (
                <ContentEditable
                  as="p"
                  value={props.fields.legend}
                  onChange={(value: string) => handleChange('legend', value)}
                  className="text-white text-opacity-50 text-xs"
                />
              )}
              <div>
                <button onClick={handleClipboardCopy} className="w-8 h-8 flex items-center justify-center">
                  <ClipboardDocumentListIcon className="w-5 h-5 text-white opacity-50 hover:opacity-100" />
                </button>
              </div>
            </div>

            <CodeMirror
              editable={settings.mode === 'editor'}
              readOnly={settings.mode === 'preview'}
              basicSetup={{
                tabSize: 2,
                lineNumbers: props.fields.lineNumbers,
              }}
              value={props.fields.code}
              theme={tokyoNight}
              height="auto"
              extensions={[javascript({ jsx: true, typescript: true })]}
              onChange={(value) => handleChange('code', value)}
            />
          </div>
        </div>
      )}
    </SettingsContext.Consumer>
  )
}
