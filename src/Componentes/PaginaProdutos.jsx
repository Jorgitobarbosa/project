import { useState } from "react";
import Categories from "./Categories";
import ApiToti from "./ApiToti";

export default function ProdutosPage() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  return (
    <div>
      <Categories onSelectCategory={setCategoriaSelecionada} />
      <ApiToti categoriaSelecionada={categoriaSelecionada} />
    </div>
  );
}
