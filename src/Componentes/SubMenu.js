import "./SubMenu.css";
export default function SubMenu() {
  return (
    <div id="sub-menu">
      <div className="icone-subMenu">
        <a href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </a>
        <p className="menu">Menu</p>
      </div>

      <div className="lista-aparelhos">
        <p>Departamentos</p>
        <ul>
            <li><a href="#">Notebooks</a></li>
            <li><a href="#">Computagores</a></li>
            <li><a href="#">Tablets</a></li>
            <li><a href="#">Notebooks</a></li>
            <li><a href="#">Smartphone</a></li>
            <li><a href="#">Monitor</a></li>
            <li><a href="#">Acessórios e Periféricos</a></li>
            <li><a href="#">Apple</a></li>
            <li><a href="#">Notebooks Gamer</a></li>
        </ul>
      </div>

      <div className="info-adicional">
        <a href="#">
            <p>Temos a melhor gestão para a sua Empresa. Confira!</p>
        </a>
      </div>
    </div>
  );
}
