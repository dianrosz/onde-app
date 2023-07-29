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
            <h2>Progress Driver</h2>
            {messages.length > 0 ? (
              <ul>
                {messages.map((message) => (
                  <li key={message.id}>
                    <p>
                      Driver dengan ID {message.id} sedang dalam status:
                      {message.status}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                Tidak ada driver dalam perjalanan menuju atau sudah sampai
                lokasi.
              </p>
            )}
          </div>
        </div>
      ) : (
        <p>Data tidak ditemukan.</p>
      )}
    </div>
  );
}
