import { React } from "react";
import BaseElement from "./Container";
import { Link } from "react-router-dom";
import Title from "./Title";
import "../../styles/index.scss";

const GlobeGuesserInfo = () => {
  return(
    <div className={"center-container login-background"}>
      <div className={"container-container"}>
        <BaseElement width={750} height={570}>
          <div className={"flex flex-row justify-end"}>
            <Link to={"/"}>X</Link>
          </div>
          <div>
            <Title text={"Game Information"} size={"sm"}></Title>
            <div className={"text-containe"}>
              <p className={"text-3xl font-bold"}>GlobeGuesser:</p>
              <p>This Gamemode is for three players only.
                How it works: Guess the location of an arbitrary google maps streetview image.
                Select a position on the map,
                submit your guess, see how close you were and how you stack up
                to your opponents. This gamemode is available for multiplayer only.
                Join a random lobby or create your own game and invite your friends.
                There are three players needed to start a game.</p>
            </div>
          </div>
        </BaseElement>
      </div>
    </div>
  );
}

export default GlobeGuesserInfo;