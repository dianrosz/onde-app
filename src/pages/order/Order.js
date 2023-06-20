/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import "./order.css";

const Order = () => {
  const chooseLayanan = [
    {
      value: "Antar Jemput",
      label: "Antar Jemput",
    },
    {
      Value: "Pesan Makanan",
      label: "Pesan Makanan",
    },
    {
      value: "Antar Kirim Barang",
      label: "Antar Kirim Barang",
    },
  ];
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
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="No. Handphone"
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    select
                    label="Kategori Layanan"
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  >
                    {" "}
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
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Lokasi Pengantaran"
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Pesanan"
                    multiline
                    rows={4}
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                    <Button
                      variant="contained" //onClick={createUser}
                    >
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
};
export default Order;
