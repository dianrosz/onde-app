/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from "react";
import "./historyOrder.css";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Autocomplete, TextField } from "@mui/material";

export default function HistoryOrderList() {
  return (
    <>
      <Box height={10} />
      <Stack direction="row" spacing={2} className="my-2 mb-2 m-2">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          sx={{ width: 300 }}
          getOptionLabel={(cards) => cards.kategoriLayanan || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="Search Riwayat Pemesanan"
            />
          )}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
      </Stack>
      <Box height={10} />
    </>
  );
}
