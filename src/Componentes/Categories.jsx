import { FaMobileAlt, FaTabletAlt, FaLaptop, FaDesktop, FaTv, FaMicrochip } from "react-icons/fa";
import "./Categories.css";
import home from "../imagens/home.png";

export default function Categories({ onSelectCategory }) {
  const categories = [
    { id: 3, name: "Smartphones", icon: <FaMobileAlt /> },
    { id: 4, name: "Tablets", icon: <FaTabletAlt /> },
    { id: 1, name: "Notebooks", icon: <FaLaptop /> },
    { id: 2, name: "Desktops", icon: <FaDesktop /> },
    { id: 5, name: "Monitores", icon: <FaTv /> },
    { id: 6, name: "Acessórios", icon: <FaMicrochip /> },
  ];

  return (
    <div className="categories-container-produtos">
      {/* Botão para mostrar todos */}
      <div
        className="category-item-produtos"
        onClick={() => onSelectCategory(null)}
      >
        <div className="category-icon-produtos"><img src={home} alt="Icone de Home" /></div>
        <p>Todos</p>
      </div>

      {categories.map((cat) => (
        <div
          key={cat.id}
          className="category-item-produtos"
          onClick={() => onSelectCategory(cat.id)}
        >
          <div className="category-icon-produtos">{cat.icon}</div>
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
}
