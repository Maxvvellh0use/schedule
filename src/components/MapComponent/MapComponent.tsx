import React, { useState, useEffect } from 'react';
import ReactMapboxGl, {
  ScaleControl,
  ZoomControl,
  RotationControl,
  Layer,
  Feature,
  Marker
} from "react-mapbox-gl"

import { MAPBOX_TOKEN } from './consts';
import getCurrentCoordinates from './helpers';

import './MapComponent.scss';

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
});
const zoom = 10;

const MapComponent: React.FC = () => {
  const [coords, setCoords] = useState();
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    getCurrentCoordinates()
      .then((res) => { 
        setCoords(res);
        console.log(res);
      })
      .catch(() => { setErrorText('Error data request!');})
  },[])

  return (
    <Map
      className="map-container"
      style="mapbox://styles/mapbox/streets-v8"
      zoom={[zoom]}
      center={coords}>
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }} >
            <Feature 
            coordinates={coords}
            draggable={true}
            onDragEnd={(mapWithEvt: object): void =>  {console.log(mapWithEvt)}}/>
        </Layer>         
    </Map>
  )  
}

export default MapComponent;