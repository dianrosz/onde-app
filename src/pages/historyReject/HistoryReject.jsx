/* eslint-disable no-unused-vars */
import React from "react";
import "./historyReject.css";
import HistoryRejectList from "./HistoryRejectList";
import { Sidebar, Header, Footer } from "../../components";

const HistoryReject = () => {
  return (
    <Sidebar>
      <Header />
      <section>
        <div className="historyReject">
          <div className="judul">
            <h4>RIWAYAT PEMESANAN DITOLAK</h4>
          </div>
          <div className="card">
            <div className="main-card">
              <div className="card-header">
                <h5>Riwayat Pemesanan Ditolak</h5>
              </div>
              <div class="card-body">
                <HistoryRejectList />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Sidebar>
  );
};
export default HistoryReject;
