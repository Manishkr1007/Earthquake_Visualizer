export interface Earthquake {
  id: string;
  place: string;
  mag: number;
  time: number;
  coordinates: [number, number];
}

export async function fetchEarthquakes(): Promise<Earthquake[]> {
  const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
  const data = await res.json();
  const features = data.features || [];
  return features.map((f: any) => ({
    id: f.id,
    place: f.properties.place,
    mag: f.properties.mag,
    time: f.properties.time,
    coordinates: [f.geometry.coordinates[1], f.geometry.coordinates[0]] as [number, number],
  }));
}
