import React from "react";
import BaseContainer from "../ui/BaseContainer";
import Header from "./Header";
import Logo from "../pictures/Logo";

const EmailVerified =()=> {
  return(
    <BaseContainer>
      <div className={"center-container"}>
        <Header/>
        <Logo width="300px" height="300px" className="logo" />
        <div className="text-container">
          <p>Your Email has been successfully verified!</p>
        </div>
      </div>
    </BaseContainer>
  );
}

export default EmailVerified;