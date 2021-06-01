import React from "react"
import PlaceList from "../components/place-list"
import {get} from '@api/place'

// import { getPlaces } from '../utils/places'
// import { useEffect } from 'react'
// useEffect(() => {
//   getPlaces()
// }, [])
const items = []
for (var i = 0; i < 100; i++) {
  items.push({
    src: " https://source.unsplash.com/random",
    title: `Lorum imasdf`,
    alias: "sea_gport",
  })
}

export default function Index() {
  const place = get();

  return (
    <>
      <PlaceList items={place} />
    </>
  )
}
