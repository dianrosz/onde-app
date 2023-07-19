/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from "react";
import axios from "axios";

const EstimasiWaktu = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=YOUR_API_KEY`
      );

      const durationValue = response.data.rows[0].elements[0].duration.value;
      const durationText = response.data.rows[0].elements[0].duration.text;

      setDuration(durationText);

      // Simpan estimasi waktu perjalanan ke Firebase Realtime Database
      const estimasiRef = firebase.database().ref("estimasi");
      estimasiRef.set({ duration: durationText });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div>
      <h5>Estimasi Waktu Antar Makanan</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Lokasi Asal"
          required
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Lokasi Tujuan"
          required
        />
        <button type="submit">Estimasi Waktu</button>
      </form>
      {duration && <p>Estimasi waktu perjalanan: {duration}</p>}
    </div>
  );
};

export default EstimasiWaktu;
