/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import InputAdornment from "@mui/material/InputAdornment";
import { db } from "../../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function AddDriver({ closeEvent }) {
  const [nama, setNama] = React.useState("");
  const [kontak, setKontak] = useState(0);
  const [plat, setPlat] = React.useState("");
  const [gender, setGender] = useState("");
  const [kendaraan, setKendaraan] = useState("");
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "driver");

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

  const createUser = async () => {
    await addDoc(empCollectionRef, {
      nama: nama,
      kontak: Number(kontak),
    });
    getUsers();
    Swal.fire("Berhasil", "TErsimpan");
  };

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <section>
      <div className="order">
        <div className="judul">
          <h4>Tambah Driver</h4>
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
                    label="nama"
                    variant="outlined"
                    onChange={handleNamaChange}
                    value={nama}
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Jenis Kendaraan"
                    variant="outlined"
                    onChange={handleKendaraanChange}
                    value={kendaraan}
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    select
                    label="Jenis Kelamin"
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
                    label="kontak"
                    type="number"
                    variant="outlined"
                    onChange={handleKontakChange}
                    value={kontak}
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="plat"
                    variant="outlined"
                    onChange={handlePlatChange}
                    value={plat}
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                    <Button variant="contained" onClick={createUser}>
                      Submit
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
