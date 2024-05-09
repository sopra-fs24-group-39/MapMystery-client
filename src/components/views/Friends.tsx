import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import Header from "components/views/Header";
import Title from "components/ui/Title";
import SearchBar from "components/ui/Searchbar";
import "../../styles/views/Friends.scss";
import BaseElementFriends from "components/ui/FriendsContainer";
import Button from "components/ui/Button";

const Friends = () => {
  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body overflow-clip">
      <div className={"center-container"}>
        <Header/>
        <div className={"input-container"}>
          <SearchBar height="46px" width="600px" />
          <Button
            type={"regular"}
            width={"md"}
            name={"Add Friend"}>
          </Button>
          <Button
            type={"regular"}
            width={"md"}
            name={"Create Link"}>
          </Button>
        </div>
        <Title text="Friends" className="title" size="md"></Title>
        <BaseElementFriends width={"75vw"} height={"50vh"}/>
      </div>
    </BaseContainer>
  );
};

export default Friends;
