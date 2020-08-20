import React, { useState } from "react";
import NongBuaLogo from "../../assets/nong-bua-logo.png";
import { Alert } from "@material-ui/lab";
import "./login.scss";
import { TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { loginWithEmailAndPassword } from "../../actions/user";
import { useHistory } from "react-router-dom";
const Login = ({ loginFail, dispatch, userInfo, isAdmin }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailPasswordValid = () => {
    return email !== "" && password !== "";
  };

  const onClickLogin = () => {
    dispatch(loginWithEmailAndPassword({ email, password }));
    if (userInfo && isAdmin) {
      history.replace("/management");
    }
  };

  return (
    <div className="login-page row">
      <div className="col logo">
        <img src={NongBuaLogo} alt="" />
        <h1 className="toppick">Nong Bua</h1>
      </div>
      <div className="col login-form">
        <h1 className="toppick">เข้าสู่ระบบ</h1>
        <TextField
          onKeyUp={(event) => setEmail(event.target.value)}
          label="Email"
          type="text"
          variant="outlined"
        />
        <TextField
          onKeyUp={(event) => setPassword(event.target.value)}
          label="Password"
          type="password"
          variant="outlined"
        />
        <Button
          variant="outlined"
          disabled={!isEmailPasswordValid()}
          className="green-solid-button login-button"
          onClick={onClickLogin}
        >
          เข้าสู่ระบบ
        </Button>
        {loginFail ? (
          <Alert variant="outlined" severity="error">
            ไม่สามารถเข้าสู่ระบบได้, กรุณาตรวจสอบ Email และ Password อีกครั้ง
          </Alert>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loginFail: state.userRole.loginFail,
  userInfo: state.userRole.userInfo,
  isAdmin: state.userRole.isAdmin,
});

export default connect(mapStateToProps)(Login);
