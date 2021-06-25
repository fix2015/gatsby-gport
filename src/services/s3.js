import S3 from "react-aws-s3"
import { Buffer } from "buffer"

import { AWS_CONFIG } from "@src/config"
import { randormHash } from "@services/string"
import { isBrowser } from '@utils'

if (isBrowser) {
  window.Buffer = Buffer
}

export const uploadImg = (file, folder) => {
  AWS_CONFIG.dirName = folder
  const ReactS3Client = new S3(AWS_CONFIG)
  const newFileName = randormHash()

  return ReactS3Client.uploadFile(file, newFileName)
}

export const deleteImg = (filename, folder) => {
  AWS_CONFIG.dirName = folder
  const ReactS3Client = new S3(AWS_CONFIG)

  return ReactS3Client.deleteFile(filename)
}
