import "./ApiToti.css";
import { useEffect, useState } from "react";
import { Modal, Button, Form, Carousel } from "react-bootstrap";
import lixo from "../imagens/lixo.png";
import carinho from "../imagens/carinho.png";
import editar from "../imagens/editar.png";

export default function ApiToti({ categoriaSelecionada, cliente }) {
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
    imagens: [],
  });

  // estados do carrinho
  const [carrinhoAtual, setCarrinhoAtual] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    listaDeProdutos();
  }, []);

  // LISTA DE PRODUTOS
  function listaDeProdutos() {
    fetch(`https://backend-toti.onrender.com/produtos`)
      .then((data) => data.json())
      .then((res) => {
        setListaP(res);
      });
  }

  // ABRIR E FECHAR DELETE
  const abrirDeleteModal = (produto) => {
    setProdutoParaDeletar(produto);
    setShowDeleteModal(true);
  };
  const fecharDeleteModal = () => {
    setShowDeleteModal(false);
    setProdutoParaDeletar(null);
  };

  // CONFIRMAR DELETE
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
  };

  // EDITAR PRODUTO
  const abrirModalEdicao = (produto) => {
    const imagensConvertidas = (produto.imagens || []).map((img) =>
      typeof img === "string" ? img : img.url
    );
    setProdutoEditando({ ...produto, imagens: imagensConvertidas });
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setProdutoEditando(null);
  };

  const salvarEdicao = () => {
    fetch(`https://backend-toti.onrender.com/produtos/${produtoEditando.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...produtoEditando,
        imagens: produtoEditando.imagens, // array de strings
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setListaP((prevLista) =>
          prevLista.map((p) => (p.id === data.id ? data : p))
        );
        fecharModal();
      })
      .catch((err) => console.error("Erro ao atualizar produto:", err));
  };

  // ADICIONAR PRODUTO NO BACKEND
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...novoProduto,
        imagens: novoProduto.imagens, // array de strings
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setListaP((prev) => [...prev, data]);
        fecharAddModal();
      })
      .catch((err) => console.error("Erro ao adicionar produto:", err));
  };

  // --- FUNÇÕES DE CARRINHO ---
  const adicionarAoCarrinho = async (produto) => {
    if (!cliente) {
      alert("Você precisa estar logado para adicionar ao carrinho.");
      return;
    }

    try {
      const res = await fetch(
        `https://backend-toti.onrender.com/carrinhos?clienteId=${cliente.id}`
      );
      const carrinhos = await res.json();
      let carrinho = carrinhos[0];

      if (!carrinho) {
        // cria novo carrinho
        const novoCarrinho = {
          clienteId: cliente.id,
          itens: [{ produtoId: produto.id, quantidade: 1 }],
        };
        const postRes = await fetch(
          "https://backend-toti.onrender.com/carrinhos",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoCarrinho),
          }
        );
        carrinho = await postRes.json();
      } else {
        // atualiza existente
        const itemExistente = carrinho.itens.find(
          (i) => i.produtoId === produto.id
        );
        if (itemExistente) {
          itemExistente.quantidade += 1;
        } else {
          carrinho.itens.push({ produtoId: produto.id, quantidade: 1 });
        }
        await fetch(
          `https://backend-toti.onrender.com/carrinhos/${carrinho.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carrinho),
          }
        );
      }

      setCarrinhoAtual(carrinho);
      alert(`${produto.nome} adicionado ao carrinho!`);
    } catch (err) {
      console.error("Erro ao adicionar no carrinho:", err);
    }
  };

  const removerDoCarrinho = async (produtoId) => {
    if (!cliente || !carrinhoAtual) return;

    try {
      const novoCarrinho = {
        ...carrinhoAtual,
        itens: carrinhoAtual.itens.filter((i) => i.produtoId !== produtoId),
      };

      await fetch(
        `https://backend-toti.onrender.com/carrinhos/${carrinhoAtual.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novoCarrinho),
        }
      );

      setCarrinhoAtual(novoCarrinho);
    } catch (err) {
      console.error("Erro ao remover item:", err);
    }
  };

  // FILTRO DE CATEGORIAS
  const produtosFiltrados = categoriaSelecionada
    ? listaP.filter(
        (p) => Number(p.categoriaId) === Number(categoriaSelecionada)
      )
    : listaP;

  return (
    <div className="Toti-container-principal">
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: "0 5%" }}
      >
        <h3 style={{ fontFamily: "Bitcount Prop Single" }}>Imperdível</h3>
        <div>
          <Button
            style={{ fontWeight: "bold", fontSize: "20px", marginRight: "10px" }}
            variant="success"
            onClick={abrirAddModal}
          >
            Adicionar Produto
          </Button>
          <Button
            style={{ fontWeight: "bold", fontSize: "20px" }}
            variant="primary"
            onClick={() => setShowCartModal(true)}
          >
            🛒 Carrinho
          </Button>
        </div>
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

              <button onClick={() => adicionarAoCarrinho(produtos)}>
                <img src={carinho} alt="Carrinho de Compra" />
              </button>
            </div>

            <div className="Toti-Info-card">
              {/* Slide de imagens */}
              <Carousel interval={3000}>
                {Array.isArray(produtos.imagens) &&
                  produtos.imagens.map((img, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={typeof img === "string" ? img : img.url}
                        alt={`${produtos.nome} ${index + 1}`}
                        style={{ maxHeight: "200px", objectFit: "contain" }}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>

              <h2>{produtos.nome}</h2>
              <p
                style={{
                  color: "green",
                  margin: "10px 0 10px",
                  fontWeight: "bold",
                }}
              >
                R$
                <strong style={{ fontSize: "25px" }}>{produtos.preco}</strong>
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
                <Form.Label>URLs das Imagens</Form.Label>
                <Form.Control
                  type="text"
                  value={produtoEditando.imagens.join(", ")}
                  onChange={(e) =>
                    setProdutoEditando({
                      ...produtoEditando,
                      imagens: [e.target.value],
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
              <Form.Label>URLs das Imagens</Form.Label>
              <Form.Control
                type="text"
                value={novoProduto.imagens.join(", ")}
                onChange={(e) =>
                  setNovoProduto({
                    ...novoProduto,
                    imagens: [e.target.value],
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

      {/* Modal de carrinho */}
      <Modal show={showCartModal} onHide={() => setShowCartModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Meu Carrinho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!cliente && <p>Você precisa estar logado para ver o carrinho.</p>}
          {cliente && !carrinhoAtual && <p>Seu carrinho está vazio.</p>}
          {cliente && carrinhoAtual && carrinhoAtual.itens.length === 0 && (
            <p>Seu carrinho está vazio.</p>
          )}
          {cliente && carrinhoAtual && carrinhoAtual.itens.length > 0 && (
            <ul>
              {carrinhoAtual.itens.map((item, idx) => {
                const produto = listaP.find((p) => p.id === item.produtoId);
                return (
                  <li key={idx} style={{ marginBottom: "10px" }}>
                    {produto?.nome} — Quantidade: {item.quantidade}
                    <Button
                      variant="danger"
                      size="sm"
                      style={{ marginLeft: "10px" }}
                      onClick={() => removerDoCarrinho(item.produtoId)}
                    >
                      Remover
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCartModal(false)}>
            Fechar
          </Button>
          {cliente && carrinhoAtual && carrinhoAtual.itens.length > 0 && (
            <Button
              variant="success"
              onClick={() => alert("Compra simulada com sucesso!")}
            >
              Finalizar Compra
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
