import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  return (
    <nav className="my-navbar d-flex gap-3 bg-dark text-white p-4">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/rq-df">RQ Fetching</NavLink>
      <NavLink to="/tr-df">Traditional Fetching</NavLink>
      <NavLink to="/rq-query-by-id">Query By ID</NavLink>
      <NavLink to="/parallel-queries">Parallel Queries</NavLink>
    </nav>
  );
};

export default Navbar;
