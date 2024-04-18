import React, { useEffect } from 'react';


declare global {
    interface Window {
        initPano: () => void;
    }
}
const PanoramaView = () => {
    useEffect(() => {
        // Define initPano inside useEffect to ensure it captures current state and props if needed
        const locations = [
            [{lat:47.376644, lng:8.544620},{city:'Zuerich'}],
            [{lat:-36.854639, lng:174.762781},{city:'Auckland'}],
            [{lat:55.951537, lng:-3.199094},{city:'Edinburgh'}],
            [{lat:49.276188, lng:-123.099929},{city:'Vancouver'}],
            [{lat:-33.918082, lng:18.476921},{city:'Kapstadt'}],
            [{lat:1.317413, lng: 103.862955},{city:'Singapur'}],
            [{lat:35.713754, lng:139.779200},{city:'Tokyo'}],
            [{lat:52.524574, lng:13.349272},{city:'Berlin'}],
            [{lat:55.773513, lng:37.590209},{city:'Moscow'}],
            [{lat:-22.957637, lng:-43.199269},{city:'Rio de Janeiro'}],
        ]

        function initPano() {
            const currentLocation = locations[Math.floor(Math.random()*locations.length)]
            const currentCoordinates = currentLocation[0]
            const currentCity = currentLocation[1].city
            const panorama = new google.maps.StreetViewPanorama(
                document.getElementById("panorama") as HTMLElement,
                {
                    position: currentCoordinates,
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
