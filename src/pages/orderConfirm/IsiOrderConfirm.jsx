import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import { addDoc, onSnapshot } from "firebase/firestore";

export default function IsiOrderConfirm() {
  const [cards, setCards] = useState([]);
  const [harga, setHarga] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);
  const empCollectionRef = collection(db, "pemesanan");
  const empCollection = collection(db, "konfirmasiPemesanan");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onSnapshot(
        collection(db, "driver"),
        (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            value: doc.id,
            label: doc.data().nama,
          }));

          setOptions(data);
        }
      );

      return () => unsubscribe();
    };

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleHargaChange = (event) => {
    setHarga(event.target.value);
  };

  const createHarga = async () => {
    if (selectedValue === "") {
      toast.error("Pilih Driver terlebih dahulu");
    } else {
      await addDoc(empCollection, {
        harga: harga,
        nama: selectedValue,
      });
      getUsers();
      Swal.fire("Berhasil", "Pesanan berhasil ditambahkan");
      navigate("/processOrder");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <>
      <Box height={10} />
      {cards.map((card) => {
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} key={card.id}>
              <TextField
                value={card.layanan}
                id="outlined-read-only-input"
                sx={{ minWidth: "100%" }}
                label="Kategori Layanan"
                defaultValue="Kategori Layanan"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} key={card.id}>
              <TextField
                value={card.id}
                id="outlined-read-only-input"
                label="ID Transaksi"
                defaultValue="ID Transaksi"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ minWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6} key={card.id}>
              <TextField
                value={card.pemesan}
                id="outlined-read-only-input"
                label="Nama Pemesan"
                defaultValue="Nama Pemesan"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ minWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                key={card.id}
                value={card.handphone}
                id="outlined-read-only-input"
                label="No.Handphone"
                defaultValue="No.Handphone"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ minWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6} key={card.id}>
              <TextField
                value={card.pengantaran}
                id="outlined-read-only-input"
                label="Alamat Pengantaran"
                defaultValue="Alamat Pengantaran"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ minWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6} key={card.id}>
              <TextField
                value={card.pengambilan}
                id="outlined-read-only-input"
                label="Alamat Pengambilan"
                defaultValue="Alamat Pengambilan"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ minWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6} key={card.id}>
              <TextField
                value={card.Catatan}
                id="outlined-read-only-input"
                label="Catatan Pemesanan"
                defaultValue="Catatan Pemesanan"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ minWidth: "100%" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Konfirmasi Harga"
                required
                variant="outlined"
                onChange={handleHargaChange}
                value={harga}
                sx={{ minWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                select
                required
                label="Pilih Driver"
                variant="outlined"
                value={selectedValue}
                onChange={handleSelectChange}
                sx={{ minWidth: "100%" }}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" align="right">
                <Button
                  variant="contained"
                  type="submit"
                  style={{ marginTop: "10px", backgroundColor: "#DE834E" }}
                  onClick={createHarga}
                >
                  Buat Pemesanan
                </Button>
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}
