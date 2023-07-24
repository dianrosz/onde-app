/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextareaAutosize, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { createUserWithEmailAndPassword } from "firebase/auth";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { db } from "../../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { Sidebar, Header, Footer } from "../../components";

export default function AddAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const chooseGender = [
    {
      value: "Laki-Laki",
      label: "Laki-Laki",
    },
    {
      value: "Perempuan",
      label: "Perempuan",
    },
  ];

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Pendaftaran berhasil
        const user = userCredential.user;
        toast.success("admin berhasil ditambahkan", user);
        navigate("/admin");
      })
      .catch((error) => {
        // Penanganan kesalahan

        toast.error(error);
      });
  };

  return (
    <Sidebar>
      <Header />
      <section>
        <div className="order">
          <div className="judul">
            <h4>TAMBAH ADMIN</h4>
          </div>
          <div className="card">
            <div className="main-card">
              <div className="card-header">
                <h5>Tambah Data Admin</h5>
              </div>
              <div className="card-body">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                      sx={{ minWidth: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Password"
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      variant="outlined"
                      sx={{ minWidth: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" align="Right">
                      <Button
                        variant="contained"
                        onClick={handleSignup}
                        type="submit"
                        style={{
                          marginTop: "10px",
                          backgroundColor: "#DE834E",
                        }}
                      >
                        Daftarkan Admin
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Sidebar>
  );
}
