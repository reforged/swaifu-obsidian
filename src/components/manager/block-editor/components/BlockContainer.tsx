import {Fragment, LegacyRef, useContext, useEffect, useState} from 'react'
import { classNames } from '../../../../utils/helper'
import Block from './Block'
import { useDragAndDrop } from '../utils'
import StructureContext from '../contexts/StructureContext'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { PlusIcon } from '@heroicons/react/24/outline'
import EditorMode from './EditorMode'
import BlockMenu from './BlockMenu'
import CurrentBlockContext from "../contexts/CurrentBlockContext";
import QuestionContext from "../../../../contexts/QuestionContext";

export default function BlockContainer (): JSX.Element {
  const [structure, setStructure] = useContext(StructureContext)
  const [question, setQuestion] = useContext(QuestionContext)
  const [currentBlockMenu, setCurrentBlockMenu] = useContext(CurrentBlockContext)
  const { reorder } = useDragAndDrop()

  useEffect(() => {
    setQuestion({
      ...question,
      enonce: structure
    })
  }, [structure])

  function handleDragEnd (result) {
    if (!result.destination) {
      return
    }

    setStructure(reorder(structure, result.source.index, result.destination.index))
  }


  return (
    <StructureContext.Consumer>
      {([structure]) => (
        <Fragment>
          <EditorMode mode="editor">
            <Fragment>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="body">
                  {(provided) => {
                    return (
                      <div {...provided.droppableProps} ref={provided.innerRef as LegacyRef<HTMLDivElement>} className="relative">
                        {structure.map((block, index) => {
                          return (
                            <Draggable key={block.uid} draggableId={block.uid} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div className="group z-25" ref={provided.innerRef as LegacyRef<HTMLDivElement>} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <div className="w-4/5 mx-auto">
                                      <div className={classNames('border-2', snapshot.isDragging
                                        ? 'border-dashed border-gray-500'
                                        : 'border-transparent'
                                      )}>
                                        <div className="relative border-2 border-transparent  px-2">
                                          <BlockMenu
                                            position={currentBlockMenu}
                                            open={currentBlockMenu != null}
                                            setOpen={setCurrentBlockMenu}
                                            index={index}
                                          />
                                          <div className="hidden group-hover:block absolute -top-1 right-0 transform -translate-y-full uppercase text-xs font-medium">{block.type}</div>
                                          <Block block={block} index={index} />

                                          <div className="hidden group-hover:flex  absolute top-2 -left-2 -translate-x-full transform z-10">
                                            <div>
                                              <button
                                                onClick={() => {
                                                  setCurrentBlockMenu(index)
                                                  console.log(currentBlockMenu)
                                                }}
                                                className="h-8 w-8 hover:bg-gray-100 text-gray-500 flex items-center justify-center p-1 rounded-md"
                                              >
                                                <PlusIcon className="w-5 h-5" />
                                              </button>
                                            </div>

                                            <div>
                                              <div
                                                className="h-8 w-8 hover:bg-gray-100 flex items-center justify-center p-1 rounded-md"
                                                {...provided.dragHandleProps}
                                              >
                                                <div className="dnd-button" />
                                              </div>
                                            </div>


                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}}
                            </Draggable>
                          )})}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              </DragDropContext>


            </Fragment>
          </EditorMode>

          <EditorMode mode="preview">
            <div className="lg:max-w-5xl mx-auto">
              {structure.map((block) => (
                <Block key={block.uid} block={block} />
              ))}
            </div>
          </EditorMode>
        </Fragment>
      )}
    </StructureContext.Consumer>
  )
}
