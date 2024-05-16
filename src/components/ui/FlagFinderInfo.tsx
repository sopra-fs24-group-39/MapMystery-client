import { React } from "react";
import BaseElement from "./Container";
import { Link } from "react-router-dom";
import Title from "./Title";
import "../../styles/index.scss";

const FlagFinderInfo = () => {
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
              <p className={"text-3xl font-bold"}>FlagFinder:</p>
              <p>Find the location of an arbitrary Flag.
                Select a position on the map,
                submit your guess, see if you were correct. This gamemode is available for singleplayer only.
              </p>
            </div>
          </div>
        </BaseElement>
      </div>
    </div>
  );
}

export default FlagFinderInfo;