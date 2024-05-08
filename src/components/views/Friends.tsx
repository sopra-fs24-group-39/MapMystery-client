import React, { useState, useEffect } from "react";
import BaseContainer from "components/ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import Header from "components/views/Header";
import Title from "components/ui/Title";
import SearchBar from "components/ui/Searchbar";
import "../../styles/views/Friends.scss";
import BaseElementFriends from "components/ui/FriendsContainer";
import BaseElementFriends2 from "components/ui/FriendRequestsContainer";
import Button from "components/ui/Button";
import RoundButton from "components/ui/NotificationIcon";
import { api, handleError } from "helpers/api";

const Friends = () => {
  const [showFriends, setShowFriends] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [friendsNum, setFriendsNum] = useState([]);

  useEffect(() => {
    getFriendRequests();
    const intervalId = setInterval(() => {
      getFriendRequests();
    }, 120000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleShowFriends = () => {
    setShowFriends(!showFriends);
    setSearchValue("");
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.trim());
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log(searchValue);
      addFriend(searchValue);
      setSearchValue("");
    }
  }

  const handleAddButton = () => {
    console.log("Add button clicked");
    addFriend(searchValue);
    setSearchValue("");
  }

  async function addFriend(username: string) {
    if (username === "" || username === localStorage.getItem("username")) {
      console.log("Invalid username", username === localStorage.getItem("username"));
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      };
      const requestBody = JSON.stringify({ username });
      const response = await api.put(`/friends/${localStorage.getItem("userId")}`, requestBody, { headers });
      console.log(response);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        alert("User not found");
      } else {
        console.error(error);
      }
    }
  }

  async function getFriendRequests() {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        'Authorization': `${token}`
      };
      const response = await api.get(`/friends/friendrequests/${localStorage.getItem("userId")}`, { headers });
      if (response.data && response.data.friendrequests) {
        setFriendsNum(response.data.friendrequests.map(request => ({ name: request })));
      }
      console.log(response);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header/>
        <div className={"input-container"}>
          <SearchBar
            height="46px"
            width="600px"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <Button
            type={"regular"}
            width={"md"}
            name={"Add Friend"}
            onClick={handleAddButton}>
          </Button>
          <Button
            type={"regular"}
            width={"md"}
            name={"Create Link"}>
          </Button>
          {showFriends ?
            <RoundButton
              width="md"
              onClick={toggleShowFriends}
              icon="AddIcon"
              notificationCount={friendsNum.length}
            />
            :
            <RoundButton
              width="md"
              onClick={toggleShowFriends}
              icon="BackIcon"
            />
          }
        </div>
        {showFriends ?
          <Title text="Friends" className="title"></Title>
          :
          <Title text="Friend Requests" className="title" size={"md"}></Title>
        }
        <div className={"container-container2"}>
         {showFriends ?
           <BaseElementFriends width={1000} height={570}/>
            :
           <BaseElementFriends2
             width={500}
             height={570}
           />
         }
        </div>
      </div>
    </BaseContainer>
  );
};

export default Friends;
