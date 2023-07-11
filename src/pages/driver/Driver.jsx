/* eslint-disable jsx-a11y/anchor-is-valid */

import DriverList from "./DriverList";
import "./driver.css";
import React from "react";
import { Sidebar, Header, Footer } from "../../components";

const Driver = () => {
  return (
    <Sidebar>
      <Header />
      <section>
        <div className="listDriver">
          <div className="judul">
            <h4>DAFTAR DRIVER</h4>
          </div>
          <div className="card">
            <div className="main-card">
              <div className="card-header">
                <h5>Daftar Driver</h5>
              </div>
              <div className="card-body">
                <DriverList />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Sidebar>
  );
};
export default Driver;
