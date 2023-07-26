/* eslint-disable no-unused-vars */
import { Container, Typography, Grid } from "@mui/material";
import { auth } from "../../firebase/config";
import { Sidebar, Header, Footer } from "../../components";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { counter } from "@fortawesome/fontawesome-svg-core";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [tolak, setTolak] = useState([]);

  useEffect(() => {
    // Ambil data pesanan dari Firestore secara real-time
    const unsubscribe = onSnapshot(
      collection(db, "prosesPemesanan"),
      (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      }
    );

    const countTolak = onSnapshot(
      collection(db, "tolakPemesanan"),
      (snapshot) => {
        const tolakData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTolak(tolakData);
      }
    );

    return () => unsubscribe();
    return () => countTolak();
  }, [db]);

  const getTotalOrders = () => {
    return orders.length;
  };
  const getTotalTolak = () => {
    return tolak.length;
  };

  // Ambil data untuk grafik batang (jumlah pesanan per kategori produk)
  const getChartData = () => {
    const categoryCounts = {};

    orders.forEach((order) => {
      const { productType } = order;
      categoryCounts[productType] = (categoryCounts[productType] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([layanan, count]) => ({
      layanan,
      count,
    }));
  };

  const getChartTolak = () => {
    const categoryCounts = {};

    tolak.forEach((stop) => {
      const { productType } = stop;
      categoryCounts[productType] = (categoryCounts[productType] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([layanan, count]) => ({
      layanan,
      count,
    }));
  };

  return (
    <Sidebar>
      <Header />

      <Grid>
        <Typography variant="h5">
          Jumlah Seluruh Data Pesanan yang Diproses: {getTotalOrders()}
        </Typography>
        {/* Tampilkan grafik batang */}
        <BarChart width={600} height={300} data={getChartData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="layanan" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </Grid>

      <Grid>
        <Typography variant="h5">
          Jumlah Seluruh Data Pesanan yang Ditolak: {getTotalTolak()}
        </Typography>
        {/* Tampilkan grafik batang */}
        <BarChart width={600} height={300} data={getChartTolak()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="layanan" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </Grid>

      <Footer />
    </Sidebar>
  );
};

export default Home;
