import React from 'react';
import { MapContainer, TileLayer} from 'react-leaflet'

function App() {
  return (

      <MapContainer style={{ width: '100vw', height: '100vh' }} center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
  );
}

export default App;
