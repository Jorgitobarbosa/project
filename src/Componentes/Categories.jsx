import React from "react";
import { FaMobileAlt, FaTabletAlt, FaLaptop, FaDesktop, FaTv, FaMicrochip } from "react-icons/fa";
import "./Categories.css";

export default function Categories() {
  const categories = [
    { name: "Smartphones", icon: <FaMobileAlt /> },
    { name: "Tablets", icon: <FaTabletAlt /> },
    { name: "Notebooks", icon: <FaLaptop /> },
    { name: "Desktops", icon: <FaDesktop /> },
    { name: "Monitores", icon: <FaTv /> },
    { name: "Acessórios", icon: <FaMicrochip /> },
  ];

  return (
    <div className="categories-container-produtos">
      {categories.map((cat, index) => (
        <div key={index} className="category-item-produtos">
          <div className="category-icon-produtos">{cat.icon}</div>
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
}