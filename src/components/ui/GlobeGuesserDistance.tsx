import React, { useState, useEffect } from "react";
import "../../styles/ui/GlobeGuesserDistance.scss";
import Button from "components/ui/Button";
import PanoramaView from "../views/PanoramaView";
import MapsView from "../views/MapsView";
import { calculateDistance } from "../../helpers/distance";

function noop() {}

const GlobeGuesserDistance = () => {

  const [panoramaCoords, setPanoramaCoords] = useState(null);
  const [markerCoords, setMarkerCoords] = useState(null);

  return (
    <div>
      <div className="distance-element">
       <div className="maps-overlay"/>
        <MapsView
          panoramaCoords={panoramaCoords}
          markerCoords={markerCoords}
          onMarkerUpdate={noop}
        />
      </div>
    </div>
  );
};

export default GlobeGuesserDistance;
