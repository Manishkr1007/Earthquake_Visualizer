



import EarthquakeMap from './components/EarthquakeMap';

function App() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🌍 Earthquake Visualizer</h1>
        <p>Real-time earthquake stats and insights</p>
      </header>
      <section className="dashboard-stats">
        <div className="stat-card">
          <h2>Active Earthquakes</h2>
          <span className="stat-value">23</span>
        </div>
        <div className="stat-card">
          <h2>Strongest Magnitude</h2>
          <span className="stat-value">6.8</span>
        </div>
        <div className="stat-card">
          <h2>Most Recent</h2>
          <span className="stat-value">2 min ago</span>
        </div>
      </section>
      <section className="dashboard-charts">
        <div className="chart-placeholder" style={{ minHeight: 440 }}>
          <h3>Earthquake Map</h3>
          <EarthquakeMap />
        </div>
        <div className="chart-placeholder">
          <h3>Magnitude Distribution</h3>
          <div className="bar-mockup">[Bar chart here]</div>
        </div>
      </section>
    </div>
  );
}

export default App
