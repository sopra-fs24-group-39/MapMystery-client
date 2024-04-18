import React, { useEffect } from 'react';


declare global {
    interface Window {
        initPano: () => void;
    }
}
const PanoramaView = () => {
    useEffect(() => {
        // Define initPano inside useEffect to ensure it captures current state and props if needed
        function initPano() {
            const panorama = new google.maps.StreetViewPanorama(
                document.getElementById("panorama") as HTMLElement,
                {
                    position: { lat: 42.345573, lng: -71.098326 },
                    addressControlOptions: {
                        position: google.maps.ControlPosition.BOTTOM_CENTER,
                    },
                    linksControl: false,
                    panControl: false,
                    enableCloseButton: false,
                    addressControl: false,
                    showRoadLabels: false,
                    zoomControl: false
                }
            );
        }

        // Attach initPano to window before loading the script
        window.initPano = initPano;

        // Create the script element to load the Google Maps API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAHcyXt5iCbj4hM5bESFohiwjCUXoN6vBQ&callback=initPano`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        // Cleanup function to remove the script from the head and the method from window to avoid memory leaks
        return () => {
            document.head.removeChild(script);
            delete window.initPano;
        };
    }, []);

    return (
        <div id="panorama" style={{ width: '100%', height: '100vh'}}></div>
    );
};

export default PanoramaView;
