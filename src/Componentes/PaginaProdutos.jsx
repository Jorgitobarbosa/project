import { useState } from "react";
import ClientesCRUD from "./ClientesCRUD";
import ApiToti from "./ApiToti";
import Categories from "./Categories";

export default function PaginaProdutos() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [clienteLogado, setClienteLogado] = useState(null);

  return (
    <div>
      {/* Área de clientes */}
      <ClientesCRUD
        onLogin={setClienteLogado}
        onLogout={() => setClienteLogado(null)}
      />

      {/* Área de categorias */}
      <Categories onSelectCategory={setCategoriaSelecionada} />

      {/* Produtos + Carrinho (recebe cliente logado) */}
      <ApiToti
        categoriaSelecionada={categoriaSelecionada}
        cliente={clienteLogado}
      />
    </div>
  );
}
