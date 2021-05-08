import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import { Container, Typography } from '@material-ui/core/'
import { Data, data } from './data/data';
import countries from './data/countries.json'
import { LatLngBoundsLiteral } from 'leaflet';
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

const worldBounds: LatLngBoundsLiteral = [
  [-60, -180],
  [80, 192],
]

const colors: string[] = ["#298e2c", "#42983f", "#6bac63", "#99c692", "#bddab7", "#cce3c8"]

const stops: number[] = [3, 6, 12, 24, 48]

const getColor = (value: number): string => {
  for (let i = 0; i < stops.length; i++) {
    if (value < stops[i]) {
      return colors[i]
    }
  }

  return colors[colors.length - 1]
}

function App() {
  const [processedData, setprocessedData] = useState<Data[] | null>(null)
  const [selected, setselected] = useState<Data | null>(null)

  useEffect(() => {
    console.log(colors.reverse())
    setprocessedData(mapData())
  }, [])

  function getPathOptions(data: Data): import("leaflet").PathOptions | undefined {
    const isSelected = selected && selected.Id === data.Id
    const color = getColor(data.Samples)

    return { color: isSelected ? colors[colors.length-1] : 'transparent', fillColor: color, fillOpacity: 0.6 }

  }


  return (
    <Container style={{ display: 'flex', height: '100vh', alignItems: 'center' }}>

      <MapContainer style={{ width: '100%', height: 700 }} bounds={worldBounds}>

        <InfoBox data={selected} />
        <TileLayer
          id='map'
          url={`https://api.mapbox.com/styles/v1/karimj/cjm203zaw16gb2ro02gfsmt3l/tiles/256/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
        />

        {processedData && processedData.map(data =>
          <Polygon
            key={data.Id}
            pathOptions={getPathOptions(data)}
            positions={data.coordinates ?? []}
            eventHandlers={{
              mouseover: () => { setselected(data) },
              mouseout: () => { setselected(null) }
            }}
          >
          
              <Typography variant="h5" component="h2">
                {data.Name}
              </Typography>
              <Typography color="textSecondary">
                {`${data.Assignments} Assignments`}
              </Typography>

          </Polygon>
        )}

      </MapContainer>

    </Container>

  );
}

export default App;





