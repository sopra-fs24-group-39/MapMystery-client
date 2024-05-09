import { React, useState } from "react";
import BaseContainer from "../ui/BaseContainer";
import Header from "./Header";
import Logo from "../pictures/Logo";
import BackgroundImage from "./sources/background.png";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { api } from "helpers/api";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../ui/ErrorMsg";

const JoinPrivateLobby = () => {
  const navigate = useNavigate();

  const [link, setLink] = useState("");
  const [lobbyID, setLobbyID] = useState(null);
  const [error, setError] = useState(null);

  const callPrivateLobbyComponent = async () => {
    const token = localStorage.getItem("token");
    const authKey = link;
    const config = {
      headers: {
        Authorization: `${token}`
      }
    };
    const id = localStorage.getItem("userId");
    try {
      const requestBody = JSON.stringify({id, lobbyID, authKey});
      console.log(requestBody);
      const response = await api.post("/Lobby/GameMode1", requestBody, config);
      localStorage.setItem("lobby", lobbyID);
      navigate("/lobby");
    } catch (e) {
      setError(e.response.data.message);
    }
  }

  return(
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container left-5"}>
        <Header/>
        <Logo width="400px" height="400px" className="logo" />
        <div className={"text-container-sm"}>
          <p>Create or join a private game!</p>
        </div>
        <div>
          <div>
            <Input height={"50px"} width={"400px"} type={"text"} value={link} onChange={(l)=>(setLink(l))}></Input>
            <Input height={"50px"} width={"400px"} type={"text"} value={lobbyID} onChange={(lid)=>(setLobbyID(lid))}></Input>
            <div className={"pt-4"}>
              <Button width={"lg"} name={"Join"} type={"regular"} onClick={callPrivateLobbyComponent}></Button>
            </div>
            {error && <ErrorMsg text={error}></ErrorMsg>}
          </div>
        </div>
      </div>
    </BaseContainer>
  );
}

export default JoinPrivateLobby;