/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { CSVLink, CSVDownload } from "react-csv";

export default function ListOrderReject() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "pemesananSelesai");
  const [formid, setFormid] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const [id, setId] = useState("");

  const navigate = useNavigate();

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
      getUsers();
    }
  };
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
              <TextField
                {...params}
                size="small"
                label="Cari pemesanan hari ini"
              />
            )}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button
            size="small"
            variant="contained"
            href="/addDriver"
            style={{
              backgroundColor: "#2d3436",
              margin: "15px",
              padding: "10px",
              color: "#f5f5f5 !important",
            }}
          >
            <CSVLink
              data={rows}
              style={{ color: "white" }}
              filename={"Daftar Pemesanan Selesai.csv"}
            >
              Export to Excel
            </CSVLink>
          </Button>
        </Stack>

        <Box height={10} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">No.</TableCell>
                <TableCell align="left">ID Transaksi</TableCell>
                <TableCell align="left">Nama Pemesan</TableCell>
                <TableCell align="left">Kategori Layanan</TableCell>
                <TableCell align="left">Status Pemesanan</TableCell>
                <TableCell align="left">Harga</TableCell>
                <TableCell align="left">Tanggal Transaksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
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
                      <TableCell key={row.id} align="left">
                        Selesai
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.harga}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.tanggal}
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
