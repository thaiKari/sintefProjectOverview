import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import { data } from './data/data';


function App() {

  const purpleOptions = { color: 'purple',fillColor: 'blue'  }

  // console.log(data[0].geometry.coordinates.forEach((element: any) => {
  //   console.log(element)
  // }))

  const multiPolygon:any = [
    [
      [51.51, -0.12],
      [51.51, -0.13],
      [51.53, -0.13],
    ],
    [
      [51.51, -0.05],
      [51.51, -0.07],
      [51.53, -0.07],
    ],
  ]

  console.log(multiPolygon)

  return (
    <MapContainer style={{ width: '100vw', height: '100vh' }} center={[30, 0]} zoom={3}>
      <TileLayer
        id='map'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`https://api.mapbox.com/styles/v1/karimj/cjm203zaw16gb2ro02gfsmt3l/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
      />

<Polygon pathOptions={purpleOptions} positions={multiPolygon} />

      <Polygon pathOptions={purpleOptions} positions={data[1].geometry.coordinates} />
    </MapContainer>
  );
}

export default App;
