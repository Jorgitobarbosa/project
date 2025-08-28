import "./ApiToti.css";
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import lixo from "../imagens/lixo.png";
import carinho from "../imagens/carinho.png";
import editar from "../imagens/editar.png";

export default function ApiToti({ categoriaSelecionada }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [produtoParaDeletar, setProdutoParaDeletar] = useState(null);
  const [listaP, setListaP] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: "",
    categoriaId: "",
    imagens: [""],
  });

  useEffect(() => {
    listaDeProdutos();
  }, []);

  // TRAZENDO A LISTA DE PRODUTOS
  function listaDeProdutos() {
    fetch(`https://backend-toti.onrender.com/produtos`)
      .then((data) => data.json())
      .then((res) => {
        setListaP(res);
      });
  }

  // A FUNÇÃO QUE DELETA PRODUTO. DELETA NO BACKEND
  const abrirDeleteModal = (produto) => {
    setProdutoParaDeletar(produto);
    setShowDeleteModal(true);
  };

  const fecharDeleteModal = () => {
    setShowDeleteModal(false);
    setProdutoParaDeletar(null);
  };

  const confirmarDelete = () => {
    if (!produtoParaDeletar) return;

    fetch(
      `https://backend-toti.onrender.com/produtos/${produtoParaDeletar.id}`,
      {
        method: "DELETE",
      }
    ).then(() => {
      setListaP((prevLista) =>
        prevLista.filter((p) => p.id !== produtoParaDeletar.id)
      );
      fecharDeleteModal();
    });
  }; // fim da funcao deletar

  // FUNÇÃO QUE ATUALIZA O PRODUTO (AGORA ALTERA NO BACKEND)
  const abrirModalEdicao = (produto) => {
    setProdutoEditando({ ...produto });
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setProdutoEditando(null);
  };

  const salvarEdicao = () => {
    fetch(`https://backend-toti.onrender.com/produtos/${produtoEditando.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produtoEditando),
    })
      .then((res) => res.json())
      .then((data) => {
        setListaP((prevLista) =>
          prevLista.map((p) => (p.id === data.id ? data : p))
        );
        fecharModal();
      })
      .catch((err) => console.error("Erro ao atualizar produto:", err));
  }; // fim da funcao atualizar

  // FUNÇÃO DE ADICIONAR PRODUTO (AGORA ALTERA NO BACKEND)
  const abrirAddModal = () => {
    setNovoProduto({
      id: "",
      nome: "",
      preco: "",
      categoriaId: "",
      imagens: [""],
    });
    setShowAddModal(true);
  };

  const fecharAddModal = () => setShowAddModal(false);

  const adicionarProduto = () => {
    fetch("https://backend-toti.onrender.com/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoProduto),
    })
      .then((res) => res.json())
      .then((data) => {
        setListaP((prev) => [...prev, data]);
        fecharAddModal();
      })
      .catch((err) => console.error("Erro ao adicionar produto:", err));
  };

  // FILTRO DE CATEGORIAS
  const produtosFiltrados = categoriaSelecionada
    ? listaP.filter((p) => Number(p.categoriaId) === Number(categoriaSelecionada))
    : listaP;

  return (
    <div className="Toti-container-principal">
      <div>
        <h3 style={{ fontFamily: "Bitcount Prop Single", marginLeft: "5%" }}>
          Imperdível
        </h3>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button
          style={{ fontWeight: "bold", fontSize: "20px" }}
          variant="success"
          onClick={abrirAddModal}
        >
          Adicionar Produto
        </Button>
      </div>

      <div className="Toti-Pai-card">
        {produtosFiltrados.map((produtos) => (
          <div className="Toti-card" key={produtos.id}>
            <div className="Toti-container-buttons">
              <button onClick={() => abrirModalEdicao(produtos)}>
                <img src={editar} alt="Icone de Editar" />
              </button>

              <button
                className="deletar-produto"
                onClick={() => abrirDeleteModal(produtos)}
              >
                <img src={lixo} alt="Icone de lixeira" />
              </button>

              <button>
                <img src={carinho} alt="Carinho de Compra" />
              </button>
            </div>

            <div className="Toti-Info-card">
              <img
                src={produtos.imagens[0].url || produtos.imagens[""]}
                alt={produtos.nome}
                width={200}
              />

              <h2>{produtos.nome}</h2>
              <p
                style={{
                  color: "green",
                  margin: "10px 0 10px",
                  fontWeight: "bold",
                }}
              >
                R$
                <strong style={{ fontSize: "25px" }}>
                  {produtos.preco}
                </strong>{" "}
                no PIX / Boleto
              </p>
              <p>
                <strong>Categoria:</strong> {produtos.categoriaId}
              </p>

              <p style={{ fontSize: "13px", marginTop: "15px" }}>
                em até <strong>10x de R$ 150,99</strong> sem juros
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de edição */}
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
              <Form.Group className="mb-3">
                <Form.Label>URL da Imagem</Form.Label>
                <Form.Control
                  type="text"
                  value={produtoEditando.imagens[""]}
                  onChange={(e) =>
                    setProdutoEditando({
                      ...produtoEditando,
                      imagens: [ e.target.value],
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

      {/* Modal de adicionar */}
      <Modal show={showAddModal} onHide={fecharAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={novoProduto.nome}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, nome: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                value={novoProduto.preco}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, preco: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                value={novoProduto.categoriaId}
                onChange={(e) =>
                  setNovoProduto({
                    ...novoProduto,
                    categoriaId: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL da Imagem</Form.Label>
              <Form.Control
                type="text"
                value={novoProduto.imagens[""]}
                onChange={(e) =>
                  setNovoProduto({
                    ...novoProduto,
                    imagens: [ e.target.value ],
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharAddModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={adicionarProduto}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de excluir */}
      <Modal show={showDeleteModal} onHide={fecharDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o produto{" "}
          <strong>{produtoParaDeletar?.nome}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarDelete}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
