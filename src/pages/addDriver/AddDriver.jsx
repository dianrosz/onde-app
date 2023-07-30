/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextareaAutosize, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { db } from "../../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Sidebar, Header, Footer } from "../../components";

export default function AddDriver() {
  const [nama, setNama] = React.useState("");
  const [kontak, setKontak] = useState();
  const [plat, setPlat] = React.useState("");
  const [gender, setGender] = useState("");
  const [kendaraan, setKendaraan] = React.useState("");
  const [catatan, setCatatan] = React.useState("");
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "driver");

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

  const chooseKendaraan = [
    {
      value: "Mobil",
      label: "Mobil",
    },
    {
      value: "Motor",
      label: "Motor",
    },
  ];

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  const handleKontakChange = (event) => {
    setKontak(event.target.value);
  };

  const handlePlatChange = (event) => {
    setPlat(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleKendaraanChange = (event) => {
    setKendaraan(event.target.value);
  };

  const handleCatatanChange = (event) => {
    setCatatan(event.target.value);
  };

  const createUser = async () => {
    if (!nama || !kontak || !kendaraan || !gender || !plat) {
      toast.error("Lengkapi data terlebih dahulu");
    } else {
      await addDoc(empCollectionRef, {
        nama: nama,
        kontak: Number(kontak),
        kendaraan: kendaraan,
        gender: gender,
        plat: plat,
        catatan: catatan,
      });
      getUsers();
      Swal.fire({
        title: "Berhasil",
        text: "Data Driver Berhasil Tersimpan",
        confirmButtonColor: "#de834e",
      });
      navigate("/driver");
    }
  };

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <Sidebar>
      <Header />
      <section>
        <div className="order">
          <div className="judul">
            <h4>TAMBAH DRIVER</h4>
          </div>
          <div className="card">
            <div className="main-card">
              <div className="card-header">
                <h5>Tambah Data Driver</h5>
              </div>
              <div className="card-body">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Nama Lengkap Driver"
                      required
                      variant="outlined"
                      onChange={handleNamaChange}
                      value={nama}
                      sx={{ minWidth: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Jenis Kendaraan Driver"
                      variant="outlined"
                      select
                      required
                      onChange={handleKendaraanChange}
                      value={kendaraan}
                      sx={{ minWidth: "100%" }}
                    >
                      {chooseKendaraan.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
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
                      label="Kontak/No. Handphone"
                      type="number"
                      required
                      variant="outlined"
                      onChange={handleKontakChange}
                      value={kontak}
                      sx={{ minWidth: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Plat Nomor Kendaraan"
                      required
                      variant="outlined"
                      onChange={handlePlatChange}
                      value={plat}
                      sx={{ minWidth: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} align="Center">
                    <TextField
                      id="outlined-multiline-static"
                      label="Catatan"
                      multiline
                      onChange={handleCatatanChange}
                      value={catatan}
                      rows={4}
                      sx={{ minWidth: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" align="Right">
                      <Button
                        variant="contained"
                        onClick={createUser}
                        type="submit"
                        style={{
                          marginTop: "10px",
                          backgroundColor: "#DE834E",
                        }}
                      >
                        Daftarkan Driver
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
