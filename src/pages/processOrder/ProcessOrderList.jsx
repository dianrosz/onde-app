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
import { Link } from "react-router-dom";
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const empCollectionRef = collection(db, "prosesPemesanan");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      getUsers();
    }
  };
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2 m-2">
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
                <TableCell align="left">No</TableCell>
                <TableCell align="left">ID Transaksi</TableCell>
                <TableCell align="left">Nama Pemesan</TableCell>
                <TableCell align="left">Kategori Layanan</TableCell>
                <TableCell align="center">Status Pemesanan</TableCell>
                <TableCell align="left">Harga</TableCell>
                <TableCell align="left">Tanggal Pesanan</TableCell>
                <TableCell align="left">Genarate Link Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell key={row.id} align="left">
                        {row.id}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.pemesan}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.layanan}
                      </TableCell>
                      {/* Codingan Sementara */}
                      <TableCell align="center">DiProses</TableCell>
                      <TableCell key={row.id} align="left">
                        {row.harga}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.tanggal}
                      </TableCell>
                      <TableCell align="left">
                        <Link key={row.id} to={`/pageDriver/${row.id}`}>
                          Link Progress Driver |
                        </Link>
                        <Link key={row.id} to={`/pageCustomer/${row.id}`}>
                          | Link Customer
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
