import React, { useState } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { map } from 'ramda'
import './map.styles.css'
import InfoWindowEx from './InfoWindow'
const API_KEY = process.env.REACT_APP_API_KEY
// import WYstyle from './WYstyle'

// https://developers.google.com/maps/documentation/javascript/examples/control-custom
// custom control

const RestMap = ({ setActiveRest, google, restaurants, toggleDrawer }) => {
  const [showingInfoWindow, setInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState({
    restaurant: { name: ' ' }
  })
  // const [selectedPlace, setSelectedPlace] = useState({})

  const onMarkerClick = (props, marker) => {
    setActiveRest(props.restaurant)
    // setSelectedPlace(props)
    setActiveMarker(marker)
    setInfoWindow(true)
  }

  // const toggleMapDrawer = () => {
  //   console.log('click')
  //   toggleDrawer(true)
  // }

  return (
    <div>
      <Map
        google={google}
        //not working, fix later
        // style={WYstyle}
        zoom={11}
        id='map'
        initialCenter={{
          lat: 32.767446,
          lng: -79.91039
        }}
      >
        {map(restaurant => {
          return (
            <Marker
              onClick={onMarkerClick}
              name={restaurant.name}
              key={restaurant._id}
              position={restaurant.gps}
              restaurant={restaurant}
            />
          )
        }, restaurants)}
        <InfoWindowEx marker={activeMarker} visible={showingInfoWindow}>
          <React.Fragment>
            {/* {activeMarker.restaurant.name} */}
            <br />
            <img
              src={activeMarker.restaurant.img}
              alt={activeMarker.restaurant.name}
              className='logo'
            />
            {/* <br />
            <button type='button' onClick={toggleMapDrawer}>
              Show details
            </button> */}
          </React.Fragment>
        </InfoWindowEx>
      </Map>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(RestMap)
