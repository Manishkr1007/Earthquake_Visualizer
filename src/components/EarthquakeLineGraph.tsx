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
  const width = 600;
  const height = 240;
  const padding = 30;
  const points = sorted.map((e, i) => {
    const x = padding + (i * (width - 2 * padding)) / (sorted.length - 1);
    const y = height - padding - ((e.mag - minMag) / (maxMag - minMag || 1)) * (height - 2 * padding);
    return { x, y, mag: e.mag, time: e.time, place: e.place };
  });
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  return (
    <svg width={width} height={height} className="w-full h-60">
      <polyline fill="none" stroke="#7fd6e7" strokeWidth={3} points={points.map(p => `${p.x},${p.y}`).join(' ')} />
      {/* Dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="#7fd6e7">
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
