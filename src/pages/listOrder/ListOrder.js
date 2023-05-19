/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import "./listOrder.css";
import EstimasiWaktu from "./EkstimasiWaktu";

const ListOrder = () => {
  return (
    <section>
      <div className="list-order">
        <div className="judul">
          <h4>Daftar Pemesanan</h4>
        </div>
        <div className="card">
          <div className="main-card">
            <div className="card-header">
              <h5>Daftar Pemesanan</h5>
            </div>
            <div class="card-body">
              <div class="dropdown">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pilih Kategori
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a class="dropdown-item" href="#">
                      Kirim Barang
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Antar Jemput
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Belanja
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Makanan & Minuman
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Belanja Pasar
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Kirim Barang Kapal
                    </a>
                  </li>
                </ul>
              </div>
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
                <p class="card-text">Lokasi Jemput SD Negeri Ubo - Ubo</p>
                <p class="card-text">Lokasi Antar: Tanah Tinggi</p>
                <p class="card-text">
                  Waktu Pemesanan: 11/02/2023 - 40 menit yang lalu
                </p>
                <button className="button-one">Terima</button>
                <button className="button-second">Batal</button>
              </div>
            </div>
            <EstimasiWaktu />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ListOrder;
