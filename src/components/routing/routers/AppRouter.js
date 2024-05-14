import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {GameGuard} from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import Start from "../../views/Start";
import Rankings from "../../views/Rankings";
import Friends from "../../views/Friends";
import GlobeGuesserLobby from "../../views/GlobeGuesserLobby";
import Settings from "../../views/Settings";
import Login from "../../ui/Login";
import FlagFinder from "../../views/FlagFinder";
import GlobeGuesser from "../../views/GlobeGuesser";
import GlobeGuesserDistanceScreen from "../../views/GlobeGuesserDistanceScreen";
import PrivateLobby from "../../views/PrivateLobby";
import JoinPrivateLobby from "../../views/JoinPrivateLobby";
import CreatePrivateLobby from "../../views/CreatePrivateLobby";
import FlagFinderGuesses from "../../views/FlagFinderGuesses";
import FlagFinderConfiguration from "../../views/FlagFinderConfiguration";

const AppRouter = () => {
  return (
      <BrowserRouter>
        <Routes>

          <Route element={<GameGuard />}>
            <Route path="/friends" element={<Friends />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/globeguesser" element={<GlobeGuesser />} />
            <Route path="/lobby" element={<GlobeGuesserLobby />} />
            <Route path="/game/*" element={<GameRouter base="/game"/>} />
            <Route path="/distance" element={<GlobeGuesserDistanceScreen />} />
          </Route>

          <Route element={<LoginGuard />}>
            <Route path="/login" element={<Start />} />
            <Route path="/privateLobby" element={<PrivateLobby />} />
            <Route path="/joinPrivateLobby" element={<JoinPrivateLobby />} />
            <Route path="/createPrivateLobby" element={<CreatePrivateLobby />} />
            <Route path="/country" element={<FlagFinder />} />
            <Route path="/ffconfiguration" element={<FlagFinderConfiguration />} />
            <Route path="/ffguesses" element={<FlagFinderGuesses />} />
          </Route>

          <Route path="/" element={<Navigate to="/game" replace />} />

        </Routes>
      </BrowserRouter>
  );
};

export default AppRouter;
