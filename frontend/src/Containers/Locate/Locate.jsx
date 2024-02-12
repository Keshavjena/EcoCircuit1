import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import './Locate.scss';

const Map = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2VzaGF2Mjk5MDMiLCJhIjoiY2xzYTBsbGtzMDk3ZjJqcnZpNmFzdjJiNyJ9.L-CQ34IUBGFjmeaH6jeZRQ';
    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/keshav29903/clsikgc9301iq01qsazd4f5dd',
      center: [73.415414748692072, 18.9183717632871], 
      zoom: 8 
    });

    return () => map.remove();
  }, []);

  return <div id="map-container" style={{ width: '100%', height: '100vh' }} />;
};

export default Map;
