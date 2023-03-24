import {useBlock} from "../utils";
import {Mermaid} from "../../Mermaid";
import SettingsContext from "../contexts/SettingsContext";
import { AnimatePresence, motion} from "framer-motion";
import useComponentVisible from "../../../../hooks/useComponentVisible";
import {useEffect, useRef} from "react";
import useAutosizeTextArea from "../../../../hooks/use-autosize-text-area";

type Props = {
  uid: string
  fields: {
    value: string
  }
}

export default function BlockMermaid (props: Props) {
  const { ref, isVisible, toggle, setIsVisible } = useComponentVisible()
  const { updateBlock } = useBlock(props.uid)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(textAreaRef.current, props.fields.value)

  function handleChange (field: string, value: string) {
    updateBlock({ [field]: value })
  }


  return (
    <SettingsContext.Consumer>
      {( settings ) => (
        <div className="py-10 relative">
          <button onClick={toggle}>
            <Mermaid text={props.fields.value} />
          </button>


          <AnimatePresence>
            {isVisible && settings.mode === 'editor' &&
              <motion.div
                className=" z-50"
                animate={{opacity: 1}}
                transition={{
                  duration: 0.2,
                  ease: [0.5, 0.71, 1, 1.5]
                }}
                exit={{opacity: 0}}
                initial={{opacity: 0}}
              >
                <div ref={ref} className="absolute overflow-y-scroll top-0 bg-white h-auto w-full left-0 border p-4 rounded-md">
                  <div className="relative">
                    <textarea
                      className="w-full"
                      ref={textAreaRef}
                      value={props.fields.value}
                      onChange={(event) => handleChange('value', event.currentTarget.value)}
                    />
                  </div>

                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      )}
    </SettingsContext.Consumer>
  )
}