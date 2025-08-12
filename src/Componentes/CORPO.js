import NavCorpo from "./Nav-Corpo";
import Perfil from "./Perfil";

function Corpo() {
  return (
    <div>
      <NavCorpo />
      <div className="perfil">
        <Perfil />
      </div>
    </div>
  );
}
export default Corpo;
