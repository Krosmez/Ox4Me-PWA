import React from "react";
import { NavLink } from "react-router-dom";

export default function BottomNavItem({ to, icon, content }) {
  return (
    <li className="menu-item">
      <NavLink to={to}>
        <span>{icon}</span>
        {content}
      </NavLink>
    </li>
  );
}
