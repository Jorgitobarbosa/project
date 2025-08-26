import ApiToti from "./ApiToti";
import NavCorpo from "./Nav-Corpo";
import Perfil from "./Perfil";
import Categories from "./Categories";


 


function Corpo() {
  return (
    <div>
      <NavCorpo />
      <div className="perfil-grupo">
        <Perfil />
      </div>
      <Categories/>
      <ApiToti />
    </div>
  );
}
export default Corpo;
