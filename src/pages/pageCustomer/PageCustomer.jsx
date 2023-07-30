import React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { TextField, Grid } from "@mui/material";
import "./pageCustomer.css";
import { useParams } from "react-router-dom";

import { db } from "../../firebase/config";

export default function PageCustomer() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    // Query untuk mengambil data individu berdasarkan ID dari Firestore atau Realtime Database
    const fetchData = async () => {
      try {
        const docRef = doc(collection(db, "prosesPemesanan"), id); // Ganti 'tabel' dengan nama koleksi yang sesuai
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setError(new Error("Data tidak ditemukan"));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const q = query(collection(db, "prosesPemesanan"), where("id", "==", id));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messagesData = [];
        snapshot.forEach((doc) => {
          messagesData.push({ id: doc.id, ...doc.data() });
        });

        setMessages(messagesData);
      },
      (error) => {
        setError(error);
      }
    );

    fetchData();
    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="pageCustomer">
      {data ? (
        <div className="card card-customer center">
          <div className="main-card">
            <div className="card-header">
              <h4 style={{ color: "#a3423b" }}>Daftar Pesanan</h4>
            </div>
            <div className="card-body">
              <div>
                <Grid container spacing={2}>
                  {data.layanan && (
                    <TextField
                      value={data.layanan}
                      id="outlined-read-only-input"
                      sx={{
                        width: "100%",
                        marginLeft: "18px",
                        marginTop: "12px",
                      }}
                      label="Kategori Layanan"
                      defaultValue="Kategori Layanan"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                  {data.pemesan && (
                    <TextField
                      value={data.pemesan}
                      id="outlined-read-only-input"
                      sx={{
                        width: "100%",
                        marginLeft: "18px",
                        marginTop: "12px",
                      }}
                      label="Nama Pemesan"
                      defaultValue="Nama Pemesan"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                  {data.nama && (
                    <TextField
                      value={data.nama}
                      id="outlined-read-only-input"
                      sx={{
                        width: "100%",
                        marginLeft: "18px",
                        marginTop: "12px",
                      }}
                      label="Nama Pemesan"
                      defaultValue="Nama Pemesan"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                  <TextField
                    value={data.harga}
                    id="outlined-read-only-input"
                    sx={{
                      width: "100%",
                      marginLeft: "18px",
                      marginTop: "12px",
                    }}
                    label="Harga"
                    defaultValue="harga"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {data.toko && (
                    <TextField
                      value={data.toko}
                      id="outlined-read-only-input"
                      sx={{
                        width: "100%",
                        marginLeft: "18px",
                        marginTop: "12px",
                      }}
                      label="Nama Toko"
                      defaultValue="toko"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                  {data.penjemputan && (
                    <TextField
                      value={data.penjemputan}
                      id="outlined-read-only-input"
                      sx={{
                        width: "100%",
                        marginLeft: "18px",
                        marginTop: "12px",
                      }}
                      label="Lokasi Penjemputan"
                      defaultValue="Lokasi Penjemputan"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                  {data.pengambilan && (
                    <TextField
                      value={data.pengambilan}
                      id="outlined-read-only-input"
                      sx={{
                        width: "100%",
                        marginLeft: "18px",
                        marginTop: "12px",
                      }}
                      label="Lokasi Pengambilan"
                      defaultValue="Lokasi Pengambilan"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}

                  {data.pesanan && (
                    <TextField
                      value={data.pesanan}
                      id="outlined-read-only-input"
                      multiline
                      maxRows={4}
                      sx={{
                        width: "100%",
                        marginLeft: "18px",
                        marginTop: "12px",
                      }}
                      label="Daftar Pesanan"
                      defaultValue="Daftar Pesanan"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                  {data.pengantaran && (
                    <TextField
                      value={data.pengantaran}
                      id="outlined-read-only-input"
                      sx={{
                        width: "100%",
                        marginLeft: "18px",
                        marginTop: "12px",
                      }}
                      label="Lokasi Pengantaran"
                      defaultValue="Lokasi Pengantaran"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                  {data.tanggal && (
                    <TextField
                      value={data.tanggal}
                      id="outlined-read-only-input"
                      sx={{
                        width: "100%",
                        marginLeft: "18px",
                        marginTop: "12px",
                      }}
                      label="Tanggal Pesanan"
                      defaultValue="Tanggal Pesanan"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                </Grid>
                {/* Tampilkan data individu lainnya sesuai struktur tabel */}
                <div>
                  <h4 style={{ color: "#a3423b", margin: "8px" }}>
                    Progress Driver
                  </h4>
                  {messages.length > 0 ? (
                    <Grid>
                      {messages.map((message) => (
                        <p key={message.id}>
                          <p>
                            Driver sedang dalam status:
                            <Grid item xs={12}>
                              <TextField
                                id="outlined-read-only-input"
                                InputProps={{
                                  readOnly: true,
                                }}
                                sx={{ margin: "7px" }}
                                value={message.status}
                              />
                            </Grid>
                          </p>
                        </p>
                      ))}
                    </Grid>
                  ) : (
                    <p>
                      Tidak ada driver dalam perjalanan menuju atau sudah sampai
                      lokasi.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Data tidak ditemukan.</p>
      )}
    </div>
  );
}
