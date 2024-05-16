import React from "react";
import BaseContainer from "../ui/BaseContainer";
import Header from "./Header";
import Logo from "../pictures/Logo";
import BackgroundImage from "./sources/background.png";
import { api } from "helpers/api";

const EmailVerified =()=> {
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const confirmEmail = async () => {
    try {
      const requestBody = JSON.stringify({token});
      const response = await api.get("/verify-account" ,requestBody);
      // returns a message to the user.
    } catch (e) {
      const response = e;
    }
    return response;
  }

  return(
    <BaseContainer backgroundImage={BackgroundImage} className="main-body overflow-scroll">
      <div className={"center-container"}>
        <Header/>
        <Logo width="300px" height="300px" className="logo" />
        <div className="text-container">
          <p>{confirmEmail}</p>
        </div>
      </div>
    </BaseContainer>
  );
}

export default EmailVerified;