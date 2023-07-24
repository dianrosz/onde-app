import React from "react";
import { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

import { db } from "../../firebase/config";

export default function PerID({ match }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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

    fetchData();
  }, [id]);

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
          <h2>Halaman Driver</h2>
          <p>Nama: {data.pemesan}</p>
          <p>Usia: {data.tanggal}</p>
          {/* Tampilkan data individu lainnya sesuai struktur tabel */}
        </div>
      ) : (
        <p>Data tidak ditemukan.</p>
      )}
    </div>
  );
}
