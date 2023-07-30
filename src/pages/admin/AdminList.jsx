/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { Link } from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import Modal from "@mui/material/Modal";
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
import { onAuthStateChanged } from "firebase/auth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";

export default function AdminList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data semua pengguna dari Firestore dan simpan di state userList

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userCollection = collection(db, "admin");
      const snapshot = await getDocs(userCollection);
      const users = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setRows(users);
    } catch (error) {
      toast.error("Error!");
    }
  };

  const deleteAdmin = (id) => {
    Swal.fire({
      title: "Hapus Admin?",
      text: "Data Admin akan terhapus permanen",
      icon: "Peringatan",
      showCancelButton: true,
      confirmButtonColor: "#de834e",
      cancelButtonColor: "#A61111",
      confirmButtonText: "Hapus Admin",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "admin", id);
    await deleteDoc(userDoc);
    Swal.fire("Terhapus!", "Data terhapus!", "Berhasil");
    fetchData();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
          <Button
            size="small"
            variant="contained"
            href="/addAdmin"
            style={{ backgroundColor: "#DE834E" }}
          >
            + Tambah Admin
          </Button>
        </Stack>
        <Box height={10} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">No. </TableCell>
                <TableCell align="left">Nama</TableCell>
                <TableCell align="left">Email Admin</TableCell>
                <TableCell align="left">Jenis Kelamin</TableCell>
                <TableCell align="left">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  return (
                    <TableRow hover role="checkbox" key={index}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{user.name}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{user.gender}</TableCell>
                      <TableCell key={user.id} align="left">
                        <Stack spacing={2} direction="row">
                          <DeleteIcon
                            style={{
                              fontSize: "18px",
                              color: "#A61111",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteAdmin(user.id)}
                          />
                        </Stack>
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
