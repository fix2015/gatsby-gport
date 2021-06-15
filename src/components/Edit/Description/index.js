import React from "react"

import FroalaEditorComponent from "react-froala-wysiwyg"

import "@styles/codemirror.min.css"
import "@styles/froala_editor.pkgd.min.css"
import "@styles/froala_style.min.css"
import "@styles/style.scss"

export default function Index({ description, onModelChange }) {
  return (
    <FroalaEditorComponent
      tag="textarea"
      model={description}
      onModelChange={onModelChange}
    />
  )
}
