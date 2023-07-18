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
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function IsiListOrder() {
  const [cards, setCards] = useState([]);
  const empCollectionRef = collection(db, "pemesanan");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(empCollectionRef);
      setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const handleProcess = async (id) => {
    try {
      await db
        .collection("pemesanan")
        .doc(id)
        .set({ status: "di proses" }, { merge: true });
      navigate("/processOrder");
    } catch (error) {
      toast.error("error!");
    }
  };

  const handleNotProcess = async (id) => {
    try {
      const docRef = db.collection("pemesanan").doc(id);
      const doc = await getDocs(docRef);

      if (doc.exists()) {
        await updateDoc(docRef, { status: "tidak proses" });
        navigate("/historyOrder");
      } else {
        toast.error("error!");
      }
    } catch (error) {
      toast.error("error!");
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
              <p class="card-text" key={card.id}>
                Nama Pemesan : {card.pemesan}
              </p>
              <p class="card-text" key={card.id}>
                No. Handphone : {card.handphone}
              </p>
              <p class="card-text" key={card.id}>
                Lokasi Pengantaran : {card.pengantaran}
              </p>
              <p class="card-text" key={card.id}>
                Lokasi Pengambilan : {card.pengambilan}
              </p>
              <p class="card-text" key={card.id}>
                Tanggal Transaksi : {card.tanggal}
              </p>
              <p class="card-text" key={card.id}>
                Catatan pemesanan: {card.Catatan}
              </p>
            </CardContent>
            <CardActions sx={{ marginLeft: 1, marginBottom: 1 }}>
              <Button
                size="small"
                variant="contained"
                type="submit"
                onClick={() => handleProcess(card.id)}
                style={{ backgroundColor: "#DE834E" }}
              >
                Terima
              </Button>

              <Button
                size="small"
                variant="contained"
                type="submit"
                onClick={handleNotProcess}
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
