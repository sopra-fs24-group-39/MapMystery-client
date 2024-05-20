import { React, useState } from "react";
import {api, handleError} from "../../helpers/api";
import "../../styles/ui/FriendsContainer.scss";

const CurrentlyOnline = () => {
  const [players, setPlayers] = useState(0);
  const getOnlineUsers = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    const headers = {
      'Authorization': `${token}`
    };
    try {
      const requestBody = JSON.stringify({id});
      const response = await api.get("/active-users", {
        headers: headers,
        params: { userId: id } // Pass the id as a query parameter
      });
      setPlayers(response.data.Users);
      setPlayers(response.data.Users);
    }
    catch (e) {
      setPlayers(12);
    }
  }

  getOnlineUsers();

  return(
    <div className={"h-auto w-full flex flex-row justify-end"}>
      <div className={"bg-white border-2 border-black"}>
        <p className={"font-mono"}>{players} players <span className={"player-status online"}>Online</span></p>
      </div>
    </div>
  );
}

export default CurrentlyOnline;