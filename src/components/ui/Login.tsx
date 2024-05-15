import { React, useState} from "react";
import Title from "components/ui/Title";
import "../../styles/views/Login.scss";
import BaseElement from "components/ui/Container";
import Input from "components/ui/Input";
import Button from "./Button";
import {useNavigate, Link} from "react-router-dom";
import { api, handleError } from "helpers/api";
import User from "models/User";
import ErrorMsg from "./ErrorMsg";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [error, setError] = useState<string>(null);

  const navigate = useNavigate();
  const loginRegistryHandler = () => {
    if (isRegister === false) { setIsRegister(true) }
    else {setIsRegister(false)}
  }

  const formSelector = (stat) => {
    if (!stat) {
      return (
        <>
          <label style={{fontWeight: 700}}>username:</label>
          <Input height={"50px"} width={"auto"}
                 type={"text"}
                 value={username}
                 onChange={(un) => (setUsername(un))}
          />
          <label style={{fontWeight: 700}}>password:</label>
          <Input height={"50px"} width={"auto"}
                 type={"password"}
                 value={password}
                 onChange={(p) => (setPassword(p))}
          />
        </>
      );
    } else {
      return (
        <>
          <label style={{fontWeight: 700}}>username:</label>
          <Input height={"50px"} width={"auto"}
                 type={"text"}
                 value={username}
                 onChange={(un) => (setUsername(un))}
          />
          <label style={{fontWeight: 700}}>email:</label>
          <Input height={"50px"} width={"auto"}
                 type={"email"}
                 value={userEmail}
                 onChange={(em) => (setUserEmail(em))}
          />
          <label style={{fontWeight: 700}}>password:</label>
          <Input height={"50px"} width={"auto"}
                 type={"password"}
                 value={password}
                 onChange={(p) => (setPassword(p))}
          />
          <label style={{fontWeight: 700}}>confirm password:</label>
          <Input height={"50px"} width={"auto"}
                 type={"password"}
                 value={confPassword}
                 onChange={(cp) => (setConfPassword(cp))}
          />
        </>
      );
    }
  }

  const formActionHandler = () => {
    if (isRegister) {
      doRegister();
    } else {
      doLogin();
    }
  }

  const doRegister = async () => {
    if (confPassword === password) {
      try {
        const requestBody = JSON.stringify({ username, userEmail, password });
        const response1 = await api.post("/users", requestBody);
        // Get the returned user and update a new object.
        const response2 = await api.put("/users/login", requestBody);
        const user = new User(response2.data.user);
        const token = response2.data.token;

        // Store the token into the local storage.
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);

        console.log(localStorage.getItem("token"))
        console.log(localStorage.getItem("userId"))
        console.log(localStorage.getItem("username"))


        // Login successfully worked --> navigate to the route /game in the GameRouter
        navigate("/game");
      } catch (e) {
        setError(e.response.data.message);
      }
    } else {
      setError("Passwords do not match");
    }
  }

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, userEmail, password });
      const response = await api.put("/users/login", requestBody);
      // Get the returned user and update a new object.
      const user = new User(response.data.user);
      const token = response.data.token;

      // Store the token into the local storage.
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("username", user.username);

      console.log(localStorage.getItem("token"))
      console.log(localStorage.getItem("userId"))
      console.log(localStorage.getItem("username"))

      // Login successfully worked --> navigate to the route /game in the GameRouter
      navigate("/game");
    } catch (e) {
      setError(e.response.data.message);
    }
  }

  return (
      <div className={"center-container login-background"}>
        <div className={"container-containe overflow-scroll"}>
          <BaseElement width={"77vw"} height={"55vh"}>
            <div className={"flex flex-row justify-end"}>
              <Link to={"/"}>X</Link>
            </div>
            <div className={""}>
              <Title text="Welcome back!" className="site-title" size={"md"}></Title>
            </div>
            {formSelector(isRegister)}
            <div className={"login-button-container flex"}
                 onClick={() => formActionHandler()}>
              {isRegister && <Button type={"login"}
                                      width={"lg"}
                                      name={"Register"}>
              </Button>}
              {!isRegister && <Button type={"login"}
                                       width={"lg"}
                                       name={"Login"}>
              </Button>}
            </div>
            <div>
              <a className="register-login-link" style={{fontWeight: 700}} onClick={loginRegistryHandler}> {!isRegister && ("Don't have an account yet? Register")} {isRegister && ("Already got an account! Login")}</a>
            </div>
            {error && <ErrorMsg text={error}></ErrorMsg>}
          </BaseElement>
        </div>
      </div>
  );
};

export default Login;