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
          <div>
            <h3>Halaman Driver</h3>
            {/** 
            <Table striped hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
              </tbody>
            </Table>
            */}
            <p>Nama: {data.pemesan}</p>

            {data.penjemputan && (
              <p key={data.id}>Lokasi Penjemputan : {data.penjemputan}</p>
            )}
            {data.pengambilan && (
              <p key={data.id}>Lokasi Pengambilan : {data.pengambilan}</p>
            )}
            <p>Lokasi Pengantaran: {data.pengantaran}</p>
            <p>Tanggal Pesanan: {data.tanggal}</p>
            <p>Kategori Layanan: {data.layanan}</p>
            <p>Harga: {data.harga}</p>
            {/* Tampilkan data individu lainnya sesuai struktur tabel */}
            <div>
              <h1>Button Progress Driver</h1>

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
                  <button onClick={handlePesananSelesai}>
                    Pesanan Selesai Diproses
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Data tidak ditemukan.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
