import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Box from '@material-ui/core/Box'
import { GOOGLE_API } from '../../Constants'
import Marker from './Marker';

class Index extends Component {
  static defaultProps = {
    center: {
      lat: 46.118849086724424,
      lng: 32.28825728930291
    },
    zoom: 15
  };

  render() {
    return (
      <Box style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={46.118849086724424}
            lng={32.28825728930291}
            text="My Marker"
          />
        </GoogleMapReact>
      </Box>
    );
  }
}

export default Index;
