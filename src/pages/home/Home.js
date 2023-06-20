import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import { auth } from "../../firebase/config";

import { onAuthStateChanged, signOut } from "firebase/auth";

const Home = () => {
  return (
    <section>
      <p>HOME </p>
    </section>
  );
};
export default Home;
