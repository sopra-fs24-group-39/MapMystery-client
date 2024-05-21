import React, { useState, useEffect } from "react";
import "../../styles/ui/GlobeGuesserDistance.scss";
import MapViewDistance from "../views/MapsViewDistance";
import { calculateDistance } from "../../helpers/distance";

interface Coords {
  lat: number;
  lng: number;
}

interface GlobeGuesserDistanceProps {
  coords1: Coords;
  coords2: Coords;
}

const noCoordsSubmittedValue = -10000000000;

const GlobeGuesserDistance: React.FC<GlobeGuesserDistanceProps> = ({ coords1, coords2 }) => {
  const [distance, setDistance] = useState<number | null>(null);
  const [displayCoords2, setDisplayCoords2] = useState<boolean>(true);

  useEffect(() => {
    if (coords2.lat === noCoordsSubmittedValue && coords2.lng === noCoordsSubmittedValue) {
      console.log("No coordinates submitted for coords2");
      setDisplayCoords2(false);
      setDistance(null);
    } else {
      const dist = calculateDistance(coords1.lat, coords1.lng, coords2.lat, coords2.lng);
      const roundedDistance = Math.floor(dist);
      setDistance(roundedDistance);
      console.log(`Distance between the points is ${dist} m`);
    }
  }, [coords1, coords2]);

  const formatDistance = (distance: number) => {
    if (distance >= 1000000) {
      const kilometers = (distance / 1000).toFixed(0);
      return `${kilometers.replace(/\B(?=(\d{3})+(?!\d))/g, "'")} kilometers`;
    } else {
      return `${distance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")} meters`;
    }
  };
  return (
    <div>
      {distance !== null ? (
        <p className="distance-text">Distance: {formatDistance(distance)}!</p>
      ) : (
        !displayCoords2 && <p className="distance-text">No coords submitted.</p>
      )}
      <div className="distance-element">
        <MapViewDistance
          coords1={coords1}
          coords2={displayCoords2 ? coords2 : null}
          label2={displayCoords2 ? "Your Guess" : ""}
          customMarker2={displayCoords2}
        />
      </div>
    </div>
  );
};

export default GlobeGuesserDistance;
