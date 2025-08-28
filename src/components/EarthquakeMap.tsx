import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { fetchEarthquakes } from '../api/earthquake';
import type { Earthquake } from '../api/earthquake';

export default function EarthquakeMap() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);

  useEffect(() => {
    fetchEarthquakes().then(setEarthquakes);
  }, []);

  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {earthquakes.map(eq => (
          <Marker key={eq.id} position={eq.coordinates}>
            <Popup>
              <strong>{eq.place}</strong><br />
              Magnitude: {eq.mag}<br />
              {new Date(eq.time).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
