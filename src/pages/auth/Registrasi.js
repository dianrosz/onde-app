import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import "./auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import "./auth.css";
import logoblue from "../../assets/logoblue.png";
import regist from "../../assets/regist.png";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { toast } from "react-toastify";

const Registrasi = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Password yang anda masukan tidak sama");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success("Registrasi Berhasil");
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <>
      <section>
        <div className="registrasi">
          <div className="card">
            <div className="combate-regist">
              <div className="combate-satu">
                <div className="headTitle">
                  <h4>REGISTRASI</h4>
                </div>
                <Grid container style={{ justifyContent: "center" }}>
                  <Grid xs="8">
                    <form onSubmit={registerUser}>
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Email"
                        style={{ margin: "10px" }}
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                      />
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Password"
                        style={{ margin: "10px" }}
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                      />
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Konfirmasi Password"
                        style={{ margin: "10px" }}
                        type="password"
                        name="password"
                        value={cPassword}
                        onChange={(e) => setCPassword(e.target.value)}
                        fullWidth
                        required
                      />
                      <Button
                        variant="contained"
                        onClick={registerUser}
                        style={{ margin: "10px" }}
                        fullWidth
                        color="primary"
                        type="submit"
                      >
                        Registrasi
                      </Button>
                    </form>
                    <p>
                      Sudah punya Akun?
                      <Link to="/login"> Masuk Sekarang</Link>
                    </p>
                  </Grid>
                </Grid>
              </div>
              <div className="regist-dua">
                <img src={logoblue} alt="login-image" className="login-img" />
                <img src={regist} alt="login-image" className="login-img" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Registrasi;
