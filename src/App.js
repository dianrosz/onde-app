import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header, Footer, Sidebar } from "./components";
import {
  Home,
  Order,
  Driver,
  DriverList,
  AddDriver,
  ListOrder,
  OrderToday,
  ListOrderToday,
  EkstimasiWaktu,
  ProcessOrder,
  ProcessOrderList,
  HistoryOrder,
  IsiListOrder,
  Login,
  Registrasi,
  HistoryOrderList,
} from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Sidebar>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrasi" element={<Registrasi />} />
            <Route path="/order" element={<Order />} />
            <Route path="/orderToday" element={<OrderToday />} />
            <Route path="/orderToday" element={<ListOrderToday />} />
            <Route path="/driver" element={<Driver />} />
            <Route path="/driverlist" element={<DriverList />} />
            <Route path="/addDriver" element={<AddDriver />} />
            <Route path="/listOrder" element={<ListOrder />} />
            <Route path="/isilistOrder" element={<IsiListOrder />} />
            <Route path="/processOrder" element={<ProcessOrder />} />
            <Route path="/processOrder" element={<ProcessOrderList />} />
            <Route path="/processOrder" element={<EkstimasiWaktu />} />
            <Route path="/historyOrder" element={<HistoryOrder />} />
            <Route path="/historyOrder" element={<HistoryOrderList />} />
          </Routes>
          <Footer />
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
