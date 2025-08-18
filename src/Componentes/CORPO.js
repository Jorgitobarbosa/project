import NavCorpo from "./Nav-Corpo";
import Perfil from "./Perfil";
import TesteListaProdutos from "./TesteListaProdutos";

function Corpo() {
  return (
    <div>
      <NavCorpo />
      <div className="perfil">
        <Perfil />
      </div>
      <TesteListaProdutos/>
    </div>
  );
}
export default Corpo;
