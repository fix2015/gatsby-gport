import React from "react"
import PlaceList from "../components/place-list"
import { get } from "@api/place"

// import { getPlaces } from '../utils/places'
// import { useEffect } from 'react'
// useEffect(() => {
//   getPlaces()
// }, [])

export default function Index() {
  const place = get();

  return (
    <>
      <PlaceList items={place} />
    </>
  )
}
