import React, { Component, useEffect, useState } from "react"
import GoogleMapReact from "google-map-react"
import Box from "@material-ui/core/Box"
import { GOOGLE_API, DEFAULT_MAP_PROPS } from "@src/Constants"
import Marker from "@components/Marker"

export default function Index({ name, position, onCallback }) {
  const [markerPosition, setMarkerPosition] = useState(position)

  const onClick = ({ x, y, lat, lng, event }) => {
    setMarkerPosition({ lat, lng })
  }

  useEffect(() => {
    onCallback(markerPosition)
  }, [markerPosition])

  return (
    <Box style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API }}
        defaultCenter={DEFAULT_MAP_PROPS.center}
        defaultZoom={DEFAULT_MAP_PROPS.zoom}
        onClick={onClick}
      >
        {markerPosition && (
          <Marker
            lat={markerPosition.lat}
            lng={markerPosition.lng}
            text={name || "жилье"}
          />
        )}
      </GoogleMapReact>
    </Box>
  )
}
