import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useGoogleMaps } from './GoogleMapsContext';

const MapViewCountry = ({ onCountryUpdate }) => {
    const { isLoaded } = useGoogleMaps();
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const geocoder = useRef(new google.maps.Geocoder());

    useEffect(() => {
        if (isLoaded && mapRef.current && !window.googleMapInitialized) {
            const map = new google.maps.Map(mapRef.current, {
                center: { lat: 47.377076, lng: 8.544310 },
                zoom: 8,
                mapId: '4504f8b37365c3d0',
                streetViewControl: false,
                fullscreenControl: false,
            });

            map.addListener('click', (e) => {
                const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                placeMarker(position, map);
                reverseGeocode(position);
            });

            window.googleMapInitialized = true;
        }

        return () => {
            window.googleMapInitialized = false;
            if (markerRef.current) {
                markerRef.current.setMap(null);
            }
        };
    }, [isLoaded]);

    const placeMarker = (position, map) => {
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

    const reverseGeocode = (position) => {
        geocoder.current.geocode({ location: position }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                const country = results.find(result =>
                    result.address_components.some(component =>
                        component.types.includes("country")
                    )
                )?.address_components.find(component =>
                    component.types.includes("country")
                )?.long_name || 'Unknown country';

                onCountryUpdate(country);
                console.log("Country found: ", country);
            } else {
                console.error('Geocoder failed due to: ' + status);
                onCountryUpdate('Unknown country');
            }
        });
    };

    return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

MapViewCountry.propTypes = {
    onCountryUpdate: PropTypes.func.isRequired,
};

export default MapViewCountry;
