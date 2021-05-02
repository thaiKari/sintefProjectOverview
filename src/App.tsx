import React from 'react';
import { MapContainer, TileLayer} from 'react-leaflet'

function App() {
  return (

      <MapContainer style={{ width: '100vw', height: '100vh' }} center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
        />
      </MapContainer>
  );
}

export default App;
