export const randormHash = () => Math.random().toString(36).substr(2, 9)
export const getFileNameFromUrl = url =>
  url.substr(url.lastIndexOf("/")).slice(1, url.length)
