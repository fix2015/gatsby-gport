import React, { Component, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import Box from '@material-ui/core/Box'
import { GOOGLE_API } from '../../../Constants'
import Marker from './Marker'

export default function Index({name, position, onCallback}) {
  const defaultProps = {
    center: {
      lat: 46.118849086724424,
      lng: 32.28825728930291,
    },
    zoom: 15,
  }
  const [markerPosition, setMarkerPosition] = useState(position);

  const onClick = ({ x, y, lat, lng, event }) => {
    setMarkerPosition({lat, lng});
    onCallback(markerPosition);
  }

  return (
    <Box style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={onClick}
      >

        {markerPosition && <Marker
          lat={markerPosition.lat}
          lng={markerPosition.lng}
          text={name}
        />}

      </GoogleMapReact>
    </Box>
  )
}

