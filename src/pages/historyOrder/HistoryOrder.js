/* eslint-disable no-unused-vars */
import React from "react";
import "./historyOrder.css";

const HistoryOrder = () => {
  return (
    <section>
      <div className="historyOrder">
        <div className="judul">
          <h4>Riwayat Pemesanan</h4>
        </div>
        <div className="card">
          <div className="main-card">
            <div className="card-header">
              <h5>Riwayat Pemesanan</h5>
            </div>
            <div class="card-body">
              <div className="top-tabel">
                <label>Search: </label>
                <input
                  class="form-control form-control-sm"
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="cardi">
                <h5 class="card-title">Belanja</h5>
                <p class="card-text">No. Transaksi : #OND-110220230001</p>
                <p class="card-text">Customer1 - 0871828849495</p>
                <p class="card-text">Kategori Layanan: Belanja</p>
                <button className="button-second">Lihat Riwayat</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HistoryOrder;
