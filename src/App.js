import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Sidebar, Header, Footer } from "./components";
import {
  Home,
  Order,
  Driver,
  DriverList,
  AddDriver,
  ListOrder,
  OrderToday,
  ProcessOrder,
  EkstimasiWaktu,
  HistoryOrder,
} from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/orderToday" element={<OrderToday />} />
            <Route path="/driver" element={<Driver />} />
            <Route path="/driver" element={<DriverList />} />
            <Route path="/driver" element={<AddDriver />} />
            <Route path="/listOrder" element={<ListOrder />} />
            <Route path="/processOrder" element={<ProcessOrder />} />
            <Route path="/processOrder" element={<EkstimasiWaktu />} />
            <Route path="/historyOrder" element={<HistoryOrder />} />
          </Routes>
          <Footer />
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
