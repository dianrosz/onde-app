/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { db } from "../../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import "./order.css";
import Swal from "sweetalert2";

const Order = () => {
  const [namaPemesan, setNamaPemesan] = React.useState("");
  const [kontakPemesan, setKontakPemesan] = useState(0);
  const [lokasiPenjemputan, setLokasiPenjemputan] = React.useState("");
  const [kategoriLayanan, setKategoriLayanan] = useState("");
  const [lokasiPengantaran, setLokasiPengantaran] = React.useState("");
  const [pesanan, setPesanan] = React.useState("");
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "pemesanan");

  const navigate = useNavigate();

  const chooseLayanan = [
    {
      value: "Antar Jemput",
      label: "Antar Jemput",
    },
    {
      value: "Antar Kirim Barang",
      label: "Antar Kirim Barang",
    },
    {
      value: "Pesan Makanan",
      label: "Pesan Makanan",
    },
  ];

  const handleNamaPemesananChange = (event) => {
    setNamaPemesan(event.target.value);
  };

  const handleKontakPemesanChange = (event) => {
    setKontakPemesan(event.target.value);
  };

  const handleKategoriLayananChange = (event) => {
    setKategoriLayanan(event.target.value);
  };

  const handleLokasiPenjemputanChange = (event) => {
    setLokasiPenjemputan(event.target.value);
  };

  const handleLokasiPengantaranChange = (event) => {
    setLokasiPengantaran(event.target.value);
  };

  const handlePesananChange = (event) => {
    setPesanan(event.target.value);
  };

  const createPemesan = async () => {
    await addDoc(empCollectionRef, {
      namaPemesan: namaPemesan,
      kontakPemesan: Number(kontakPemesan),
      kategoriLayanan: kategoriLayanan,
      lokasiPenjemputan: lokasiPenjemputan,
      lokasiPengantaran: lokasiPengantaran,
      pesanan: pesanan,
    });
    getUsers();
    Swal.fire("Berhasil", "Pesanan Berhasil ditambahkan");
    navigate("/listOrder");
  };

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <section>
      <div className="order">
        <div className="judul">
          <h4>PEMESANAN</h4>
        </div>
        <div className="card">
          <div className="main-card">
            <div className="card-header">
              <h5>Pemesanan</h5>
            </div>
            <div className="card-body">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Nama Pemesan"
                    variant="outlined"
                    onChange={handleNamaPemesananChange}
                    value={namaPemesan}
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="No. Handphone"
                    onChange={handleKontakPemesanChange}
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    select
                    onChange={handleKategoriLayananChange}
                    label="Kategori Layanan"
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  >
                    {chooseLayanan.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Lokasi Penjemputan"
                    onChange={handleLokasiPenjemputanChange}
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Lokasi Pengantaran"
                    onChange={handleLokasiPengantaranChange}
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    onChange={handlePesananChange}
                    label="Pesanan"
                    multiline
                    rows={4}
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" align="right">
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ marginTop: "10px", backgroundColor: "#08376b" }}
                      onClick={createPemesan}
                    >
                      tambah pemesanan
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
};
export default Order;
