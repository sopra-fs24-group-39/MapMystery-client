import React, { useState, useEffect } from "react";
import "../../styles/ui/GameInput.scss";
import Button from "components/ui/Button";
import PanoramaView from "../views/PanoramaView";
import MapsView from "../views/MapsView";
import { calculateDistance } from "../../helpers/distance";
import { useNavigate } from "react-router-dom";

interface GameInputProps {
  lat: string;
  long: string;
  onDistanceCalculated: (distance: number) => void;
  onNavigate: (coords: { lat1: number; lng1: number; lat2: number; lng2: number; }) => void;
}

const GameInput: React.FC<GameInputProps> = ({ lat, long, onDistanceCalculated, onNavigate }) => {
  const navigate = useNavigate();
  const [yellowStyle, setYellowStyle] = useState({
    width: '70%',
    height: '75%',
    top: '6%',
    left: '1%',
    zIndex: 1,
    position: 'absolute',
    border: 'solid 15px #FDF319',
  });

  const [blueStyle, setBlueStyle] = useState({
    width: '35%',
    height: '35%',
    top: '64%',
    left: '64%',
    zIndex: 2,
    position: 'absolute',
    border: 'solid 15px #82CBE2',
  });

  const handleSwap = () => {
      if (yellowStyle.zIndex < blueStyle.zIndex) {
        setYellowStyle(prev => ({ ...prev, ...blueStyle, zIndex: 2, border: 'solid 15px #FFD700' }));
        setBlueStyle(prev => ({ ...prev, ...yellowStyle, zIndex: 1, border: 'solid 15px #ADD8E6' }));
      } else {
        setBlueStyle(prev => ({ ...prev, ...yellowStyle, zIndex: 2, border: 'solid 15px #ADD8E6' }));
        setYellowStyle(prev => ({ ...prev, ...blueStyle, zIndex: 1, border: 'solid 15px #FFD700' }));
      }
  };

  const [panoramaCoords, setPanoramaCoords] = useState({ lat: parseFloat(lat), lng: parseFloat(long) });
  const [markerCoords, setMarkerCoords] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const isYellowSmaller = () => {
      const yellowArea = parseFloat(yellowStyle.width) * parseFloat(yellowStyle.height);
      const blueArea = parseFloat(blueStyle.width) * parseFloat(blueStyle.height);
      return yellowArea < blueArea;
    };

  const handleMarkerUpdate = (coords) => {
      console.log("coordinates updated (GameInput):", coords);
      setMarkerCoords(coords);
  };

  useEffect(() => {
      if (submitAttempted) {
        if (markerCoords) {
          const distance = calculateDistance(panoramaCoords.lat, panoramaCoords.lng, markerCoords.lat, markerCoords.lng);
          console.log("Calculated Distance (GameInput):", distance);
          onDistanceCalculated(distance);
        } else {
          onDistanceCalculated(20037508);
          console.log("No marker set, default distance returned (GameInput)");
        }
        setButtonDisabled(true);
        setSubmitAttempted(false);
      }
    }, [submitAttempted, markerCoords, onDistanceCalculated]);

  const handleButtonClick = async () => {
    console.log("Button (GameInput) clicked, Marker Coords:", markerCoords);
    setSubmitAttempted(true);

    if (markerCoords) {
      await onDistanceCalculated(calculateDistance(panoramaCoords.lat, panoramaCoords.lng, markerCoords.lat, markerCoords.lng));
      onNavigate({
          lat1: panoramaCoords.lat,
          lng1: panoramaCoords.lng,
          lat2: markerCoords.lat,
          lng2: markerCoords.lng
        });
    } else {
        await onDistanceCalculated(20037508);
        onNavigate({
          lat1: panoramaCoords.lat,
          lng1: panoramaCoords.lng,
          lat2: -10000000000,
          lng2: -10000000000,
        });
    }
  };


  return (
    <div>
      <div className="rectangle yellow-rectangle" style={yellowStyle} onClick={isYellowSmaller() ? handleSwap : undefined}>
        <PanoramaView coordinates={panoramaCoords} />
        {isYellowSmaller() && <div className="click-overlay" onClick={handleSwap} />}
      </div>
      <div className="rectangle blue-rectangle" style={blueStyle} onClick={!isYellowSmaller() ? handleSwap : undefined}>
        <MapsView onMarkerUpdate={handleMarkerUpdate} />
        {!isYellowSmaller() && <div className="click-overlay" onClick={handleSwap} />}
      </div>
      <div className="submit-button">
        <Button type={"login"} width={"lg"} name={"Submit Guess"} onClick={handleButtonClick}></Button>
      </div>
    </div>
  );
};

export default GameInput;
