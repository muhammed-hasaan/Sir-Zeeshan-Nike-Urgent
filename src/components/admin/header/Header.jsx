import { useEffect, useState } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";

const AdminHeader = ({ open, setOpen }) => {
  

  return (
    <>
      <div className="headerMargin"></div>
      <header>
        <div
          className={open ? "hamburger open" : "hamburger"}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="bar"></div>
        </div>

        <NavLink to="/" className="logo">
          
          <h2>Nike</h2>
        </NavLink>

      </header>
    </>
  );
};

export default AdminHeader;
