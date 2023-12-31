import React, { useState } from "react";
import "./sidebar.css";
import logo from "./logo.svg";
import {
  BsFillBagPlusFill,
  BsFillBagDashFill,
  BsBagCheckFill,
  BsFillBookmarkCheckFill,
  BsFillPersonFill,
  BsFillPeopleFill,
  BsFillBookmarkXFill,
} from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Beranda",
      icon: <AiFillHome size={18} />,
    },
    {
      path: "/order",
      name: "Pemesanan",
      icon: <BsFillBagPlusFill size={18} />,
    },

    {
      path: "/listOrder",
      name: "Daftar Pemesanan",
      icon: <BsFillBagDashFill size={18} />,
    },
    {
      path: "/processOrder",
      name: "Daftar Proses Pemesanan",
      icon: <BsBagCheckFill size={18} />,
    },
    {
      path: "/orderReject",
      name: "Pemesanan Diproses",
      icon: <BsFillBookmarkCheckFill size={18} />,
    },
    {
      path: "/historyReject",
      name: "Pemesanan Ditolak",
      icon: <BsFillBookmarkXFill size={18} />,
    },
    {
      path: "/Driver",
      name: "Daftar Driver",
      icon: <BsFillPersonFill size={18} />,
    },
    {
      path: "/Admin",
      name: "Daftar Admin",
      icon: <BsFillPeopleFill size={18} />,
    },
  ];
  return (
    <sidebar>
      <div className="side">
        <div style={{ width: isOpen ? "280px" : "65px" }} className="sidebar">
          <div className="top_section">
            <img
              style={{ display: isOpen ? "block" : "none" }}
              src={logo}
              className="logo"
              alt=""
            />
            <div
              style={{ marginLeft: isOpen ? "25px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>
          </div>

          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <main>{children}</main>
      </div>
    </sidebar>
  );
};

export default Sidebar;
