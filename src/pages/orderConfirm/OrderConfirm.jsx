import React from "react";
import IsiOrderConfirm from "./IsiOrderConfirm";
import { Sidebar, Header, Footer } from "../../components";

export default function OrderConfirm() {
  return (
    <Sidebar>
      <Header />
      <section>
        <div className="orderToday">
          <div className="judul">
            <h4>KONFIRMASI PEMESANAN</h4>
          </div>
          <div className="card">
            <div className="main-card">
              <div className="card-header">
                <h5>Konfirmasi Pemesanan</h5>
              </div>
              <div className="card-body">
                <IsiOrderConfirm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Sidebar>
  );
}
