import "./Nav-corpo.css";
import SubMenu from "./SubMenu";

function NavCorpo() {
  return (
    <div className="Container-principal-pai">
      <div className="container-nav-toti">
        <div className="icone-nav-toti">
          <div className="sub-menu-toti">
            <SubMenu />
          </div>
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
          <p className="menu-toti">Menu</p>
        </div>

        <div className="nav-categoria-toti">
          <ul>
            <li>
              <a href="#">Liquida Tech</a>|
            </li>

            <li>
              <a href="#">Loja Apple</a>|
            </li>
            <li>
              <a href="#">Loja Samsung</a>|
            </li>
            <li>
              <a href="#">Loja Lenovo</a>|
            </li>
            <li>
              <a href="#">Loja Dell</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavCorpo;
