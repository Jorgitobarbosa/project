import NavCorpo from "./Nav-Corpo";
import Perfil from "./Perfil";
import ProdutosPage from "./PaginaProdutos";
import MelhoresMarcas from "./MelhoresMarcas";

function Corpo() {
  return (
    <div>
      <NavCorpo />
      
      <div className="perfil-grupo">
        <Perfil />
      </div>
      <MelhoresMarcas/>
      <ProdutosPage />
    </div>
  );
}
export default Corpo;
