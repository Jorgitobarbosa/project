import NavCorpo from "./Nav-Corpo";
import Perfil from "./Perfil";
import ProdutosPage from "./PaginaProdutos";

function Corpo() {
  return (
    <div>
      <NavCorpo />
      <div className="perfil-grupo">
        <Perfil />
      </div>
      <ProdutosPage />
    </div>
  );
}
export default Corpo;
