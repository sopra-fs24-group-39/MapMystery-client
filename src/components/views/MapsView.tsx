import React, { useEffect, useRef, useState } from 'react';

const MapComponent = () => {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAHcyXt5iCbj4hM5bESFohiwjCUXoN6vBQ&callback=initializeMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    window.initializeMap = async () => {
      const { Map } = google.maps;
      const map = new Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
        mapId: '4504f8b37365c3d0'
      });

      map.addListener('click', async (e) => {
        console.log("Map clicked: ", e.latLng);
        const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        await placeMarker(latLng, map);
      });
    };

    loadGoogleMapsScript();

    return () => {
      window.initializeMap = undefined;
    };
  }, []);

  const placeMarker = async (position, map) => {
    console.log("Placing marker...");
    setMarker(prevMarker => {
      if (prevMarker) {
        console.log("Removing existing marker");
        prevMarker.setMap(null);
      }
      const { Marker } = google.maps;
      const newMarker = new Marker({
        position,
        map,
      });

      console.log("Marker placed at: ", position);
      setLocation(position);
      return newMarker;
    });
  };

  const removeMarker = () => {
    setMarker(prevMarker => {
      if (prevMarker) {
        console.log("Removing marker manually...");
        prevMarker.setMap(null);
      }
      setLocation({ lat: null, lng: null });
      return null;
    });
  };

  return (
    <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
  );
};

export default MapComponent;
