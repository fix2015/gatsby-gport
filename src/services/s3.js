import S3 from 'react-aws-s3';
import { Buffer } from 'buffer'

import {AWS_CONFIG} from '@src/config'
window.Buffer = Buffer;

export const uploadImg = (file) => {
  const ReactS3Client = new S3(AWS_CONFIG);
  const newFileName = Math.random().toString(36).substr(2, 9);

  return ReactS3Client
    .uploadFile(file, newFileName)
}

export const deleteImg = (file) => {
  const ReactS3Client = new S3(AWS_CONFIG);

  return ReactS3Client
    .deleteFile(file)
}
