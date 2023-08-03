/* eslint-disable no-unused-vars */
import * as React from "react";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import TextField from "@mui/material/TextField";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import {
  Grid,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { onSnapshot } from "firebase/firestore";

export default function Orderv2() {
  const [inputString, setInputString] = useState("");
  const [values, setValues] = useState({});
  const [harga, setHarga] = useState([]);
  const [tanggal, setTanggal] = useState(new Date());
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [driver, setSelectedDriver] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "driver"),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          value: doc.id,
          label: doc.data().nama,
        }));

        setOptions(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Save the selected label to Firestore "terpilih" collection
    const selectedOptionRef = doc(db, "pemesanan", selectedValue);
    const label = options.find(
      (option) => option.value === selectedValue
    )?.label;
    setSelectedDriver(label); // Mengupdate driver dengan label yang dipilih
  };

  const handleInputChange = (event) => {
    setInputString(event.target.value);
  };

  const handleHargaChange = (event) => {
    setHarga(event.target.value);
  };

  const handleTanggalChange = (event) => {
    setTanggal(event.target.value);
  };

  const parseInputString = async () => {
    if (!inputString || !harga || !driver) {
      toast.error("Lengkapi pemesanan terlebih dahulu!");
    } else {
      const regexPattern = /(\w+)\s*:\s*(.*)/g;
      let match;
      const parsedValues = {};

      while ((match = regexPattern.exec(inputString)) !== null) {
        const field = match[1];
        const value = match[2].trim();

        parsedValues[field] = value;

        Swal.fire({
          title: "Berhasil!",
          text: "Pemesanan diproses",
          confirmButtonColor: "#de834e",
        });
        navigate("/listOrder");
      }

      const dataToSave = {
        ...parsedValues,
        harga,
        tanggal,
        driver,
      };

      const collectionRef = collection(db, "pemesanan");
      await addDoc(collectionRef, dataToSave);
    }
  };

  const saveToFirestore = async (data) => {
    const collectionRef = collection(db, "pemesanan"); // Nama koleksi yang diinginkan
    await addDoc(collectionRef, data);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Salin format pesanan di sini"
            multiline
            required
            rows={10}
            variant="outlined"
            value={inputString}
            onChange={handleInputChange}
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            required
            id="outlined-number"
            label="Konfirmasi Harga"
            onChange={handleHargaChange}
            value={harga}
            type="number"
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            type="date"
            placeholder="Tanggal Transaksi"
            required
            onChange={handleTanggalChange}
            value={tanggal}
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-number"
            label="Pilih Driver"
            value={selectedOption}
            onChange={handleChange}
            select
            sx={{ minWidth: "100%" }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="right">
            <Button
              variant="contained"
              type="submit"
              style={{
                marginTop: "10px",
                backgroundColor: "#DE834E",
              }}
              onClick={parseInputString}
            >
              Tambah pemesanan
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
