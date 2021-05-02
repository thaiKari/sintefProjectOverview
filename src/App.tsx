import React from 'react';
import { MapContainer, TileLayer} from 'react-leaflet'

function App() {
  return (

      <MapContainer style={{ width: '100vw', height: '100vh' }} center={[30,0]} zoom={3}>
        <TileLayer
        id='map'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
        />
      </MapContainer>
  );
}

export default App;
