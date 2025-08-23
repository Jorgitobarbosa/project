import { useEffect, useState } from "react";

export default function ApiToti() {
  const [listaP, setListaP] = useState([]);

  useEffect(() => {
    listaDeProdutos();
  }, []);

  function listaDeProdutos() {
    fetch(`https://backend-toti.onrender.com/produtos`)
      .then((data) => data.json())
      .then((res) => {
        setListaP(res);
    
      });
  }
  
  return (
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
            padding: "10px",
            backgroundColor: "white"
          }}
        >
          <img src={produtos.imagens[0].url} alt={produtos.nome} width={200} />
          <h2>{produtos.nome}</h2>
          <p> Preço: R$ {produtos.preco}</p>
          <p>Categoria: {produtos.categoriaId}</p>
        </div>
      ))}
    </div>
  );
}
