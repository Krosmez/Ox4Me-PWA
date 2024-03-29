import "./buttonlink.css";

import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function ButtonLink({
  isLink,
  isNavLink,
  to = "/",
  variant,
  asDefaultStyle,
  content = "Lorem",
  type = "button",
  Children,
  ...props
}) {
  if (isLink) {
    // Display a default <a> anchor
    return (
      <Link
        to={to}
        className={`${(asDefaultStyle && "link") || ""} ${
          (variant && variant) || ""
        }`}
        {...props}
      >
        {content}
      </Link>
    );
  } else if (isNavLink) {
    // Display a default <a> anchor but with
    // a default 'active' behavior.
    return (
      <NavLink
        to={to}
        className={`${variant ? `${variant}` : "navlink"}`}
        {...props}
      >
        {content}
      </NavLink>
    );
  } else {
    // Display a default <button> with the possibility
    // to add Children element in it or simple text
    return (
      <button
        type={type}
        className={`${variant ? `${variant}` : "btn"}`}
        {...props}
      >
        {content ? content : Children}
      </button>
    );
  }
}
