/* eslint-disable no-unused-vars */
import { Container, Typography, Grid } from "@mui/material";
import { auth } from "../../firebase/config";
import { Sidebar, Header, Footer } from "../../components";
import React, { useState, useEffect } from "react";
import "./home.css";
import { db } from "../../firebase/config";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { BsBagCheckFill, BsBagXFill, BsPeopleFill } from "react-icons/bs";
import { FaUserClock } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { counter } from "@fortawesome/fontawesome-svg-core";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [tolak, setTolak] = useState([]);
  const [driver, setDriver] = useState([]);
  const [progress, setProgress] = useState([]);

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

    const countDriver = onSnapshot(collection(db, "driver"), (snapshot) => {
      const dataDriver = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDriver(dataDriver);
    });

    const countProgress = onSnapshot(
      collection(db, "pemesanan"),
      (snapshot) => {
        const dataProgress = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProgress(dataProgress);
      }
    );

    return () => unsubscribe();
    return () => countTolak();
    return () => countDriver();
    return () => countProgress();
  }, [db]);

  const getTotalOrders = () => {
    return orders.length;
  };
  const getTotalTolak = () => {
    return tolak.length;
  };
  const getTotalDriver = () => {
    return driver.length;
  };
  const getTotalProgress = () => {
    return progress.length;
  };

  // Ambil data untuk grafik batang (jumlah pesanan per kategori produk)
  const getChartData = () => {
    const categoryCounts = {};

    orders.forEach((order) => {
      const { productType } = order;
      categoryCounts[productType] = (categoryCounts[productType] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([tanggal, id]) => ({
      tanggal,
      id,
    }));
  };

  const getChartTolak = () => {
    const categoryCounts = {};

    tolak.forEach((stop) => {
      const { productType } = stop;
      categoryCounts[productType] = (categoryCounts[productType] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([tanggal, id]) => ({
      tanggal,
      id,
    }));
  };

  return (
    <Sidebar>
      <Header />
      <div className="home">
        <div className="px-3">
          <div className="container-fluid">
            <div className="row g-3 my-2">
              <div className="col-md-3 p-1">
                <div className="p-3 bg-white center shadow-sm d-flex justify-content-around align-items-center rounded">
                  <div className="text-align-center center">
                    <h3 className="fs-2">{getTotalOrders()}</h3>
                    <p className="fs-5">Pesanan Diproses</p>
                  </div>
                  <BsBagCheckFill size={30} color="#a3423b" />
                </div>
              </div>
              <div className="col-md-3 p-1">
                <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                  <div className="text-align-center">
                    <h3 className="fs-2 ">{getTotalTolak()}</h3>
                    <p className="fs-5">Pesanan Ditolak</p>
                  </div>
                  <BsBagXFill size={30} color="#de834e" />
                </div>
              </div>
              {/** Pesanan menunggu akan diganti pesanan selesai jika databse sudah selesai */}
              <div className="col-md-3 p-1">
                <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                  <div className="text-align-center">
                    <h3 className="fs-2 ">{getTotalProgress()}</h3>
                    <p className="fs-5">Pesanan Menunggu</p>
                  </div>
                  <FaUserClock size={30} color="#a3423b" />
                </div>
              </div>
              <div className="col-md-3 p-1">
                <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                  <div className="text-align-center">
                    <h3 className="fs-2">{getTotalDriver()}</h3>
                    <p className="fs-5">Jumlah Driver</p>
                  </div>
                  <BsPeopleFill size={30} color="#de834e" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-4">
          <div>
            <div className="diag-chart p-3 bg-white shadow-sm d-flex  justify-content-around align-items-center ">
              <div>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Jumlah Seluruh Data Pesanan yang Selesai: {getTotalOrders()}
                </Typography>
                {/* Tampilkan grafik batang */}

                <BarChart width={600} height={300} data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tanggal" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="id" fill="#de834e" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Sidebar>
  );
};

export default Home;
