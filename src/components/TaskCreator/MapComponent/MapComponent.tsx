import React, { useState, useEffect, useRef } from 'react';
import ReactMapboxGl, {
  Layer,
  Feature,
  MapContext 
} from "react-mapbox-gl"

import { MAPBOX_TOKEN } from './consts';
import getCurrentCoordinates from './helpers';

import './MapComponent.scss';

interface Props {
  onMarkerMove: Function,
  coordinates: [number, number] | undefined
}

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
});

const zoom = 10;



const MapComponent: React.FC<Props> = ({ onMarkerMove, coordinates}) => {
  const [coords, setCoords] = useState<[number, number] | undefined>();
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (!coordinates) {
      getCurrentCoordinates()
        .then((res) => {
          setCoords(res);
          console.log(res);
        })
        .catch(() => { setErrorText('Error data request!'); })
    } else {
      setCoords(coordinates);
    }
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
            onMarkerMove(`${lngLat.lat} ${lngLat.lng}`)}}/>
        </Layer>         
    </Map>
  )  
}

export default MapComponent;