import { React, useState } from "react";
import BaseContainer from "../ui/BaseContainer";
import Header from "./Header";
import Logo from "../pictures/Logo";
import BackgroundImage from "./sources/background.png";
import { api } from "helpers/api";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import NotificationSquare from "components/ui/NotificationSquare";
import "../../styles/views/CreatePrivateLobby.scss";

const CreatePrivateLobby = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [notactive, setNotActive] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const callCreatePrivateLobby = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `${token}`
      }
    };
    const id = localStorage.getItem("userId");
    try {
      const requestBody = JSON.stringify({ id });
      const response = await api.post("/Lobby/private/GameMode1", requestBody, config);

      localStorage.setItem("authKey", response.data.authKey);
      localStorage.setItem("lobby", response.data.lobbyId);
      navigate("/lobby");
    } catch (e) {
      if (e.response) {
        const statusCode = e.response.status;
        if (statusCode === 409) {
          addNotification("You already have a private lobby", "error");
        } else {
          addNotification("Error while creating private lobby:" , "error");
        }
      } else {
        addNotification("Network error or server did not respond", "error");
    }
  }
    {/*setNotActive(false);*/}
  }

  const addNotification = (text, type) => {
    setNotifications(prevNotifications => [
      ...prevNotifications,
      { id: Date.now(), text, type }
    ]);
  }

  const removeNotification = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  }

  return(
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <NotificationSquare
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <div className={"center-container"}>
        <Header />
        <Logo width="40vh" height="40vh" className="logo" />
        <div className={"text-container-sm"}>
          <p>Create or join a private game!</p>
        </div>
        <div>
          <div className={"center-container"} onClick={callCreatePrivateLobby}>
            {/*}{notactive? <Button type={"regular"} name={"Get a code to share"} width={"lg"}></Button>:null}*/}
            <Button type={"regular"} name={"Get a code to share"} width={"lg"}></Button>
          </div>
          <div className={"text-container"}>
            <p>Share the code that you will see on the next page with your friends.</p>
          </div>
          <div className={"w-auto flex flex-row justify-center"}>
            <a className={"text mt-4"} href={"/privateLobby"}>Back</a>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
}

export default CreatePrivateLobby;