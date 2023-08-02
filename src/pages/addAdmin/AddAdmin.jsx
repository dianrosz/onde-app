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
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { Sidebar, Header, Footer } from "../../components";

export default function AddAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

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

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSignUp = async () => {
    if (!email || !name || !password || !gender) {
      toast.error("isi data terlebih dahulu");
    } else {
      try {
        // Membuat akun pengguna melalui Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (userCredential.user) {
          localStorage.setItem("user", JSON.stringify(userCredential.user));
        } else {
          console.log("Data pengguna tidak valid.");
        }

        toast.success("Berhasil menambahkan admin");
        // Mendapatkan UID dari pengguna yang baru dibuat
        const { uid } = userCredential.user;

        // Menyimpan nama dan email pengguna dalam dokumen individual di Firestore
        const userDocRef = doc(db, "admin", uid);
        await setDoc(userDocRef, {
          name: name,
          email: email,
          gender: gender,
          password: password,
        });

        navigate("/admin");

        // Registrasi berhasil
      } catch (error) {
        toast.error("error!");
      }
    }
  };

  const verifyCode = () => {
    // Kode verifikasi yang valid yang harus disesuaikan dengan kode yang Anda berikan.
    const validCode = "8765432";

    if (!verificationCode) {
      toast.error("Verifikasi Kode Terlebih Dahulu");
    } else {
      if (verificationCode === validCode) {
        // Kode verifikasi cocok, lanjutkan dengan penambahan admin.
        handleSignUp();
        toast.success("Verifikasi Kode Berhasil");
      } else {
        // Kode verifikasi tidak cocok, beri tahu pengguna tentang kesalahan.
        toast.error("Verifikasi Kode Tidak Berhasil");
      }
    }
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
                      label="Nama Lengkap"
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      variant="outlined"
                      sx={{ minWidth: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      select
                      label="Jenis Kelamin"
                      required
                      variant="outlined"
                      onChange={handleGenderChange}
                      value={gender}
                      sx={{ minWidth: "100%" }}
                    >
                      {chooseGender.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
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
                    <p style={{ fontStyle: "italic", margin: "none" }}>
                      *Silahkan masukan verifikasi kode terlebih dahulu untuk
                      mendaftarkan admin*
                    </p>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Verifikasi Kode"
                      required
                      type="password"
                      helperText=" *Silahkan masukan verifikasi kode terlebih dahulu untuk
                      mendaftarkan admin*"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      variant="outlined"
                      sx={{ minWidth: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" align="Right">
                      <Button
                        variant="contained"
                        onClick={verifyCode}
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
