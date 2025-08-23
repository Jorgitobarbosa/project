import "./Nav-corpo.css";
import SubMenu from "./SubMenu";
import react, { useEffect, useState } from "react";
import Perfil from "./Perfil";
import lixo from "../imagens/lixo.png";
import carinho from "../imagens/carinho.png";
import editar from "../imagens/editar.png";

function NavCorpo() {
  const [listaP, setListaP] = useState([]);

  useEffect(() => {
    listaDeProdutos();
  }, []);

  const API = "https://backend-toti.onrender.com/produtos";

  function listaDeProdutos() {
    fetch(API)
      .then((data) => data.json())
      .then((res) => {
        setListaP(res);
      });
  }

  const deletarProduto = (id) => {
    fetch(`https://backend-toti.onrender.com/produtos/:id`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(() =>
        setListaP((prevLista) => prevLista.filter((p) => p.id !== id))
      );
  };

  return (
    <div>
      <div className="container-nav">
        <div className="icone-nav">
          <div className="sub-menu">
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
          <p className="menu">Menu</p>
        </div>

        <div className="nav-categoria">
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

      <div className="perfil">
        <Perfil />
      </div>

      <div
        style={{
          padding: "10px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          justifyContent: "center",
        }}
      >
        {listaP.map((produtos) => (
          <div
            key={produtos.id}
            style={{
              width: "100%",
              maxWidth: "250px",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                marginBottom: "20px",
                justifyContent: "center",
                margin: "10px",
                gap: "15px",
              }}
            >
              <button
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
              >
                <img src={editar} alt="Icone de Editar" />
              </button>

              <button onClick={() => deletarProduto(produtos.id)}
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
              >
                <img src={lixo} alt="Icone de lixeira" />
              </button>

              <button
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
              >
                <img src={carinho} alt="Carinho de Compra" />
              </button>
            </div>

            <img
              src={produtos.imagens[0].url}
              alt={produtos.nome}
              width={200}
            />
            <h2 style={{ fontSize: "18px", marginTop: "10px" }}>
              {produtos.nome}
            </h2>
            <p
              style={{
                color: "green",
                margin: "10px 0 10px",
                fontWeight: "bold",
              }}
            >
              R$ <strong style={{ fontSize: "25px" }}>{produtos.preco}</strong>{" "}
              no PIX / Boleto
            </p>
            <p>
              <strong>Categoria:</strong> {produtos.categoriaId}
            </p>

            <p style={{ fontSize: "13px", marginTop: "15px" }}>
              em até <strong>10x de R$ 150,99</strong> sem juros
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavCorpo;
