/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from "react";
import "./listOrder.css";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Autocomplete, TextField } from "@mui/material";

export default function IsiListOrder() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [cards, setCards] = useState([]);
  const empCollectionRef = collection(db, "pemesanan");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteDriver = (id) => {
    Swal.fire({
      title: "Kamu Yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "Peringatan",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "driver", id);
    await deleteDoc(userDoc);
    Swal.fire("Terhapus!", "Filemu Berhasil Terhapus!", "Berhasil");
    getUsers();
  };

  const filterData = (v) => {
    if (v) {
      setCards([v]);
    } else {
      setCards([]);
      getUsers();
    }
  };

  return (
    <>
      <Box height={10} />
      <Stack direction="row" spacing={2} className="my-2 mb-2 m-2">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={cards}
          sx={{ width: 300 }}
          onChange={(e, v) => filterData(v)}
          getOptionLabel={(cards) => cards.kategoriLayanan || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="Search Daftar Pemesanan"
            />
          )}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Button
          size="small"
          variant="contained"
          type="submit"
          style={{ backgroundColor: "#08376b" }}
        >
          Pilih Kategori
        </Button>
      </Stack>
      <Box height={10} />
      {cards.map((card) => {
        return (
          <Card sx={{ minWidth: 450, marginTop: 3 }}>
            <CardContent>
              <h5 class="card-title" key={card.id}>
                {card.kategoriLayanan}
              </h5>
              <p class="card-text" key={card.id}>
                ID Transaksi : {card.id}
              </p>
              <p class="card-text" key={card.id}>
                Nama Pemesan : {card.namaPemesan}
              </p>
              <p class="card-text" key={card.id}>
                No. Handphone : {card.kontakPemesan}
              </p>
              <p class="card-text" key={card.id}>
                Lokasi Pengantaran : {card.lokasiPengantaran}
              </p>
              <p class="card-text" key={card.id}>
                Lokasi Penjemputan : {card.lokasiPenjemputan}
              </p>
              <p class="card-text" key={card.id}>
                Pesanan : {card.pesanan}
              </p>
            </CardContent>
            <CardActions sx={{ marginLeft: 1, marginBottom: 1 }}>
              <Button
                size="small"
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#08376b" }}
              >
                Terima
              </Button>

              <Button
                size="small"
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#35C0ED" }}
              >
                Tolak
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}
