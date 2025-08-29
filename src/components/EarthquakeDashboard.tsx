
import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import GlobeLoader from "./GlobeLoader";
import EarthquakeMap from "./EarthquakeMap";
import EarthquakeLineGraph from "./EarthquakeLineGraph";
import { fetchEarthquakes, type Earthquake } from '../api/earthquake';



export default function EarthquakeDashboard() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);


  // Loader for 2 seconds on mount
  useEffect(() => {
    setShowLoader(true);
    fetchEarthquakes().then(data => {
      setEarthquakes(data);
      setLoading(false);
      setTimeout(() => setShowLoader(false), 2000);
    });
  }, []);

  // Refresh handler
  const handleRefresh = () => {
    setShowLoader(true);
    setLoading(true);
    fetchEarthquakes().then(data => {
      setEarthquakes(data);
      setLoading(false);
      setTimeout(() => setShowLoader(false), 2000);
    });
  };

  const activeCount = earthquakes.length;
  const strongest = earthquakes.length > 0 ? Math.max(...earthquakes.map(eq => eq.mag)) : '-';
  const mostRecent = earthquakes.length > 0 ? earthquakes.reduce((a, b) => (a.time > b.time ? a : b)) : null;
  const mostRecentAgo = mostRecent ?
    (() => {
      const diff = Date.now() - mostRecent.time;
  if (diff < 60000) return `${Math.floor(diff / 1000)} sec ago`;
      if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
      return `${Math.floor(diff / 3600000)} hr ago`;
    })() : '-';

  return (
    <div className="relative max-w-full mx-auto bg-[#1e2028]/95 rounded-3xl shadow-2xl p-10 flex flex-col gap-10 min-h-[80vh]">
      {/* Loader Overlay */}
      {showLoader && (
        <div className="absolute h-screen  inset-0 z-50 flex items-center justify-center bg-[#1e2028]/95 rounded-3xl">
          <GlobeLoader />
        </div>
      )}
      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="absolute top-6 right-8 z-60 bg-[#232526] hover:bg-[#2e3136] text-[#7fd6e7] font-bold py-2 px-5 rounded-full shadow transition-all border border-[#7fd6e7] text-lg flex items-center gap-2"
        style={{ minWidth: 120 }}
        aria-label="Refresh Earthquake Data"
      >
        <RotateCcw className="h-6 w-6 mr-1" />
        Refresh
      </button>
      <header className="text-center mb-4">
        <h1 className="text-[2.8rem] mb-1 text-[#7fd6e7] tracking-wide">🌍 Earthquake Visualizer</h1>
        <p className="text-[#b0b8c1] text-[1.2rem]">Real-time earthquake stats and insights</p>
      </header>
      {/* Hide dashboard content when loader is shown */}
      {!showLoader && (
        <>
          <section className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
        <div className="flex-1 bg-gradient-to-br from-[#232526] to-[#414345] rounded-2xl shadow-md p-6 text-center transition-transform">
          <h2 className="text-[#7fd6e7] text-[1.1rem] mb-2 font-medium">Active Earthquakes</h2>
          <span className="text-[2.3rem] font-bold text-white tracking-wide">{loading ? '-' : activeCount}</span>
        </div>
        <div className="flex-1 bg-gradient-to-br from-[#232526] to-[#414345] rounded-2xl shadow-md p-6 text-center transition-transform">
          <h2 className="text-[#7fd6e7] text-[1.1rem] mb-2 font-medium">Strongest Magnitude</h2>
          <span className="text-[2.3rem] font-bold text-white tracking-wide">{loading ? '-' : strongest}</span>
        </div>
        <div className="flex-1 bg-gradient-to-br from-[#232526] to-[#414345] rounded-2xl shadow-md p-6 text-center transition-transform">
          <h2 className="text-[#7fd6e7] text-[1.1rem] mb-2 font-medium">Most Recent</h2>
          <span className="text-[2.3rem] font-bold text-white tracking-wide">{loading ? '-' : mostRecentAgo}</span>
        </div>
      </section>
          <section className="flex flex-col md:flex-row gap-6 md:gap-8 flex-wrap">
        <div className="flex-1 min-w-[250px] md:min-w-[350px] bg-[#232526] rounded-2xl p-4 sm:p-6 pb-8 min-h-[340px] md:min-h-[440px] shadow-md mb-4">
          <h3 className="text-[#7fd6e7] mb-5 text-[1.15rem]">Earthquake Map</h3>
          <EarthquakeMap />
        </div>
        <div className="flex-1 min-w-[250px] md:min-w-[350px] bg-[#232526] rounded-2xl p-4 sm:p-6 pb-8 min-h-[180px] md:min-h-[220px] shadow-md mb-4">
          <h3 className="text-[#7fd6e7] mb-5 text-[1.15rem]">Latest Magnitudes (Line Graph)</h3>
          <div className="rounded-xl h-40 md:h-60 flex items-center justify-center">
            <EarthquakeLineGraph earthquakes={earthquakes} />
          </div>
        </div>
      </section>
        </>
      )}
      {/* Custom slow spin animation for globe */}
      <style>{`
        .animate-spin-slow {
          animation: spin 2.5s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}