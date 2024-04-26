import React from "react";
import Title from "components/ui/Title";
import "../../styles/views/Login.scss";
import BaseElement from "components/ui/Container";
import Input from "components/ui/Input";
import Button from "./Button";

const Register = () => {
  return (
    <div className={"center-container login-background"}>
      <div className={"container-container"}>
        <BaseElement width={750} height={570}>
          <div className={""}>
            <Title text="Welcome back!" className="site-title" size={"md"}></Title>
          </div>
          <label style={{fontWeight: 700}}>username:</label>
          <Input height={"50px"} width={"auto"} type={"text"}/>
          <label style={{fontWeight: 700}}>email:</label>
          <Input height={"50px"} width={"auto"} type={"text"}/>
          <label style={{fontWeight: 700}}>password:</label>
          <Input height={"50px"} width={"auto"} type={"password"} />
          <label style={{fontWeight: 700}}>confirm password:</label>
          <Input height={"50px"} width={"auto"} type={"password"} />
          <a style={{fontWeight: 700}}>forgot your password?</a>
          <div className={"login-button-container"}>
            <Button type={"login"} width={"lg"} name={"Login"}></Button>
          </div>
          <div>
            <p style={{fontWeight: 700}}>Don&apos;t have an account yet? </p>
            <a style={{fontWeight: 700}}>Register</a>
          </div>
        </BaseElement>
      </div>
    </div>
  );
};

export default Register;