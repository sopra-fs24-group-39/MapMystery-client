import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface GoogleMapsContextState {
    isLoaded: boolean;
    loadError: Error | null;
}

//create context with the defaults
const GoogleMapsContext = createContext<GoogleMapsContextState>({ isLoaded: false, loadError: null });

//custom hook
export const useGoogleMaps = () => useContext(GoogleMapsContext);

interface GoogleMapsProviderProps {
    children: ReactNode;
}

export const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState<Error | null>(null);

    useEffect(() => {
        if (!document.querySelector(`script[src^="https://maps.googleapis.com/maps/api/js"]`)) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBfmj944xm-eZuehcBdvHTFeFOjCyPLJdI&callback`;
            script.async = true;
            script.defer = true;

            script.onload = () => setIsLoaded(true);
            script.onerror = (event: Event | string) => {
                const error = event as ErrorEvent;
                setLoadError(error.error);
            };

            document.head.appendChild(script);

            return () => {
                document.head.removeChild(script);
            };
        }
    }, []);

    return (
        <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
            {children}
        </GoogleMapsContext.Provider>
    );
};
