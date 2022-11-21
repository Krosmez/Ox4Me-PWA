import "./bottom-nav-bar.css";

import React, { useEffect, useState } from "react";

import BottomNavItem from "./BottomNavItem/BottomNavItem";
import { ReactComponent as HeartIcon } from "../../assets/img/nav-icons/heart.svg";
import { ReactComponent as HomeIcon } from "../../assets/img/nav-icons/home.svg";
import { ReactComponent as ListIcon } from "../../assets/img/nav-icons/list.svg";
import { ReactComponent as RandomIcon } from "../../assets/img/nav-icons/random.svg";

export default function BottomNavBar({}) {
  return (
    <nav className="bottom-nav">
      <div className="container">
        <ul className="menu">
          <BottomNavItem to="/" icon={<HomeIcon />} content="Accueil" />
          <BottomNavItem to="/list" icon={<ListIcon />} content="Liste" />
          <BottomNavItem
            to="/random"
            icon={<RandomIcon />}
            content="Aléatoire"
          />
          <BottomNavItem
            to="/favorites"
            icon={<HeartIcon />}
            content="Favoris"
          />
        </ul>
      </div>
    </nav>
  );
}
