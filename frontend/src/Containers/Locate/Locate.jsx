import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2VzaGF2Mjk5MDMiLCJhIjoiY2xzYTBsbGtzMDk3ZjJqcnZpNmFzdjJiNyJ9.L-CQ34IUBGFjmeaH6jeZRQ';
    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [75.415414748692072, 22.9183717632871], 
      zoom: 7 
    });

    return () => map.remove();
  }, []);

  return <div id="map-container" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
