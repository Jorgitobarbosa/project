import React, { useState } from "react";
import { FaMicrochip } from "react-icons/fa";
import ProductList from "./ProductList";
import "./Categories.css";

export default function CRUD() {
  const [showProductList, setShowProductList] = useState(false);

  const handleClick = () => {
    setShowProductList(true);
  };

  const categories = [
    { name: "CRUD", icon: <FaMicrochip /> },
  ];

  return (
    <div className="categories-container">
      {categories.map((cat, index) => (
        <div key={index} className="category-item" onClick={handleClick}>
          <div className="category-icon">{cat.icon}</div>
          <p>{cat.name}</p>
        </div>
      ))}

      {showProductList && <ProductList />}
    </div>
  );
}