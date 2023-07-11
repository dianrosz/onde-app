/* eslint-disable no-unused-vars */
import React from "react";
import "./historyOrder.css";
import HistoryOrderList from "./HistoryOderList";
import { Sidebar, Header, Footer } from "../../components";

const HistoryOrder = () => {
  return (
    <Sidebar>
      <Header />
      <section>
        <div className="historyOrder">
          <div className="judul">
            <h4>RIWAYAT PEMESANAN</h4>
          </div>
          <div className="card">
            <div className="main-card">
              <div className="card-header">
                <h5>Riwayat Pemesanan</h5>
              </div>
              <div class="card-body">
                <HistoryOrderList />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Sidebar>
  );
};
export default HistoryOrder;
