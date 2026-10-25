import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapProps {
  lat: number;
  lng: number;
}

export const InteractiveMap: React.FC<MapProps> = ({ lat, lng }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
    const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
    const isDark = document.documentElement.classList.contains('dark');

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: isDark ? darkStyle : lightStyle,
      center: [lng, lat],
      zoom: 16,
      attributionControl: false,
      scrollZoom: false
    });

    mapRef.current = map;

    // Create antique brass pulsing pin element
    const markerEl = document.createElement('div');
    markerEl.style.position = 'relative';
    markerEl.style.display = 'flex';
    markerEl.style.alignItems = 'center';
    markerEl.style.justifyContent = 'center';
    markerEl.style.width = '24px';
    markerEl.style.height = '24px';

    const ping = document.createElement('span');
    ping.style.position = 'absolute';
    ping.style.width = '100%';
    ping.style.height = '100%';
    ping.style.borderRadius = '50%';
    ping.style.backgroundColor = '#D7BD8B';
    ping.style.opacity = '0.75';
    ping.style.animation = 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite';

    const dot = document.createElement('span');
    dot.style.position = 'relative';
    dot.style.width = '14px';
    dot.style.height = '14px';
    dot.style.borderRadius = '50%';
    dot.style.backgroundColor = '#AE8950';
    dot.style.border = '2px solid #F4EFE4';
    dot.style.boxShadow = '0 2px 6px rgba(24, 39, 59, 0.4)';

    markerEl.appendChild(ping);
    markerEl.appendChild(dot);

    new maplibregl.Marker({ element: markerEl })
      .setLngLat([lng, lat])
      .addTo(map);

    // Observer for dark mode changes
    const observer = new MutationObserver(() => {
      const currentDark = document.documentElement.classList.contains('dark');
      map.setStyle(currentDark ? darkStyle : lightStyle);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
      map.remove();
    };
  }, [lat, lng]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '1rem',
        overflow: 'hidden'
      }}
    />
  );
};
