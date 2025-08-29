import { useState } from "react";
import Categories from "./Categories";
import ApiToti from "./ApiToti";
import Clientes from "./ClientesCRUD";

export default function ProdutosPage() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  return (
    <div>
      <Clientes/>
      <Categories onSelectCategory={setCategoriaSelecionada} />
      <ApiToti categoriaSelecionada={categoriaSelecionada} />
    </div>
  );
}
