/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import "./orderReject.css";
import ListOrderReject from "./ListOrderReject";
import { Sidebar, Header, Footer } from "../../components";

const OrderReject = () => {
  return (
    <Sidebar>
      <Header />
      <section>
        <div className="orderReject">
          <div className="judul">
            <h4>RIWAYAT PEMESANAN DIPROSES</h4>
          </div>
          <div className="card">
            <div className="main-card">
              <div className="card-header">
                <h5>Riwayat pemesanan Selesai</h5>
              </div>
              <div className="card-body">
                <ListOrderReject />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Sidebar>
  );
};
export default OrderReject;
