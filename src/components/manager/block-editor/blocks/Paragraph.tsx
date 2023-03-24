import { useBlock } from '../utils'
import ReactQuill from 'react-quill';
import {Fragment, useContext, useEffect, useRef, useState} from 'react'
import 'react-quill/dist/quill.snow.css';
import { classNames } from '../../../../utils/helper'
import EditorMode from '../components/EditorMode'
import CurrentBlockContext from "../contexts/CurrentBlockContext";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import useAutosizeTextArea from "../../../../hooks/use-autosize-text-area";

type Props = {
  uid: string
  fields: {
    value: string
  }
  index: number
}

export default function Paragraph (props: Props) {
  const [showToolbar, setShowToolbar] = useState(false)
  const [currentBlockMenu, setCurrentBlockMenu] = useContext(CurrentBlockContext)
  const { updateBlock } = useBlock(props.uid)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(textAreaRef.current, props.fields.value);

  const modules = {
    toolbar: {
      container: "#toolbar"
    }
  }

  function onWrite (e) {
    if (e.code === 'Enter') {
    }
    if (e.code === 'Period') {
      setCurrentBlockMenu(props.index)
    } else {
      setCurrentBlockMenu(null)
    }
  }

  return (
    <Fragment>
      <EditorMode mode="editor">
        <Fragment>
          {showToolbar && <div onClick={() => setShowToolbar(false)} className="fixed inset-0 z-10"></div>}
          <div className="relative z-10 w-full" onClick={() => setShowToolbar(true)}>
            <div className={classNames('absolute -top-1 left-0 -translate-y-full shadow-md',
              showToolbar ? 'block' : 'hidden'
            )}>
              <div id="toolbar" className="bg-white rounded-md">
                <div className="ql-formats">
                  <button className="ql-list" value="ordered" />
                  <button className="ql-list" value="bullet" />
                  <button className="ql-indent" value="-1" />
                  <button className="ql-indent" value="+1" />
                </div>
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
              </div>
            </div>

            <div className="relative">
               <textarea
                 className="w-full border-none resize-none focus:outline-0 focus:outline-none focus:border-none border-none"
                 ref={textAreaRef}
                 value={props.fields.value}
                 onChange={(event) => updateBlock({ value: event.currentTarget.value })}
               />
            </div>

          </div>
        </Fragment>
      </EditorMode>

      <EditorMode mode="preview">
        <div className="py-5">
          <ReactMarkdown
            children={props.fields.value}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
          />
        </div>
      </EditorMode>
    </Fragment>
  )
}
