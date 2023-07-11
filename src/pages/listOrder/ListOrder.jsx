/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import IsiListOrder from "./IsiListOrder";
import "./listOrder.css";
import { Sidebar, Header, Footer } from "../../components";
import * as React from "react";

const ListOrder = () => {
  return (
    <Sidebar>
      <Header />
      <section>
        <div className="list-order">
          <div className="judul">
            <h4>DAFTAR PEMESANAN</h4>
          </div>
          <div className="card">
            <div className="main-card">
              <div className="card-header">
                <h5>Daftar Pemesanan</h5>
              </div>
              <div class="card-body">
                <IsiListOrder />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Sidebar>
  );
};
export default ListOrder;
