
import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import GlobeLoader from "./GlobeLoader";
import EarthquakeMap from "./EarthquakeMap";
import EarthquakeLineGraph from "./EarthquakeLineGraph";
import { fetchEarthquakes, type Earthquake } from '../api/earthquake';



// Main dashboard component for earthquake visualization
export default function EarthquakeDashboard() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  // 'loading' state removed, handled by showLoader and error
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Loader for 2 seconds on mount, with error handling
  useEffect(() => {
    setShowLoader(true);
    setError(null);
    fetchEarthquakes()
      .then(data => {
  setEarthquakes(data);
        setTimeout(() => setShowLoader(false), 2000);
      })
      .catch(() => {
        setError("Network error: Unable to fetch earthquake data.");
  setEarthquakes([]);
        setTimeout(() => setShowLoader(false), 2000);
      });
  }, []);

  // Refresh handler with error handling
  const handleRefresh = () => {
    setShowLoader(true);
    setError(null);
    fetchEarthquakes()
      .then(data => {
  setEarthquakes(data);
        setTimeout(() => setShowLoader(false), 2000);
      })
      .catch(() => {
        setError("Network error: Unable to fetch earthquake data.");
  setEarthquakes([]);
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
    <div className="relative max-w-full mx-auto bg-[#1e2028]/95 rounded-3xl shadow-2xl p-2 sm:p-6 md:p-10 flex flex-col gap-6 min-h-[80vh]">
      {/* Loader Overlay */}
        {showLoader && ( 
          <div className="absolute top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-transparent">
          <GlobeLoader />
        </div>
        )} 
      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="absolute top-3 right-3 sm:top-6 sm:right-8 z-60 bg-[#232526] hover:bg-[#2e3136] text-[#7fd6e7] font-bold py-2 px-4 sm:px-5 rounded-full shadow transition-all border border-[#7fd6e7] text-base sm:text-lg flex items-center gap-2"
        style={{ minWidth: 90 }}
        aria-label="Refresh Earthquake Data"
      >
        <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6 mr-1" />
        Refresh
      </button>
      <header className="text-center mb-2 sm:mb-4">
        <h1 className="text-[2rem] sm:text-[2.8rem] mb-1 text-[#7fd6e7] tracking-wide">🌍 Earthquake Visualizer</h1>
        <p className="text-[#b0b8c1] text-base sm:text-[1.2rem]">Real-time earthquake stats and insights</p>
      </header>
      {/* Error or No Results Message */}
      {!showLoader && error && (
        <div className="text-center text-red-400 font-semibold text-lg py-8">{error}</div>
      )}
      {!showLoader && !error && earthquakes.length === 0 && (
        <div className="text-center text-yellow-300 font-semibold text-lg py-8">No earthquake results found.</div>
      )}
      {/* Hide dashboard content when loader or error is shown */}
      {!showLoader && !error && earthquakes.length > 0 && (
        <>
          {/* Stats Section */}
          <section className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
            <div className="flex-1 bg-gradient-to-br from-[#232526] to-[#414345] rounded-2xl shadow-md p-4 sm:p-6 text-center transition-transform">
              <h2 className="text-[#7fd6e7] text-base sm:text-[1.1rem] mb-2 font-medium">Active Earthquakes</h2>
              <span className="text-2xl sm:text-[2.3rem] font-bold text-white tracking-wide">{activeCount}</span>
            </div>
            <div className="flex-1 bg-gradient-to-br from-[#232526] to-[#414345] rounded-2xl shadow-md p-4 sm:p-6 text-center transition-transform">
              <h2 className="text-[#7fd6e7] text-base sm:text-[1.1rem] mb-2 font-medium">Strongest Magnitude</h2>
              <span className="text-2xl sm:text-[2.3rem] font-bold text-white tracking-wide">{strongest}</span>
            </div>
            <div className="flex-1 bg-gradient-to-br from-[#232526] to-[#414345] rounded-2xl shadow-md p-4 sm:p-6 text-center transition-transform">
              <h2 className="text-[#7fd6e7] text-base sm:text-[1.1rem] mb-2 font-medium">Most Recent</h2>
              <span className="text-2xl sm:text-[2.3rem] font-bold text-white tracking-wide">{mostRecentAgo}</span>
            </div>
          </section>
          {/* Map & Graph Section */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-8 flex-wrap">
            <div className="flex-1 w-full min-w-0 max-w-full bg-[#232526] rounded-2xl p-2 sm:p-4 md:p-6 pb-4 sm:pb-8 min-h-[180px] sm:min-h-[260px] md:min-h-[440px] shadow-md mb-4 overflow-x-auto sm:overflow-x-visible">
              <h3 className="text-[#7fd6e7] mb-2 sm:mb-5 text-base sm:text-[1.15rem]">Earthquake Map</h3>
              <div className="w-full h-[180px] sm:h-[260px] md:h-[440px]">
                <EarthquakeMap />
              </div>
            </div>
            <div className="flex-1 w-full min-w-0 max-w-full bg-[#232526] rounded-2xl p-2 sm:p-4 md:p-6 pb-4 sm:pb-8 min-h-[100px] sm:min-h-[120px] md:min-h-[220px] shadow-md mb-4 flex flex-col overflow-x-auto">
              <h3 className="text-[#7fd6e7] mb-2 sm:mb-3 md:mb-5 text-sm sm:text-base md:text-[1.15rem]">Latest Magnitudes (Line Graph)</h3>
              <div className="rounded-xl flex-1 flex flex-col justify-end min-h-[80px] sm:min-h-[100px] md:min-h-[180px] w-full">
                <div className="w-full h-full flex items-end">
                  <EarthquakeLineGraph earthquakes={earthquakes} />
                </div>
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