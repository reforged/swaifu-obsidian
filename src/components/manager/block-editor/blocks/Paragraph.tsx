import { useBlock } from '../utils'
import ReactQuill from 'react-quill';
import {Fragment, useContext, useEffect, useState} from 'react'
import 'react-quill/dist/quill.snow.css';
import { classNames } from '../../../../utils/helper'
import EditorMode from '../components/EditorMode'
import CurrentBlockContext from "../contexts/CurrentBlockContext";

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

  const modules = {
    toolbar: {
      container: "#toolbar"
    }
  }

  function onWrite (e) {
    if (e.code === 'Enter') {
      console.log("create new paragraph")
    }
    if (e.code === 'Period') {
      console.log("Afficher menu")
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
          <div className="relative z-10" onClick={() => setShowToolbar(true)}>
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

            <ReactQuill
              value={props.fields.value}
              onKeyDown={onWrite}
              defaultValue={"Lorem ipsum"}
              onChange={(value) => updateBlock({ value })}
              modules={modules}
            />
          </div>
        </Fragment>
      </EditorMode>

      <EditorMode mode="preview">
        <div className="py-5">
          <div dangerouslySetInnerHTML={{ __html: props.fields.value }}></div>
        </div>
      </EditorMode>
    </Fragment>
  )
}
