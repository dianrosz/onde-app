/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import { auth } from "../../firebase/config";

import { onAuthStateChanged, signOut } from "firebase/auth";

const Home = () => {
  return (
    <section style={{ height: "75vh", alignItems: "center" }}>
      <p style={{ alignItems: "center" }}>TAMPILAN BERANDA </p>
    </section>
  );
};
export default Home;
