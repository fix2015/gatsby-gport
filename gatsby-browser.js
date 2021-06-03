/* eslint-disable import/prefer-default-export, react/prop-types */
import React from "react"
import Main from "./src/layout/main"
import "firebase/auth"
import "firebase/firestore"

export const wrapRootElement = ({ element }) => {
  return <Main>{element}</Main>
}
