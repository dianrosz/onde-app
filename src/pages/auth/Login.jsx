/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import "./auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import loginIMG from "../../assets/loginIMG.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login Berhasil");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <section>
      <div className="login">
        <Grid className="card-login">
          <div className="combate-login">
            <div className="combate-satu">
              <div className="headTitle">
                <h4>LOGIN</h4>
              </div>
              <Grid
                container
                style={{ justifyContent: "center", marginTop: "15px" }}
              >
                <Grid xs="8">
                  <form onSubmit={loginUser}>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="email"
                      label="Email"
                      style={{ margin: "15px" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      fullWidth
                      required
                    />
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Password"
                      style={{ margin: "15px" }}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      fullWidth
                      required
                    />
                    <Button
                      variant="contained"
                      style={{ margin: "15px" }}
                      onClick={loginUser}
                      fullWidth
                      color="#DE834E"
                      type="submit"
                    >
                      LOGIN
                    </Button>
                  </form>
                </Grid>
              </Grid>
            </div>
            <div className="regist-dua">
              <img src={loginIMG} alt="login-image" className="login-img" />
            </div>
          </div>
        </Grid>
      </div>
    </section>
  );
};
export default Login;
