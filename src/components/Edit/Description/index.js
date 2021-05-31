import React from "react"

import FroalaEditorComponent from "react-froala-wysiwyg"

import "./codemirror.min.css"
import "./froala_editor.pkgd.min.css"
import "./froala_style.min.css"
import "./style.scss"

export default function Index({ description, onModelChange }) {
  return (
    <FroalaEditorComponent
      tag="textarea"
      model={description}
      onModelChange={onModelChange}
    />
  )
}
