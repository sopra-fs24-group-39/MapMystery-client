import { React } from 'react';
import { api, handleError } from "helpers/api";
import "../../styles/ui/NavDropDown.scss";
import "../../styles/views/Header.scss";
import { useNavigate } from "react-router-dom";

const NavDropDown = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const userId = localStorage.getItem("userId");
    const status = "OFFLINE";
    try {
      const requestBody = JSON.stringify({status});
      const response = await api.post("/users/"+userId, requestBody);
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      navigate("/game");
    }
    catch (e) {
      alert(e);
    }

    // put users/user_ID body: status: OFFLINE
  }

  return(
    <div className={"bg-white p-4 rounded-md"}>
      <div onClick={logout}>
        <a className={"menu-link nav-option"}>Logout</a>
      </div>
    </div>
  );
}

export default NavDropDown;