import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Home,
  Order,
  Driver,
  DriverList,
  AddDriver,
  ListOrder,
  OrderToday,
  ListOrderToday,
  EstimasiWaktu,
  ProcessOrder,
  ProcessOrderList,
  HistoryOrder,
  IsiListOrder,
  Login,
  Registrasi,
  HistoryOrderList,
  Orderv2,
  OrderConfirm,
  IsiOrderConfirm,
  AdminList,
  Admin,
  EditDriver,
  AddAdmin,
} from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrasi" element={<Registrasi />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orderToday" element={<OrderToday />} />
          <Route path="/orderToday" element={<ListOrderToday />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/editDriver/:id" element={<EditDriver />} />
          <Route path="/driverlist" element={<DriverList />} />
          <Route path="/adminlist" element={<AdminList />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/addAdmin" element={<AddAdmin />} />
          <Route path="/addDriver" element={<AddDriver />} />
          <Route path="/listOrder" element={<ListOrder />} />
          <Route path="/isilistOrder" element={<IsiListOrder />} />
          <Route path="/processOrder" element={<ProcessOrder />} />
          <Route path="/processOrder" element={<ProcessOrderList />} />
          <Route path="/processOrder" element={<EstimasiWaktu />} />
          <Route path="/historyOrder" element={<HistoryOrder />} />
          <Route path="/historyOrder" element={<HistoryOrderList />} />
          <Route path="/orderVer2" element={<Orderv2 />} />
          <Route path="/orderConfirm" element={<OrderConfirm />} />
          <Route path="/orderConfirm" element={<IsiOrderConfirm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
