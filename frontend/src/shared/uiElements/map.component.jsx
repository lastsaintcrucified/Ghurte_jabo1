import React from "react";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'
import "./map.styles.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const map_container = {
    height:"55vh",
    width:"55vw"
}

const Map =(props)=>{
    
    const Map = ReactMapboxGl({
        accessToken:
          'pk.eyJ1IjoidGF3aGlkMzEzIiwiYSI6ImNra2Fqamw5MTAwdDAydm94aWd0OHBuZ2gifQ.vK7q9HprbQ8UqUMPSeOiZQ'
      })
      
    return (
        <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={map_container}
            center={props.center}
        >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                <Feature />
            </Layer>
        </Map>
    )
}

export default Map;