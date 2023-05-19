/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import "./orderToday.css";

const OrderToday = () => {
  return (
    <section>
      <div className="orderToday">
        <div className="judul">
          <h4>Pemesanan Hari Ini</h4>
        </div>
        <div className="card">
          <div className="main-card">
            <div className="card-header">
              <h5>Pemesanan Hari Ini</h5>
            </div>
            <div className="card-body">
              <div className="top-tabel">
                <label>Search: </label>
                <input
                  class="form-control form-control-sm"
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">ID Transaksi</th>
                      <th scope="col">Nama Pemesan</th>
                      <th scope="col">Kategori Layanan</th>
                      <th scope="col">Status Pemesanan</th>
                      <th scope="col">Driver</th>
                      <th scope="col">Waktu Transaksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default OrderToday;
