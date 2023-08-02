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
  const [user] = useAuthState(auth);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route
            path="/"
            exact
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registrasi" element={<Registrasi />} />
          <Route
            path="/order"
            exact
            element={user ? <Order /> : <Navigate to="/login" />}
          />
          <Route
            path="/orderReject"
            exact
            element={user ? <OrderReject /> : <Navigate to="/login" />}
          />
          <Route
            path="/orderReject"
            exact
            element={user ? <ListOrderReject /> : <Navigate to="/login" />}
          />
          <Route
            path="/driver"
            exact
            element={user ? <Driver /> : <Navigate to="/login" />}
          />
          <Route
            path="/editDriver/:id"
            exact
            element={user ? <EditDriver /> : <Navigate to="/login" />}
          />
          <Route
            path="/driverlist"
            exact
            element={user ? <DriverList /> : <Navigate to="/login" />}
          />
          <Route
            path="/adminlist"
            exact
            element={user ? <AdminList /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            exact
            element={user ? <Admin /> : <Navigate to="/login" />}
          />
          <Route path="/addAdmin" exact element={<AddAdmin />} />
          <Route path="/addDriver" element={<AddDriver />} />
          <Route
            path="/listOrder"
            exact
            element={user ? <ListOrder /> : <Navigate to="/login" />}
          />
          <Route
            path="/isilistOrder"
            exact
            element={user ? <IsiListOrder /> : <Navigate to="/login" />}
          />
          <Route
            path="/processOrder"
            exact
            element={user ? <ProcessOrder /> : <Navigate to="/login" />}
          />
          <Route
            path="/processOrder"
            exact
            element={user ? <ProcessOrderList /> : <Navigate to="/login" />}
          />
          <Route
            path="/processOrder"
            exact
            element={user ? <EstimasiWaktu /> : <Navigate to="/login" />}
          />
          <Route
            path="/historyReject"
            exact
            element={user ? <HistoryReject /> : <Navigate to="/login" />}
          />
          <Route
            path="/historyReject"
            exact
            element={user ? <HistoryRejectList /> : <Navigate to="/login" />}
          />
          <Route
            path="/orderVer2"
            exact
            element={user ? <Orderv2 /> : <Navigate to="/login" />}
          />
          <Route
            path="/orderConfirm"
            exact
            element={user ? <OrderConfirm /> : <Navigate to="/login" />}
          />
          <Route
            path="/orderConfirm"
            exact
            element={user ? <IsiOrderConfirm /> : <Navigate to="/login" />}
          />
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
