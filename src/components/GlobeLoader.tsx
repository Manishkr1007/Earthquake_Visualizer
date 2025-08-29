

export default function GlobeLoader() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#1e2028] rounded-3xl ">
      <svg
        className="animate-spin-slow"
        width="180"
        height="180"
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Globe outer circle */}
        <circle cx="90" cy="90" r="85" stroke="#7fd6e7" strokeWidth="8" fill="#232526" />
        {/* Meridians */}
        <ellipse cx="90" cy="90" rx="65" ry="85" stroke="#b0b8c1" strokeWidth="2" fill="none" />
        <ellipse cx="90" cy="90" rx="85" ry="65" stroke="#b0b8c1" strokeWidth="2" fill="none" transform="rotate(30 90 90)" />
        <ellipse cx="90" cy="90" rx="85" ry="65" stroke="#b0b8c1" strokeWidth="2" fill="none" transform="rotate(-30 90 90)" />
        {/* Continents (stylized shapes) */}
        <g>
          <path d="M110 60 Q120 80 100 90 Q120 100 110 120 Q90 110 80 120 Q70 100 90 90 Q70 80 90 70 Q100 80 110 60" fill="#7fd6e7" fillOpacity="0.7" />
          <path d="M60 100 Q70 110 60 120 Q80 130 70 110 Q90 120 80 100 Q70 90 60 100" fill="#7fd6e7" fillOpacity="0.5" />
        </g>
      </svg>
      <span className="mt-6 text-2xl text-[#7fd6e7] font-bold tracking-wide">Loading...</span>
    </div>
  );
}
