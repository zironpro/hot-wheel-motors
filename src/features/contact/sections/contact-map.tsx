"use client";

import Map, {
	FullscreenControl,
	Marker,
	NavigationControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export function ContactMapSection() {
  return (
    <section className="w-full px-4 mb-16 lg:mb-24">
      <div className="max-w-6xl mx-auto h-[400px] lg:h-[500px] bg-zinc-950 relative border border-zinc-800/50 rounded-lg overflow-hidden shadow-2xl">
        <div className="absolute top-4 left-4 z-10">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=25.1745202,55.3704554"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-normal text-sm shadow-lg hover:bg-zinc-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
            Get Directions
          </a>
        </div>
        <Map
          initialViewState={{
              longitude: 55.3704554,
              latitude: 25.1745202,
              zoom: 16.5,
          }}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          style={{ width: "100%", height: "100%" }}
          cooperativeGestures={true}
        >
          <Marker anchor="bottom" latitude={25.1745202} longitude={55.3704554}>
              <div className="flex flex-col items-center gap-1">
                  <span className="text-white font-medium text-sm drop-shadow-md whitespace-nowrap mb-1">
                      Hot Wheel Used Motors Trading LLC
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
