import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
const API_KEY = process.env.REACT_APP_API_KEY
// import WYstyle from './WYstyle'

const DrawerMap = ({ google, restaurant }) => {
  return (
    <div>
      <Map
        google={google}
        style={{ width: '100%', height: '300px' }}
        zoom={10}
        id='map'
        initialCenter={{
          lat: 32.767446,
          lng: -79.91039
        }}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
      >
        <Marker position={restaurant.gps} />
      </Map>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(DrawerMap)
