import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useGoogleMaps } from './GoogleMapsContext';

const MapsView = ({ coords1, coords2 }) => {
    const { isLoaded } = useGoogleMaps();
    const mapRef = useRef(null);
    const markerRef1 = useRef(null);
    const markerRef2 = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        if (isLoaded && mapRef.current && !window.googleMapInitialized) {
            const map = new google.maps.Map(mapRef.current, {
                mapId: '4504f8b37365c3d0',
                streetViewControl: false,
                fullscreenControl: false,
                gestureHandling: 'none'
            });

            const bounds = new google.maps.LatLngBounds();

            let pos1, pos2;
            if (coords1) {
                pos1 = placeMarker(coords1, map, markerRef1, false);
                bounds.extend(pos1);
            }
            if (coords2) {
                pos2 = placeMarker(coords2, map, markerRef2, true);
                bounds.extend(pos2);
            }

            if (pos1 && pos2) {
                drawLine(pos1, pos2, map);
            }

            map.fitBounds(bounds);

            window.googleMapInitialized = true;
        }

        return () => {
            window.googleMapInitialized = false;
            if (markerRef1.current) {
                markerRef1.current.setMap(null);
            }
            if (markerRef2.current) {
                markerRef2.current.setMap(null);
            }
            if (lineRef.current) {
                lineRef.current.setMap(null);
            }
        };
    }, [isLoaded, coords1, coords2]);

    const placeMarker = (position, map, markerRef, isCoords2) => {
        if (markerRef.current) {
            markerRef.current.setMap(null);
        }
        const newMarker = new google.maps.Marker({
            position,
            map,
            label: isCoords2 ? 'Your Guess' : 'Target',
            icon: isCoords2 ? {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: 'red',
                fillOpacity: 0.9,
                scale: 8,
                strokeColor: 'red',
                strokeWeight: 3
            } : {
               path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
               fillColor: 'yellow',
               fillOpacity: 0.9,
               scale: 8,
               strokeColor: 'black',
               strokeWeight: 3
            },
        });
        markerRef.current = newMarker;
        return position;
    };

    const drawLine = (start, end, map) => {
        if (lineRef.current) {
            lineRef.current.setMap(null);
        }
        const linePath = new google.maps.Polyline({
            path: [start, end],
            geodesic: true,
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 4,
        });
        linePath.setMap(map);
        lineRef.current = linePath;
    };

    return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

MapsView.propTypes = {
    coords1: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
    }).isRequired,
    coords2: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
    }).isRequired,
};

export default MapsView;
