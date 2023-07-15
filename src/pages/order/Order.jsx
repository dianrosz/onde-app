/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Orderv2 from "./Orderv2";
import "./order.css";
import Swal from "sweetalert2";
import { Sidebar, Header, Footer } from "../../components";

const Order = () => {
  return (
    <Sidebar>
      <Header />
      <section>
        <div className="order">
          <div className="judul">
            <h4>PEMESANAN</h4>
          </div>
          <div className="card">
            <div className="main-card">
              <div className="card-header">
                <h5>Salin pemesanan di sini</h5>
              </div>
              <div className="card-body">
                <Orderv2 />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Sidebar>
  );
};
export default Order;
