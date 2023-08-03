import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import {
  Home,
  Order,
  Driver,
  DriverList,
  AddDriver,
  ListOrder,
  OrderReject,
  ListOrderReject,
  EstimasiWaktu,
  ProcessOrder,
  ProcessOrderList,
  HistoryReject,
  IsiListOrder,
  Login,
  Registrasi,
  HistoryRejectList,
  Orderv2,
  OrderConfirm,
  IsiOrderConfirm,
  AdminList,
  Admin,
  EditDriver,
  AddAdmin,
  PageDriver,
  PageCustomer,
} from "./pages";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";

function App() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrasi" element={<Registrasi />} />
          <Route path="/order" exact element={<Order />} />
          <Route path="/orderReject" exact element={<OrderReject />} />
          <Route path="/orderReject" exact element={<ListOrderReject />} />
          <Route path="/driver" exact element={<Driver />} />
          <Route path="/editDriver/:id" exact element={<EditDriver />} />
          <Route path="/driverlist" exact element={<DriverList />} />
          <Route path="/adminlist" exact element={<AdminList />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/addAdmin" exact element={<AddAdmin />} />
          <Route path="/addDriver" exact element={<AddDriver />} />
          <Route path="/listOrder" exact element={<ListOrder />} />
          <Route path="/isilistOrder" exact element={<IsiListOrder />} />
          <Route path="/processOrder" exact element={<ProcessOrder />} />
          <Route path="/processOrder" exact element={<ProcessOrderList />} />
          <Route path="/processOrder" exact element={<EstimasiWaktu />} />
          <Route path="/historyReject" exact element={<HistoryReject />} />
          <Route path="/historyReject" exact element={<HistoryRejectList />} />
          <Route path="/orderVer2" exact element={<Orderv2 />} />
          <Route path="/orderConfirm" exact element={<OrderConfirm />} />
          <Route path="/orderConfirm" exact element={<IsiOrderConfirm />} />
          <Route
            path="/pageDriver/:id"
            element={<PageDriver progressId="driverId" />}
          />
          <Route
            path="/pageCustomer/:id"
            element={<PageCustomer progressId="driverId" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
