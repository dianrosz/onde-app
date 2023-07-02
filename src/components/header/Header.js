/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Berhasil ");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="header">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <span align="right">
            <NavLink to="/login" onClick={logoutUser} align="right">
              LOGOUT
            </NavLink>
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
