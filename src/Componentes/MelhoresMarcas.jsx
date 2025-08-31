import "./MelhoresMarcas.css"
import apple from "../imagens/apple.png";
import dell from "../imagens/dell.png";
import lenovo from "../imagens/lenovo.png";
import microsoft from "../imagens/microsoft.png";
import motorola from "../imagens/motorola.png";
import samsung from "../imagens/samsung.png";

export default function MelhoresMarcas () {
  return(
    <div className="banner">
      <h2>As melhores Marcas</h2>
      <div className="logos">
        <img src={apple} alt="apple" />
        <img src={microsoft} alt="dell" />
        <img src={dell} alt="microsoft" />
        <img src={samsung} alt="motorola" />
        <img src={motorola} alt="samsung" />
        <img src={lenovo} alt="lenovo" />
      </div>
    </div>
  )
};

