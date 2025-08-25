import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from "react-bootstrap";
import lixo from "../imagens/lixo.png";
import carinho from "../imagens/carinho.png";
import editar from "../imagens/editar.png";

export default function ApiToti() {
  const [listaP, setListaP] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

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

  const deletarProduto = (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) return;

    fetch(`https://backend-toti.onrender.com/produtos/:id`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(() =>
        setListaP((prevLista) => prevLista.filter((p) => p.id !== id))
      );
  };

  const abrirModalEdicao = (produto) => {
    setProdutoEditando({ ...produto }); // Clona o produto para edição
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setProdutoEditando(null);
  };

  const salvarEdicao = () => {
  // Atualiza somente no estado local
  setListaP((prevLista) =>
    prevLista.map((p) =>
      p.id === produtoEditando.id ? produtoEditando : p
    )
  );

  fecharModal();
};


  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        justifyContent: "center",
        backgroundColor: "orange",
        paddingTop: "5%",
        paddingBottom: "5%",
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
              onClick={() => abrirModalEdicao(produtos)}
              style={{
                backgroundColor: "white",
                cursor: "pointer",
              }}
            >
              <img src={editar} alt="Icone de Editar" />
            </button>

            <button
              onClick={() => deletarProduto(produtos.id)}
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

          <img src={produtos.imagens[0].url} alt={produtos.nome} width={200} />
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
            R$ <strong style={{ fontSize: "25px" }}>{produtos.preco}</strong> no
            PIX / Boleto
          </p>
          <p>
            <strong>Categoria:</strong> {produtos.categoriaId}
          </p>

          <p style={{ fontSize: "13px", marginTop: "15px" }}>
            em até <strong>10x de R$ 150,99</strong> sem juros
          </p>
        </div>
      ))}

      
      <Modal show={showModal} onHide={fecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {produtoEditando && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={produtoEditando.nome}
                  onChange={(e) =>
                    setProdutoEditando({
                      ...produtoEditando,
                      nome: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="number"
                  value={produtoEditando.preco}
                  onChange={(e) =>
                    setProdutoEditando({
                      ...produtoEditando,
                      preco: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  type="text"
                  value={produtoEditando.categoriaId}
                  onChange={(e) =>
                    setProdutoEditando({
                      ...produtoEditando,
                      categoriaId: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={salvarEdicao}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
