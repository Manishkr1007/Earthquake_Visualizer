import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";

import { Info } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import { fetchEarthquakes } from "../api/earthquake";
import type { Earthquake } from "../api/earthquake";

// Helper function to create custom colored icons
const createIcon = (color: string) =>
  L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

// Decide color based on magnitude
const getColorByMagnitude = (mag: number) => {
  if (mag >= 6) return createIcon("red"); // High magnitude
  if (mag >= 4) return createIcon("yellow"); // Moderate
  return createIcon("green"); // Low
};

export default function EarthquakeMap() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [showLegend, setShowLegend] = useState(false);

  useEffect(() => {
    fetchEarthquakes().then(setEarthquakes);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "500px",
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
      }}
    >
      {/* Info Button to toggle legend */}
      <button
        aria-label="Show legend"
        onClick={() => setShowLegend((v) => !v)}
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          zIndex: 1100,
          background: "#fff",
          borderRadius: "50%",
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          border: "1px solid #b0b8c1",
          cursor: "pointer",
        }}
      >
        <Info size={20} color="#7fd6e7" />
      </button>
      {/* Legend, toggled by info button */}
      {showLegend && (
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 10,
            background: "white",
            padding: "8px 12px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            fontSize: "14px",
            zIndex: 1000,
          }}
        >
          <strong>Legend:</strong>
          <div style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
            <span
              style={{
                display: "inline-block",
                width: "14px",
                height: "14px",
                background: "green",
                marginRight: "6px",
              }}
            ></span>
            Low ( {"<"} 4 )
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "2px" }}>
            <span
              style={{
                display: "inline-block",
                width: "14px",
                height: "14px",
                background: "yellow",
                marginRight: "6px",
              }}
            ></span>
            Moderate ( 4 – 5.9 )
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "2px" }}>
            <span
              style={{
                display: "inline-block",
                width: "14px",
                height: "14px",
                background: "red",
                marginRight: "6px",
              }}
            ></span>
            High ( ≥ 6 )
          </div>
        </div>
      )}

      {/* Map */}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Custom Zoom Control on left */}
        <ZoomControl position="topright" />
        {earthquakes.map((eq) => (
          <Marker
            key={eq.id}
            position={eq.coordinates}
            icon={getColorByMagnitude(eq.mag)}
          >
            <Popup>
              <strong>{eq.place}</strong>
              <br />
              Magnitude: {eq.mag}
              <br />
              {new Date(eq.time).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
