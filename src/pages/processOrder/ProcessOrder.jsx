/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import "./processOrder.css";
import ProcessOrderList from "./ProcessOrderList";
import { Sidebar, Header, Footer } from "../../components";

const ProcessOrder = () => {
  return (
    <Sidebar>
      <Header />
      <section>
        <div className="processOrder">
          <div className="judul">
            <h4>DAFTAR PROSES PEMESANAN</h4>
          </div>
          <div className="card">
            <div className="main-card">
              <div className="card-header">
                <h5>Daftar Proses Pemesanan</h5>
              </div>
              <div className="card-body">
                <ProcessOrderList />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Sidebar>
  );
};
export default ProcessOrder;
