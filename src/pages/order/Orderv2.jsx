import * as React from "react";
import { useState } from "react";
import { db } from "../../firebase/config";
import TextField from "@mui/material/TextField";
import { collection, addDoc } from "firebase/firestore";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Sidebar, Header, Footer } from "../../components";

export default function Orderv2() {
  const [inputString, setInputString] = useState("");
  const [values, setValues] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputString(event.target.value);
  };

  const parseInputString = async () => {
    const regexPattern = /(\w+)\s*=\s*(.*)/g;
    let match;
    const parsedValues = {};

    while ((match = regexPattern.exec(inputString)) !== null) {
      const field = match[1];
      const value = match[2].trim();

      parsedValues[field] = value;
      Swal.fire("Berhasil", "Pesanan Berhasil ditambahkan");
      navigate("/listOrder");
    }

    setValues(parsedValues);
    await saveToFirestore(parsedValues);
  };

  const saveToFirestore = async (data) => {
    const collectionRef = collection(db, "pemesanan"); // Nama koleksi yang diinginkan
    await addDoc(collectionRef, data);
  };

  return (
    <div>
      <Grid item xs={12}>
        <TextField
          id="outlined-multiline-static"
          label="Salin Format Pesanan Disini"
          multiline
          rows={10}
          variant="outlined"
          value={inputString}
          onChange={handleInputChange}
          sx={{ minWidth: "100%" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" align="right">
          <Button
            variant="contained"
            type="submit"
            style={{
              marginTop: "10px",
              backgroundColor: "#08376b",
            }}
            onClick={parseInputString}
          >
            Tambah pemesanan
          </Button>
        </Typography>
      </Grid>
    </div>
  );
}
