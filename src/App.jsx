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
          <Route path="/orderReject" element={<OrderReject />} />
          <Route path="/orderReject" element={<ListOrderReject />} />
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
          <Route path="/historyReject" element={<HistoryReject />} />
          <Route path="/historyReject" element={<HistoryRejectList />} />
          <Route path="/orderVer2" element={<Orderv2 />} />
          <Route path="/orderConfirm" element={<OrderConfirm />} />
          <Route path="/orderConfirm" element={<IsiOrderConfirm />} />
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
