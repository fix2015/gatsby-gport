import React, { Component, useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'

import ImageGridList from './ImageGridList'

export default function index({imgs, onAddImg, onDeleteImg}) {
  const handleChange = files => {
    onAddImg(files)
  }

  return (
    <>
      <ImageGridList onDeleteImg={onDeleteImg} imgs={imgs}/>
      <DropzoneArea
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={false}
        maxFileSize={5000000}
        filesLimit={30}
        onChange={handleChange}
      />
    </>
  )
}
