import { React, useState} from "react";
import Title from "components/ui/Title";
import "../../styles/views/Login.scss";
import BaseElement from "components/ui/Container";
import Input from "components/ui/Input";
import Button from "./Button";

const formHandler = (stat) => {
  if (!stat) {
    return (
      <>
        <label style={{fontWeight: 700}}>username:</label>
        <Input height={"50px"} width={"auto"} type={"text"}/>
        <label style={{fontWeight: 700}}>password:</label>
        <Input height={"50px"} width={"auto"} type={"password"} />
      </>
    );
  } else {
    return (
      <>
        <label style={{fontWeight: 700}}>username:</label>
        <Input height={"50px"} width={"auto"} type={"text"}/>
        <label style={{fontWeight: 700}}>email:</label>
        <Input height={"50px"} width={"auto"} type={"text"}/>
        <label style={{fontWeight: 700}}>password:</label>
        <Input height={"50px"} width={"auto"} type={"password"} />
        <label style={{fontWeight: 700}}>confirm password:</label>
        <Input height={"50px"} width={"auto"} type={"password"} />
      </>
    );
  }
}

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const loginRegistryHandler = () => {
    if (isRegister === false) { setIsRegister(true) }
    else {setIsRegister(false)}
  }

  return (
      <div className={"center-container login-background"}>
        <div className={"container-container"}>
          <BaseElement width={750} height={570}>
            <div className={""}>
              <Title text="Welcome back!" className="site-title" size={"md"}></Title>
            </div>
            {formHandler(isRegister)}
            <a style={{fontWeight: 700}}>forgot your password?</a>
            <div className={"login-button-container flex"}>
              <Button type={"login"} width={"auto"} name={"Login"}></Button>
            </div>
            <div>
              <a style={{fontWeight: 700}} onClick={loginRegistryHandler}> {!isRegister && ("Don't have an account yet? Register")} {isRegister && ("I have an accout! Login")}</a>
            </div>
          </BaseElement>
        </div>
      </div>
  );
};

export default Login;