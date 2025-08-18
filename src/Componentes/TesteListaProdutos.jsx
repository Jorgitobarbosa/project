import { useEffect, useState } from "react";
import "./TesteListaProdutos.css";

export default function TesteListaProdutos() {
  const [lista, setLista] = useState([]);
  const [procurar, setProcurar] = useState("");

  useEffect(() => {
    listaProdutos();
  }, []);

  const listaProdutos = () => {
    fetch("https://dummyjson.com/products")
      .then((data) => data.json())
      .then((res) => {
        setLista(res.products);
      });
  };

  useEffect(() => {
    filtrarProdutos(procurar);
  }, [procurar]);

  function filtrarProdutos(filter) {
    fetch(`https://dummyjson.com/products/search?q=${filter}`)
      .then((data) => data.json())
      .then((res) => setLista(res.products));
  }

  const deletarProduto = (id) => {
    fetch(`https://dummyjson.com/products/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() =>
        setLista((prevLista) => prevLista.filter((p) => p.id !== id))
      );
  };

  return (
    <div>
      <div className="pesquisa-produto">
        <input
          type="text"
          placeholder="Encontre o seu Produto"
          onChange={(e) => setProcurar(e.target.value)}
          value={procurar}
        />
      </div>

      <div className="container-produtos">
        {lista.map((products) => (
          <div key={products.id} className="conatiner-produtos-item">
            <button className="produto-stock">Restam: {products.stock}</button>

            <a href="#">
              <img src={products.thumbnail} alt={products.title} width={200} />
            </a>

            <button className="classifica-produtos">
              Classificação: {products.rating}
            </button>

            <h3>
              <a href="#">{products.title}</a>
            </h3>

            <p className="preço-produto">
              R$<strong style={{ fontSize: "25px" }}>{products.price}</strong>{" "}
              no PIX / Boleto
            </p>
            <p>
              <strong className="categoria-produto">Categoria: </strong>
              {products.category}
            </p>

            <button
              onClick={() => deletarProduto(products.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px",
              }}
            >
              Deletar
            </button>
          </div>
        ))} 
      </div>
    </div>
  );
}
