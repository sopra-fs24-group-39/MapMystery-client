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
    <div className={"bg-white p-4 rounded-md"}>
      { element() }
    </div>
  );
}

export default NavDropDown;