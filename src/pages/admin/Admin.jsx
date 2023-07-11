import "./admin.css";
import React from "react";
import { Sidebar, Header, Footer } from "../../components";
import AdminList from "./AdminList";

export default function Admin() {
  return (
    <Sidebar>
      <Header />
      <section>
        <div className="listDriver">
          <div className="judul">
            <h4>DAFTAR ADMIN</h4>
          </div>
          <div className="card">
            <div className="main-card">
              <div className="card-header">
                <h5>Daftar Admin</h5>
              </div>
              <div className="card-body">
                <AdminList />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Sidebar>
  );
}
