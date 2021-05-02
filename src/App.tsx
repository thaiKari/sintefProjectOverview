import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import { Data, data } from './data/data';
import countries from './data/countries.json'
import { InfoBox } from './InfoBox';

function swapLatLn(coords: any[]): any[] {
  if (coords.length === 2) {
    return [coords[1], coords[0]]
  } else {
    return coords.map(swapLatLn)
  }
}

function getCoordinates(Id: string): any[] {
  let countryFeature = countries["features"].find(f => f["properties"]["ISO_A3"] === Id);

  if (countryFeature) {
    let countryFeatureCoordinates = countryFeature["geometry"]["coordinates"]
    return countryFeatureCoordinates.map(swapLatLn)
  }

  return []
}

const mapData = (): Data[] => {
  let newData = data.map((feature: Data) => {
    return {
      ...feature,
      coordinates: getCoordinates(feature.Id)
    }
  })

  return newData

}


function App() {
  const purpleOptions = { color: 'purple', fillColor: 'purple' }
  const [processedData, setprocessedData] = useState<Data[] | null>(null)
  const [selected, setselected] = useState<Data | null>(null)

  useEffect(() => {
    setprocessedData(mapData())
  }, [])

  return (
    <MapContainer style={{ width: '100vw', height: '100vh' }} center={[30, 0]} zoom={3}>
      <TileLayer
        id='map'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`https://api.mapbox.com/styles/v1/karimj/cjm203zaw16gb2ro02gfsmt3l/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
      />

      <InfoBox data={selected} />

      {processedData && processedData.map(data =>
        <Polygon
          pathOptions={purpleOptions}
          positions={data.coordinates ?? []}
          eventHandlers={{
            mouseover: () => {setselected(data)},
            mouseout: () => {setselected(null)}
          }}
        />
      )}

    </MapContainer>
  );
}

export default App;




