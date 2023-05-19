/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { IconButton, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
export default function AddDriver({ closeEvent }) {
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Tambah Driver
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2}></Grid>
    </>
  );
}
