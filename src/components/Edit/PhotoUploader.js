import React, { Component } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import S3FileUpload from 'react-s3'
import { uploadFile } from 'react-s3'

const config = {
  bucketName: 'gport',
  dirName: 'photo',
  region: 'eu-central-1',
  accessKeyId: 'AKIA3MEVDSSH4JR2ISED',
  secretAccessKey: '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\n',
}

export default function PhotoUploader() {
  const files = [];

  const handleChange = (files) => {
    if(!files.length) return ;

    uploadFile(files[0], config)
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  return (
    <DropzoneArea
      acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
      showPreviews={false}
      maxFileSize={5000000}
      filesLimit={30}
      onChange={handleChange}
    />
  )
}

