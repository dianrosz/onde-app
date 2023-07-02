/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
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
import { Autocomplete, TextField, Typography } from "@mui/material";

export default function ProcessOrderList() {
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2 m-2">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ width: 300 }}
            getOptionLabel={(rows) => rows.nama || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search Pemesanan" />
            )}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
        </Stack>
        <Box height={10} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">No. Transaksi</TableCell>
                <TableCell align="left">Nama Pemesan</TableCell>
                <TableCell align="left">Kategori Layanan</TableCell>
                <TableCell align="left">Status Pemesanan</TableCell>
                <TableCell align="left">Tautan Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" />
      </Paper>
    </>
  );
}
