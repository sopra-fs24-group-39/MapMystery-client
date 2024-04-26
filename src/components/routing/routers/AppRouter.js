import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {GameGuard} from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import Menu from "../../views/Menu";
import Start from "../../views/Start";
import Rankings from "../../views/Rankings";
import Friends from "../../views/Friends";
import GlobeGuesserLobby from "../../views/GlobeGuesserLobby";
import Settings from "../../views/Settings";
import Login from "../../ui/Login";
import PanoramaView from "../../views/PanoramaView";
import MapsView from "../../views/MapsView";
import GlobeGuesser from "../../views/GlobeGuesser";


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
        <Route path="/friends" element={<Friends />}>
        </Route>

      <Route path="/rankings" element={<Rankings />}>
      </Route>

      <Route path="/settings" element={<Settings />}>
      </Route>

        <Route path="/login_test" element={<Login />} />

        <Route path="/globeguesser" element={<GlobeGuesser/>} />
        <Route path="/mapview" element={<MapsView/>} />
        <Route path="/lobby" element={<GlobeGuesserLobby/>} />

        <Route path="/game/*" element={<GameGuard />}>
          <Route path="/game/*" element={<GameRouter base="/game"/>} />
        </Route>

        <Route path="/login" element={<LoginGuard />}>
          <Route path="/login" element={<Start/>} />
        </Route>

        <Route path="/" element={
          <Navigate to="/game" replace />
        }/>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
