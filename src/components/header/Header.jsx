/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { Typography, Grid } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Anda telah keluar");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="header">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <Grid style={{ textAlign: "right" }}>
            <span className="logout">
              <NavLink to="/login" onClick={logoutUser}>
                Keluar
              </NavLink>
            </span>
          </Grid>
        </div>
      </nav>
    </div>
  );
};

export default Header;
