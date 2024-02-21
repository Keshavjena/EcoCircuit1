import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import './Locate.scss';

const Map = () => {
  
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2VzaGF2Mjk5MDMiLCJhIjoiY2xzYTBsbGtzMDk3ZjJqcnZpNmFzdjJiNyJ9.L-CQ34IUBGFjmeaH6jeZRQ';
    
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/keshav29903/clsikgc9301iq01qsazd4f5dd',
      center: [73.415414748692072, 18.9183717632871], 
      zoom: 8, 
    });
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        reverseGeocode: true,
        fuzzyMatch: true,
        proximity: true
      })
    );

    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: '100%', height: '60vh' }} />;
};

export default Map;