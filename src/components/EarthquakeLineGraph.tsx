import React from 'react';
import type { Earthquake } from '../api/earthquake';

interface EarthquakeLineGraphProps {
  earthquakes: Earthquake[];
}

// Simple SVG line graph for earthquake magnitudes over time (latest 20)
const EarthquakeLineGraph: React.FC<EarthquakeLineGraphProps> = ({ earthquakes }) => {
  if (!earthquakes.length) {
    return <div className="text-gray-400 text-center">No data</div>;
  }
  // Sort by time ascending, take last 20
  const sorted = [...earthquakes].sort((a, b) => a.time - b.time).slice(-20);
  const maxMag = Math.max(...sorted.map(e => e.mag));
  const minMag = Math.min(...sorted.map(e => e.mag));
  // Responsive width/height for mobile/desktop
  let width = 600;
  let height = 440;
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 640) {
      width = 320;
      height = 180;
    } 
  }
  const padding = 30;
  const points = sorted.map((e, i) => {
    const x = padding + (i * (width - 2 * padding)) / (sorted.length - 1);
    const y = height - padding - ((e.mag - minMag) / (maxMag - minMag || 1)) * (height - 2 * padding);
    // Color by magnitude
    let color = '#22c55e'; // green
    if (e.mag >= 6) color = '#ef4444'; // red
    else if (e.mag >= 4) color = '#facc15'; // yellow
    return { x, y, mag: e.mag, time: e.time, place: e.place, color };
  });
  // pathD is unused
  return (
    <svg width={width} height={height} className=" " style={{ display: 'block' }}>
      <polyline fill="none" stroke="#7fd6e7" strokeWidth={3} points={points.map(p => `${p.x},${p.y}`).join(' ')} />
      {/* Dots with color by magnitude */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={5} fill={p.color} stroke="#232526" strokeWidth={1.5}>
          <title>{`Mag ${p.mag} @ ${new Date(p.time).toLocaleTimeString()}\n${p.place}`}</title>
        </circle>
      ))}
      {/* Y axis */}
      <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="#b0b8c1" strokeWidth={1} />
      {/* X axis */}
      <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#b0b8c1" strokeWidth={1} />
      {/* Min/Max labels */}
      <text x={5} y={padding+5} fontSize={12} fill="#b0b8c1">{maxMag}</text>
      <text x={5} y={height-padding} fontSize={12} fill="#b0b8c1">{minMag}</text>
    </svg>
  );
};

export default EarthquakeLineGraph;
