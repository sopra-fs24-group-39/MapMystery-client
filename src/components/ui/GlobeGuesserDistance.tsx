import React, { useState, useEffect } from "react";
import "../../styles/ui/GlobeGuesserDistance.scss";
import Button from "components/ui/Button";
import PanoramaView from "../views/PanoramaView";
import MapViewDistance from "../views/MapsViewDistance";
import { calculateDistance } from "../../helpers/distance";

const GlobeGuesserDistance = () => {
  //test coords
  const testCoords1 = { lat: 40.7128, lng: -74.0060 };
  const testCoords2 = { lat: 47.373878, lng: 8.545094 };

  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (testCoords1 && testCoords2) {
      const dist = calculateDistance(testCoords1.lat, testCoords1.lng, testCoords2.lat, testCoords2.lng);
      const roundedDistance = Math.floor(dist);
      setDistance(roundedDistance);
      console.log(`Distance between the points is ${dist} m`);
    }
  }, []);

  return (
    <div>
      {distance && <p className="distance-text">Distance: {distance} meters!</p>}
      <div className="distance-element">
        <MapViewDistance
          coords1={testCoords1}
          coords2={testCoords2}
        />
      </div>
    </div>
  );
};

export default GlobeGuesserDistance;
