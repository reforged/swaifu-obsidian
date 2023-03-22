import {Fragment, useContext, useEffect} from 'react'
import BlocksContext, { BlockContextContract } from '../contexts/BlocksContext'
import { Transition, Dialog } from '@headlessui/react'
import StructureContext from '../contexts/StructureContext'
import useComponentVisible from "../../../../hooks/useComponentVisible";
import {logger} from "react-query/types/react/logger";
import {AnimatePresence, motion} from "framer-motion";

type Props = {
  position: number | null
  index: number
  open: boolean
  setOpen: Function
}

export default function BlockMenu (props: Props): JSX.Element {
  const { ref, isVisible, setIsVisible, toggle} = useComponentVisible(props.open)
  useEffect(() => {
    if (props.open) setIsVisible(true)
    if (!isVisible) props.setOpen(null)
  }, [props, isVisible])
  return (
    <BlocksContext.Consumer>
      {(blocks) => (
        <AnimatePresence>
          { isVisible && props.index === props.position &&
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
            <div className="bg-white border absolute top-12  z-[100] p-4" ref={ref}>
              <div className="flex flex-col">
                <span>Liste des blocs</span>
                { Object.entries(blocks).map(([key, block]) => (
                  <CardBlock
                    key={key}
                    label={key}
                    block={block}
                    position={props.position}
                    close={() => toggle()}
                  />
                ))}
              </div>


            </div>
          </motion.div>
          }
        </AnimatePresence>
      )}
    </BlocksContext.Consumer>
  )
}

function CardBlock (props): JSX.Element {
  const [structure, setStructure] = useContext(StructureContext)

  function handleAddBlock (block: (...props) => BlockContextContract) {
    const blockInstance = block()
    const clone = [...structure]
    clone.splice(props.position + 1, 0, blockInstance.structure)

    setStructure(clone)
    props.close()
  }

  return (
    <div
      onClick={() => handleAddBlock(props.block)}
      className="cursor-pointer p-2 rounded-md hover:bg-gray-100"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12">
          <img className="w-full h-full object-cover" src="https://www.notion.so/images/blocks/text/en-US.png" alt=""/>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-900 text-sm">{props.label}</span>
          <span className="text-gray-500 text-xs">Jst start with writting with plain text</span>
        </div>
      </div>
    </div>
  )
}
