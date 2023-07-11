/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import "./orderToday.css";
import ListOrderToday from "./ListOrderToday";
import { Sidebar, Header, Footer } from "../../components";

const OrderToday = () => {
  return (
    <Sidebar>
      <Header />
      <section>
        <div className="orderToday">
          <div className="judul">
            <h4>DAFTAR PEMESANAN HARI INI</h4>
          </div>
          <div className="card">
            <div className="main-card">
              <div className="card-header">
                <h5>Pemesanan Hari Ini</h5>
              </div>
              <div className="card-body">
                <ListOrderToday />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Sidebar>
  );
};
export default OrderToday;
