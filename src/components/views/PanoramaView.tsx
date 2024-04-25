import React, { useEffect, useRef, useState } from 'react';
import { useGoogleMaps } from './GoogleMapsContext';

interface PanoramaViewProps {
    coordinates: { lat: number; lng: number };
}

const PanoramaView: React.FC<PanoramaViewProps> = ({ coordinates }) => {
    const { isLoaded } = useGoogleMaps();
    const panoramaRef = useRef<HTMLDivElement>(null);
    const [closestPoint, setClosestPoint] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        if (isLoaded && panoramaRef.current) {
            const panorama = new google.maps.StreetViewPanorama(
                panoramaRef.current,
                {
                    position: closestPoint || coordinates,
                    linksControl: true,
                    panControl: true,
                    enableCloseButton: false,
                    addressControl: false,
                    showRoadLabels: false,
                    zoomControl: true,
                    motionTrackingControl: true,
                    fullscreenControl: false
                }
            );
        }
    }, [isLoaded, closestPoint, coordinates]);

    useEffect(() => {
        if (isLoaded) {
            const streetViewService = new google.maps.StreetViewService();
            streetViewService.getPanorama({
                location: coordinates,
                radius: 100000
            }, (data, status) => {
                if (status === 'OK' && data) {
                    const nearestPano = data.location.latLng.toJSON();
                    setClosestPoint(nearestPano);
                } else {
                    console.error('No nearby Street View panorama found.');
                }
            });
        }
    }, [isLoaded, coordinates]);

    if (!isLoaded) return <div>Loading Maps...</div>;

    return <div ref={panoramaRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default PanoramaView;
