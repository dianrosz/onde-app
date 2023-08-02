/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from "react";
import "./listOrder.css";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { db } from "../../firebase/config";
import Swal from "sweetalert2";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function IsiListOrder() {
  const [cards, setCards] = useState([]);
  const empCollectionRef = collection(db, "pemesanan");
  const collectionRef = collection(db, "prosesPemesanan");
  const pCollectionRef = collection(db, "tolakPemesanan");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const moveItemToProses = async (itemId) => {
    try {
      const itemToMove = cards.find((card) => card.id === itemId);

      // Menggunakan collection dan doc dari firebase/firestore

      const docRef = doc(collectionRef, itemId);

      // Memindahkan data ke koleksi "proses"
      await setDoc(docRef, itemToMove);

      // Menghapus data dari koleksi "daftar"
      await deleteDoc(doc(empCollectionRef, itemId));
      navigate("/processOrder");

      Swal.fire({
        title: "Berhasil!",
        text: "Pemesanan Diterima",
        confirmButtonColor: "#de834e",
      });
    } catch (error) {
      toast.error("Error!");
    }
  };

  const handleNotProcess = async (itemId) => {
    try {
      const itemToMove = cards.find((card) => card.id === itemId);

      // Menggunakan collection dan doc dari firebase/firestore

      const docRef = doc(pCollectionRef, itemId);

      // Memindahkan data ke koleksi "proses"
      await setDoc(docRef, itemToMove);

      // Menghapus data dari koleksi "daftar"
      await deleteDoc(doc(empCollectionRef, itemId));
      navigate("/historyReject");
      Swal.fire({
        title: "Pemesanan ditolak",
        text: "Data pemesanan masuk riwayat ditolak",
        confirmButtonColor: "#de834e",
      });
    } catch (error) {
      toast.error("Error!");
    }
  };

  return (
    <>
      <Box height={10} />
      {cards.map((card) => {
        return (
          <Card sx={{ minWidth: 450, marginTop: 2 }}>
            <CardContent>
              <h5 class="card-title" key={card.id}>
                {card.layanan}
              </h5>
              <p class="card-text" key={card.id}>
                ID Transaksi : {card.id}
              </p>
              <p class="card-text" key={card.id}>
                Harga : {card.harga}
              </p>
              {card.pemesan && (
                <p class="card-text" key={card.id}>
                  Nama Pemesan : {card.pemesan}
                </p>
              )}
              {card.nama && (
                <p class="card-text" key={card.id}>
                  Atas Nama : {card.nama}
                </p>
              )}
              {card.handphone && (
                <p class="card-text" key={card.id}>
                  No. Handphone : {card.handphone}
                </p>
              )}
              {card.orderan && (
                <p class="card-text" key={card.id}>
                  Jumlah Orderan : {card.orderan}
                </p>
              )}

              {card.pengantaran && (
                <p class="card-text" key={card.id}>
                  Lokasi Pengantaran : {card.pengantaran}
                </p>
              )}
              {card.penjemputan && (
                <p class="card-text" key={card.id}>
                  Lokasi Penjemputan : {card.penjemputan}
                </p>
              )}
              {card.pengambilan && (
                <p class="card-text" key={card.id}>
                  Lokasi Pengambilan : {card.pengambilan}
                </p>
              )}
              {card.toko && (
                <p class="card-text" key={card.id}>
                  Nama Toko : {card.toko}
                </p>
              )}
              {card.pesanan && (
                <p class="card-text" key={card.id}>
                  Pesanan : {card.pesanan}
                </p>
              )}
              <p class="card-text" key={card.id}>
                Tanggal Transaksi : {card.tanggal}
              </p>
              {card.catatan && (
                <p class="card-text" key={card.id}>
                  Catatan : {card.catatan}
                </p>
              )}
            </CardContent>
            <CardActions sx={{ marginLeft: 1, marginBottom: 1 }}>
              <Button
                size="small"
                variant="contained"
                type="submit"
                onClick={() => moveItemToProses(card.id)}
                style={{ backgroundColor: "#DE834E" }}
              >
                Terima
              </Button>

              <Button
                size="small"
                variant="contained"
                type="submit"
                onClick={() => handleNotProcess(card.id)}
                style={{ backgroundColor: "#A61111" }}
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
