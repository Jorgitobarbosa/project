import { useState } from "react";
import Categories from "./Categories";
import ApiToti from "./ApiToti";
import Clientes from "./ClientesCRUD";

export default function ProdutosPage() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [cliente, setCliente] = useState(null); // guarda cliente logado

  return (
    <div>
      <Clientes onLogin={setCliente} /> {/* pega cliente do login */}
      <Categories onSelectCategory={setCategoriaSelecionada} />
      <ApiToti categoriaSelecionada={categoriaSelecionada} cliente={cliente} />
    </div>
  );
}
