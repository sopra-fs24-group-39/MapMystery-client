import { React } from 'react';
import { api, handleError } from "helpers/api";
import "../../styles/ui/NavDropDown.scss";
import "../../styles/views/Header.scss";
import { useNavigate } from "react-router-dom";
import Button from "components/ui/Button";

const NavDropDown = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const userId = localStorage.getItem("userId");
    const status = "OFFLINE";
    const token = localStorage.getItem("token");
    try {
      const requestBody = JSON.stringify({ status });
      const config = {
        headers: {
          Authorization: `${token}`
        }
      };
      const response = await api.put("/users/" + userId, requestBody, config);
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("lobby");
      localStorage.removeItem("gamemode");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login");
    } catch (e) {
      alert(e);
    }

    // put users/user_ID body: status: OFFLINE
  }

  function element() {
    if (localStorage.getItem("userId") !== null) {
      return (
        <div onClick={logout}>
          <a className={"menu-link nav-option"}>Logout</a>
        </div>
      );
    } else {
      return (
        <div>
          <p className={"grey"}>Logout</p>
        </div>
      );
    }
  }

  return(
    <div className={"dropdown p-4 rounded-md"}>
      <Button type={"login"} width={"md"} name={"Log out"} onClick={logout} />
    </div>
  );
}

export default NavDropDown;