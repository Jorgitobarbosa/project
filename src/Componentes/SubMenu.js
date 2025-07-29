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
          <li>
            <div className="item-submenu">
              <div className="move">
                <p>Marcas</p>
              </div>
              <ul>
                <li><a href="#">Dell</a></li>
                <li><a href="#">Lenovo</a></li>
                <li><a href="#">HP</a></li>
                <li><a href="#">Positivo</a></li>
              </ul>
            </div>
            <a href="#">Notebooks</a>
          </li>
          <li>
            <div className="item-submenu">
              <div className="move">
                <p>Marcas</p>
              </div>
              <ul>
                <li><a href="#">Dell</a></li>
                <li><a href="#">Lenovo</a></li>
                <li><a href="#">HP</a></li>
                <li><a href="#">Positivo</a></li>
              </ul>
            </div>
            <a href="#">Computagores</a>
          </li>
          <li>
            <div className="item-submenu">
              <div className="move">
                <p>Marcas</p>
              </div>
              <ul>
                <li><a href="#">Apple</a></li>
                <li><a href="#">Samsung</a></li>
              </ul>
            </div>
            <a href="#">Tablets</a>
          </li>
          <li>
            <div className="item-submenu">
              <div className="move">
                <p>Marcas</p>
              </div>
              <ul>
                <li><a href="#">Apple</a></li>
                <li><a href="#">Motorola</a></li>
                <li><a href="#">Samsung</a></li>
                <li><a href="#">LG</a></li>
              </ul>
            </div>
            <a href="#">Smartphone</a>
          </li>
          <li>
            <div className="item-submenu">
              <div className="move">
                <p>Marcas</p>
              </div>
              <ul>
                <li><a href="#">17P</a></li>
                <li><a href="#">18P</a></li>
                <li><a href="#">19P</a></li>
                <li><a href="#">20P</a></li>
                <li><a href="#">21P</a></li>
                <li><a href="#">22P</a></li>
                <li><a href="#">23P</a></li>
              </ul>
            </div>
            <a href="#">Monitor</a>
          </li>
          <li>
            <div className="item-submenu">
              <div className="move">
                <p>Marcas</p>
              </div>
              <ul>
                <li><a href="#">17P</a></li>
                <li><a href="#">18P</a></li>
                <li><a href="#">19P</a></li>
                <li><a href="#">20P</a></li>
                <li><a href="#">21P</a></li>
                <li><a href="#">22P</a></li>
                <li><a href="#">23P</a></li>
              </ul>
            </div>
            <a href="#">Acessórios e Periféricos</a>
          </li>
          <li>
            <div className="item-submenu">
              <div className="move">
                <p>Marcas</p>
              </div>
              <ul>
                <li><a href="#">Iphone</a></li>
                <li><a href="#">Imac</a></li>
                <li><a href="#">Ipad</a></li>
                <li><a href="#">Macbook</a></li>
              </ul>
            </div>
            <a href="#">Apple</a>
          </li>
          <li>
            <div className="item-submenu">
              <div className="move">
                <p>Marcas</p>
              </div>
              <ul>
                <li><a href="#">Iphone</a></li>
                <li><a href="#">Imac</a></li>
                <li><a href="#">Ipad</a></li>
                <li><a href="#">Macbook</a></li>
              </ul>
            </div>
            <a href="#">Notebooks Gamer</a>
          </li>
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
