/* eslint-disable no-unused-vars */
import { Container, Typography } from "@mui/material";
import { auth } from "../../firebase/config";
import { Sidebar, Header, Footer } from "../../components";
import React, { useState, useEffect } from 'react';
import { db } from "../../firebase/config";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Home = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Ambil data pesanan dari Firestore secara real-time
    const unsubscribe = onSnapshot(collection(db, "prosesPemesanan"), (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, [db]);

  const getTotalOrders = () => {
    return orders.length;
  };

  // Ambil data untuk grafik batang (jumlah pesanan per kategori produk)
  const getChartData = () => {
    const categoryCounts = {};

    orders.forEach((order) => {
      const { productType } = order;
      categoryCounts[productType] = (categoryCounts[productType] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count,
    }));
  };

  return (
    <Sidebar>
      <Header/>
      <Container>
      <Typography variant="h5" gutterBottom>
        Jumlah Seluruh Data Pesanan: {getTotalOrders()}
      </Typography>
      {/* Tampilkan grafik batang */}
      <BarChart width={600} height={300} data={getChartData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </Container>
    <Footer/>
    </Sidebar>
  );
};

export default Home;