"use client";

import { useState, useEffect, useRef } from "react";
import Map, {
	FullscreenControl,
	Marker,
	NavigationControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { ChevronDown, Navigation } from "lucide-react";

const LAT = 25.1745202;
const LNG = 55.3704554;
const LOCATION_TITLE = "Hot Wheel Used Motors Trading LLC";

const MAP_PROVIDERS = [
  {
    name: "Google Maps",
    url: `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`,
    icon: (
      <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
  },
  {
    name: "Apple Maps",
    url: `https://maps.apple.com/?daddr=${LAT},${LNG}&q=${encodeURIComponent(LOCATION_TITLE)}`,
    icon: (
      <svg className="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.09c.67-.81 1.12-1.94.99-3.09-.97.04-2.14.65-2.83 1.46-.62.72-1.16 1.88-1.01 3.01 1.08.08 2.18-.57 2.85-1.38z"/>
      </svg>
    ),
  },
  {
    name: "Waze",
    url: `https://waze.com/ul?ll=${LAT},${LNG}&navigate=yes`,
    icon: (
      <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 3.09 1.41 5.84 3.63 7.67.24.2.49.38.75.55.51.34 1.06.62 1.64.83.6.22 1.22.37 1.86.45.68.08 1.37.08 2.05 0 .64-.08 1.26-.23 1.86-.45.58-.21 1.13-.49 1.64-.83.26-.17.51-.35.75-.55C20.59 17.84 22 15.09 22 12c0-5.52-4.48-10-10-10zm-3 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm6 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    ),
  },
  {
    name: "OpenStreetMap",
    url: `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=;${LAT},${LNG}`,
    icon: (
      <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
      </svg>
    ),
  },
];

export function ContactMapSection() {
  const [primaryUrl, setPrimaryUrl] = useState(MAP_PROVIDERS[0].url);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined" && /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) {
      setPrimaryUrl(MAP_PROVIDERS[1].url);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="w-full px-4 mb-16 lg:mb-24">
      <div className="max-w-6xl mx-auto h-[400px] lg:h-[500px] bg-zinc-950 relative border border-zinc-800/50 rounded-lg overflow-hidden shadow-2xl">
        <div className="absolute top-4 left-4 z-10" ref={dropdownRef}>
          <div className="inline-flex rounded-lg shadow-lg bg-white text-black overflow-hidden divide-x divide-zinc-200">
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 font-normal text-sm hover:bg-zinc-100 transition-colors"
            >
              <Navigation className="w-4 h-4 fill-black text-black" />
              Get Directions
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="px-2.5 py-2.5 hover:bg-zinc-100 transition-colors flex items-center justify-center"
              aria-label="Select Map Provider"
            >
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-52 bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl py-1 z-20 backdrop-blur-md">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800/80">
                Choose Map App
              </div>
              {MAP_PROVIDERS.map((provider) => (
                <a
                  key={provider.name}
                  href={provider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900 hover:text-white transition-colors"
                >
                  {provider.icon}
                  <span>{provider.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        <Map
          initialViewState={{
            longitude: LNG,
            latitude: LAT,
            zoom: 16.5,
          }}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          style={{ width: "100%", height: "100%" }}
          cooperativeGestures={true}
        >
          <Marker anchor="bottom" latitude={LAT} longitude={LNG}>
            <div className="flex flex-col items-center gap-1">
              <span className="text-white font-medium text-sm drop-shadow-md whitespace-nowrap mb-1">
                {LOCATION_TITLE}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
                <path fillRule="evenodd" clipRule="evenodd" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
              </svg>
            </div>
          </Marker>

          <NavigationControl position="bottom-right" />
          <FullscreenControl position="bottom-right" />
        </Map>
      </div>
    </section>
  );
}

