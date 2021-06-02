import React from "react"

export default function Index({ description }) {
  return <div dangerouslySetInnerHTML={{ __html: description }} />
}
