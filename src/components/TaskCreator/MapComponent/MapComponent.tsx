import React, { useState, useEffect, useRef } from 'react';
import ReactMapboxGl, {
  Layer,
  Feature,
  MapContext 
} from "react-mapbox-gl"

import { MAPBOX_TOKEN } from './consts';
import getCurrentCoordinates from './helpers';

import './MapComponent.scss';
import { AnyARecord } from 'dns';


interface Props {
  onMarkerMove: Function;
}

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
});

const zoom = 10;



const MapComponent: React.FC<Props> = ({ onMarkerMove}) => {
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
            coordinates={coords || [0,0]}
            draggable={true}
          onDragEnd={({ lngLat }: any): void => {
            onMarkerMove(`Lat:${lngLat.lat.toFixed(4)} Lng:${lngLat.lng.toFixed(4)}`)}}/>
        </Layer>         
    </Map>
  )  
}

export default MapComponent;