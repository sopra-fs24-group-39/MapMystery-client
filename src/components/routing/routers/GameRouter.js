import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Game from "../../views/Game";
import Menu from "../../views/Menu";
import Rankings from "../../views/Rankings";
import Friends from "../../views/Friends";
import Settings from "../../views/Settings";
import PropTypes from "prop-types";

const GameRouter = () => {
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <Routes>

        <Route path="" element={<Game />} />

        <Route path="*" element={<Navigate to="dashboard" replace />} />

      </Routes>

    </div>
  );
};
/*
* Don't forget to export your component!
 */

GameRouter.propTypes = {
  base: PropTypes.string
}

export default GameRouter;
