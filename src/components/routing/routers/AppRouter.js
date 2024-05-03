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
import GlobeGuesser from "../../views/GlobeGuesser";
import EmailVerified from "../../views/EmailVerified";
import GlobeGuesserDistanceScreen from "../../views/GlobeGuesserDistanceScreen";
import PrivateLobby from "../../views/PrivateLobby";
import JoinPrivateLobby from "../../views/JoinPrivateLobby";
import CreatePrivateLobby from "../../views/CreatePrivateLobby";


/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reactrouter.com/en/main/start/tutorial

         <Route path="/rankings" element={<Rankings />} />
         <Route path="/friends" element={<Friends />} />
         <Route path="/settings" element={<Settings />} />
         <Route path="/globeguesser" element={<GlobeGuesser/>} />

 */

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
        </Route>

        <Route path="/login_test" element={<Login />} />

        <Route path="/distance" element={<GlobeGuesserDistanceScreen />} />

        <Route path="/game/*" element={<GameGuard />}>
          <Route path="/game/*" element={<GameRouter base="/game"/>} />
        </Route>

        <Route path="/login" element={<LoginGuard />}>
          <Route path="/login" element={<Start/>} />
        </Route>

        <Route path="/test" element={<EmailVerified/>}>
        </Route>

        <Route path="/privateLobby" element={<PrivateLobby/>}>
        </Route>

        <Route path="/joinPrivateLobby" element={<JoinPrivateLobby/>} />

        <Route path="/createPrivateLobby" element={<CreatePrivateLobby/>} />

        <Route path="/" element={
          <Navigate to="/game" replace />
        }/>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
