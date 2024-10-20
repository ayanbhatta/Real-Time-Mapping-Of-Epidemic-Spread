// map.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ covidData, tbData, malariaData }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current === null) {
      return;
    }

    const map = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const drawCircle = (lat, long, cases, color, disease) => {
      // Check if lat and long are defined, else use fallback values
      if (typeof lat === 'undefined' || typeof long === 'undefined') {
        console.warn(`Missing LatLng for ${disease}, using default location.`);
        lat = 20.5937;  // Fallback latitude (India's center)
        long = 78.9629; // Fallback longitude
      }

      L.circle([lat, long], {
        color: color,
        fillColor: color,
        fillOpacity: 0.5,
        radius: Math.sqrt(cases) * 100,
      })
        .addTo(map)
        .bindPopup(`<b>${disease}</b><br>Cases: ${cases}`);
    };

    // Ensure lat/long values exist for COVID-19 data
    covidData.forEach((item) => {
      drawCircle(item.lat, item.long, item.cases, 'red', 'COVID-19');
    });

    // Ensure lat/long values exist for TB data
    tbData.forEach((item) => {
      drawCircle(item.lat, item.long, item.NumericValue, 'blue', 'Tuberculosis');
    });

    // Ensure lat/long values exist for Malaria data
    malariaData.forEach((item) => {
      drawCircle(item.lat, item.long, item.NumericValue, 'green', 'Malaria');
    });

    return () => {
      map.remove();
    };
  }, [covidData, tbData, malariaData]);

  return <div ref={mapContainerRef} id="map" style={{ height: '500px', width: '100%' }}></div>;
}

export default Map;
