import React from "react";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";

import { db } from "../../firebase/config";

export default function PageCustomer({ progressId }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState("");

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

    const unsubscribe = onSnapshot(
      doc(collection(db, "progressDriver"), progressId),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setProgress(data.progress);
        }
      }
    );

    fetchData();
    return () => unsubscribe();
  }, [id, progressId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      {data ? (
        <div>
          <h2>Halaman Customer</h2>
          <p>Nama: {data.pemesan}</p>
          <p>Lokasi Penjemputan: {data.penjemputan}</p>
          <p>Lokasi Pengambilan: {data.pengambilan}</p>
          <p>Tanggal Pesanan: {data.tanggal}</p>
          <p>Kategori Layanan: {data.layanan}</p>
          <p>Harga: {data.harga}</p>
          {/* Tampilkan data individu lainnya sesuai struktur tabel */}
          <div>
            <h1>Pemberitahuan Customer</h1>

            {progress === "menuju_lokasi" && (
              <p>Driver sedang menuju ke lokasi.</p>
            )}
            {progress === "sampai_lokasi" && (
              <p>Driver telah sampai di lokasi.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Data tidak ditemukan.</p>
      )}
    </div>
  );
}
