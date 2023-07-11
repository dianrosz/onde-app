/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import { auth } from "../../firebase/config";
import { Sidebar, Header, Footer } from "../../components";

import { onAuthStateChanged, signOut } from "firebase/auth";

const Home = () => {
  return (
    <Sidebar>
      <Header />
      <section style={{ height: "75vh", alignItems: "center" }}>
        <p style={{ alignItems: "center" }}>TAMPILAN BERANDA </p>
      </section>
      <Footer />
    </Sidebar>
  );
};
export default Home;
