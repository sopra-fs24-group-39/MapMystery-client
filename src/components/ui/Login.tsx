import { React, useState} from "react";
import Title from "components/ui/Title";
import "../../styles/views/Login.scss";
import BaseElement from "components/ui/Container";
import Input from "components/ui/Input";
import Button from "./Button";
import {useNavigate, Link} from "react-router-dom";
import { api, handleError } from "helpers/api";
import User from "models/User";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState<string>(null);
  const [userEmail, setUserEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
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
          <label style={{fontWeight: 700}}>email:</label>
          <Input height={"50px"} width={"auto"}
                 type={"text"}
                 value={userEmail}
                 onChange={(em) => (setUserEmail(em))}
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
                 type={"text"}
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
                 value={password}
                 onChange={(p) => (setPassword(p))}
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
    try {
      const requestBody = JSON.stringify({ username, userEmail, password });
      const response = await api.post("/users", requestBody);
      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem("token", user.token);
      localStorage.setItem("userId", user.userId);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      navigate("/game");
    } catch (error) {
      setError(error);
    }
  }

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, userEmail, password });
      console.log(requestBody);
      const response = await api.put("/users/login", requestBody);
      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem("token", user.token);
      localStorage.setItem("userId", user.userId);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      navigate("/game");
    } catch (error) {
      setError(error);
    }
  }

  return (
      <div className={"center-container login-background"}>
        <div className={"container-container"}>
          <BaseElement width={750} height={570}>
            <div className={""}>
              <Title text="Welcome back!" className="site-title" size={"md"}></Title>
            </div>
            {formSelector(isRegister)}
            <div className={"login-button-container flex"}
                 onClick={() => formActionHandler()}>
              {isRegister && <Button type={"login"}
                                      width={"auto"}
                                      name={"Register"}>
              </Button>}
              {!isRegister && <Button type={"login"}
                                       width={"auto"}
                                       name={"Login"}>
              </Button>}
            </div>
            <div>
              <a style={{fontWeight: 700}} onClick={loginRegistryHandler}> {!isRegister && ("Don't have an account yet? Register")} {isRegister && ("I have an accout! Login")}</a>
            </div>
            <Link to={"/"}>Close</Link>
            {error ? <p>Ooops: {error.message}</p> : null}
          </BaseElement>
        </div>
      </div>
  );
};

export default Login;