import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useGoogleMaps } from './GoogleMapsContext';

const MapView = ({ onMarkerUpdate, panoramaCoords, markerCoords }) => {
    const { isLoaded } = useGoogleMaps();
    const mapRef = useRef(null);
    const panoramaMarkerRef = useRef(null);
    const userMarkerRef = useRef(null);

    useEffect(() => {
        if (isLoaded && mapRef.current && !window.googleMapInitialized) {
            const map = new google.maps.Map(mapRef.current, {
                center: panoramaCoords || { lat: 47.377076, lng: 8.544310 },
                zoom: 5,
                mapId: '4504f8b37365c3d0',
                streetViewControl: false,
                fullscreenControl: false,
            });

            // Place initial markers
            if (panoramaCoords) {
                placeMarker(panoramaCoords, map, panoramaMarkerRef);
            }
            if (markerCoords) {
                placeMarker(markerCoords, map, userMarkerRef);
            }

            map.addListener('click', (e) => {
                const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                placeMarker(position, map, userMarkerRef);
                onMarkerUpdate(position);
            });

            window.googleMapInitialized = true;
        }

        return () => {
            window.googleMapInitialized = false;
            if (panoramaMarkerRef.current) {
                panoramaMarkerRef.current.setMap(null);
            }
            if (userMarkerRef.current) {
                userMarkerRef.current.setMap(null);
            }
        };
    }, [isLoaded, panoramaCoords, markerCoords]);

    const placeMarker = (position, map, markerRef) => {
        if (markerRef.current) {
            markerRef.current.setMap(null);
        }

        const newMarker = new google.maps.Marker({
            position,
            map,
        });

        markerRef.current = newMarker;
        console.log("Marker placed at: ", position);
    };

    return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

MapView.propTypes = {
    onMarkerUpdate: PropTypes.func.isRequired,
    panoramaCoords: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
    }),
    markerCoords: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
};

export default MapView;
