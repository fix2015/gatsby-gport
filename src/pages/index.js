import React from 'react';
import PlaceList from '../components/place-list'
// import { getPlaces } from '../utils/places'
// import { useEffect } from 'react'
// useEffect(() => {
//   getPlaces()
// }, [])
const items = []
for(var i = 0; i < 100; i++){
  items.push({
    src: ' https://source.unsplash.com/random',
    title: `Lorum imasdf`,
    alias: 'sea_gport'
  })
}

export default function Index() {
  return (
    <>
      <PlaceList items={items}/>
    </>
  );
}
