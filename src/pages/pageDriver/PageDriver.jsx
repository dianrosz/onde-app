import React from "react";
import { useState, useEffect } from "react";
import {
  deleteDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { TextField, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./pageDriver.css";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { Footer } from "../../components";

export default function PageDriver({ progressId }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState("");
  const [menujuLokasiClicked, setMenujuLokasiClicked] = useState(false);
  const [sampaiLokasiClicked, setSampaiLokasiClicked] = useState(false);
  const [showPesananSelesaiButton, setShowPesananSelesaiButton] =
    useState(false);

  const { id } = useParams();
  useEffect(() => {
    // Query untuk mengambil data individu berdasarkan ID dari Firestore atau Realtime Database
    const fetchData = async () => {
      try {
        const docRef = doc(collection(db, "prosesPemesanan"), id); // Ganti 'tabel' dengan nama koleksi yang sesuai
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
          setShowPesananSelesaiButton(
            docSnap.data().status === "Sampai Lokasi"
          );
        } else {
          setError(new Error("Data tidak ditemukan"));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleMenujuLokasi = async () => {
    // Tambahkan kode untuk tindakan saat tombol "Menuju Lokasi" diklik
    try {
      if (!menujuLokasiClicked) {
        const docRef = doc(collection(db, "prosesPemesanan"), id);
        await updateDoc(docRef, {
          status: "Menuju Lokasi",
          timestamp: serverTimestamp(),
        });
        setMenujuLokasiClicked(true);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleSampaiLokasi = async () => {
    // Tambahkan kode untuk tindakan saat tombol "Sampai Lokasi" diklik
    try {
      if (!sampaiLokasiClicked) {
        const docRef = doc(collection(db, "prosesPemesanan"), id);
        await updateDoc(docRef, {
          status: "Sampai Lokasi",
          timestamp: serverTimestamp(),
        });
        setSampaiLokasiClicked(true);
        setShowPesananSelesaiButton(true);
      }
    } catch (error) {
      setError(error);
    }
  };

  const history = useNavigate();

  const handlePesananSelesai = async () => {
    try {
      const docRef = doc(collection(db, "pemesananSelesai"), id); // Ganti 'selesai' dengan nama koleksi yang Anda inginkan untuk pesanan yang selesai
      await setDoc(docRef, {
        ...data,
        status: "Selesai",
        timestamp: serverTimestamp(),
      });

      // Pindahkan data dari koleksi 'drivers' ke koleksi 'hari ini'
      const hariIniRef = doc(collection(db, "pemesananHariIni"), id); // Ganti 'hari ini' dengan nama koleksi yang Anda inginkan untuk pesanan hari ini
      await setDoc(hariIniRef, {
        ...data,
        timestamp: serverTimestamp(),
      });

      // Hapus data dari koleksi 'drivers' karena data telah dipindahkan
      const driversRef = doc(collection(db, "prosesPemesanan"), id);
      await deleteDoc(driversRef);

      localStorage.setItem("driverSelesai", JSON.stringify(data));
      // Arahkan pengguna ke halaman selesai
      history("/finishPage");
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  //button progress

  return (
    <>
      <div className="pageDriver">
        {data ? (
          <div className="card card-driver center">
            <div className="main-card">
              <div className="card-header">
                <h4 style={{ color: "#a3423b" }}>DAFTAR PESANAN</h4>
              </div>
              <div className="card-body">
                <Grid container spacing={2}>
                  {data.pemesan && (
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

                  {/* Tampilkan data individu lainnya sesuai struktur tabel */}

                  <div id="progress">
                    <Button
                      size="large"
                      variant="contained"
                      type="submit"
                      style={{
                        backgroundColor: "#DE834E",
                        color: "black",
                        margin: "6px",
                      }}
                      id="btn-menuju-lokasi"
                      onClick={handleMenujuLokasi}
                      disabled={menujuLokasiClicked}
                    >
                      Menuju Lokasi
                    </Button>
                    <Button
                      size="large"
                      variant="contained"
                      type="submit"
                      style={{
                        backgroundColor: "#DE834E",
                        color: "black",

                        margin: "6px",
                      }}
                      id="btn-sampai-lokasi"
                      onClick={handleSampaiLokasi}
                      disabled={sampaiLokasiClicked}
                    >
                      Sampai Lokasi
                    </Button>
                    {showPesananSelesaiButton && (
                      <Button onClick={handlePesananSelesai}>
                        Pesanan Selesai Diproses
                      </Button>
                    )}
                  </div>
                </Grid>
              </div>
            </div>
          </div>
        ) : (
          <p>Data tidak ditemukan.</p>
        )}
      </div>
    </>
  );
}
