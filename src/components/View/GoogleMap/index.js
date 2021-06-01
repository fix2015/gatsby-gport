import React, { Component, useEffect, useState } from 'react'
import GoogleMapReact from "google-map-react"
import Box from "@material-ui/core/Box"
import { GOOGLE_API, DEFAULT_MAP_PROPS } from "@src/Constants"
import Marker from "@components/Marker"

export default function Index({ name, position }) {

  return (
    <Box style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API }}
        defaultCenter={DEFAULT_MAP_PROPS.center}
        defaultZoom={DEFAULT_MAP_PROPS.zoom}
      >
        <Marker
          lat={position.lat}
          lng={position.lng}
          text={name || 'жилье'}
        />
      </GoogleMapReact>
    </Box>
  )
}
