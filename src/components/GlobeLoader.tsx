

export default function GlobeLoader() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#1e2028] rounded-3xl ">
      <svg
        className="animate-spin-slow"
        width="200"
        height="200"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sphere gradient */}
          <radialGradient id="globeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4fc3f7" />
            <stop offset="70%" stopColor="#0288d1" />
            <stop offset="100%" stopColor="#01579b" />
          </radialGradient>
        </defs>

        {/* Outer sphere */}
        <circle cx="100" cy="100" r="95" fill="url(#globeGradient)" stroke="#7fd6e7" strokeWidth="4" />

        {/* Meridians & parallels */}
        <ellipse cx="100" cy="100" rx="70" ry="95" stroke="#b0e0f8" strokeWidth="1.5" fill="none" />
        <ellipse cx="100" cy="100" rx="95" ry="70" stroke="#b0e0f8" strokeWidth="1.5" fill="none" transform="rotate(30 100 100)" />
        <ellipse cx="100" cy="100" rx="95" ry="70" stroke="#b0e0f8" strokeWidth="1.5" fill="none" transform="rotate(-30 100 100)" />
        <ellipse cx="100" cy="100" rx="95" ry="40" stroke="#b0e0f8" strokeWidth="1.5" fill="none" />

        {/* Continents (stylized shapes) */}
        <g fill="#7fd6e7" fillOpacity="0.8">
          <path d="M115 70 Q125 90 105 100 Q125 110 115 130 Q95 120 85 130 Q75 110 95 100 Q75 90 95 80 Q105 90 115 70Z" />
          <path d="M65 110 Q75 120 65 130 Q85 140 75 120 Q95 130 85 110 Q75 100 65 110Z" />
        </g>
      </svg>

      <span className="mt-6 text-2xl text-[#7fd6e7] font-bold tracking-wide">Loading...</span>
    </div>
  );
}
