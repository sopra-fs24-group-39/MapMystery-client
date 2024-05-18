import React, { useState, useEffect } from 'react';
import "../../styles/ui/Podium.scss";
import Title from "components/ui/Title";

interface Participant {
  name: string;
  points: number;
}

interface PodiumProps {
  first: Participant;
  second: Participant;
  third: Participant;
}

const Podium: React.FC<PodiumProps> = ({ first, second, third }) => {
  const [displayStage, setDisplayStage] = useState(0);

  useEffect(() => {
    const intervals = [2000, 3000, 3000, 3000, 2000]; // [2617, 2325, 3036, 1667, 2000]; for song
    let totalTime = 0;

    intervals.forEach((interval, index) => {
      totalTime += interval;
      setTimeout(() => {
        setDisplayStage(index + 1);
      }, totalTime);
    });

    setTimeout(() => {
      setDisplayStage(5);
    }, totalTime + 3000);

    return () => clearTimeout(); // Cleanup timeout if component unmounts
  }, []);

  return (
    <div className="podium-container">
      <Title text="" className="site-title" size={"md"} />
      {displayStage === 1 && <Title text={`Third place with ${third.points} points is ${third.name}!`} className="site-title" size={"md"} />}
      {displayStage === 2 && <Title text={`Second place with ${second.points} points is ${second.name}!`} className="site-title" size={"md"} />}
      {displayStage === 3 && <Title text={`And in first place with ${first.points} points is ${first.name}!`} className="site-title" size={"md"} />}
      {displayStage >= 4 && <Title text="Congratulations!" className="site-title" size={"md"} />}
      <div className="podium">
        <div className="second-container">
          <div className="second-name">{displayStage >= 3 ? second.name : "..."}</div>
          <div className="second-rectangle">
            <div className="details-two">
              <div>{displayStage >= 3 ? `${second.points} Pts.` : ""}</div>
            </div>
            <div className="rank-two">2</div>
          </div>
        </div>
        <div className="first-container">
          <div className="first-name">{displayStage >= 4 ? first.name : "..."}</div>
          <div className="first-rectangle">
            <div className="details-one">
              <div>{displayStage >= 4 ? `${first.points} Pts.` : ""}</div>
            </div>
            <div className="rank-one">1</div>
          </div>
        </div>
        <div className="third-container">
          <div className="third-name">{displayStage >= 2 ? third.name : "..."}</div>
          <div className="third-rectangle">
            <div className="details-three">
              <div>{displayStage >= 2 ? `${third.points} Pts.` : ""}</div>
            </div>
            <div className="rank-three">3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podium;
