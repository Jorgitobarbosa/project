import ReactDom from "react-dom/client";
import Cabecalho from "./Componentes/CABECALHO";
import Corpo from "./Componentes/CORPO";
import Rodape from "./Componentes/Rodape";


const header = ReactDom.createRoot(document.getElementById("header"));
header.render(<Cabecalho/>);

const main = ReactDom.createRoot(document.getElementById("main"));
main.render(<Corpo/>);

const footer = ReactDom.createRoot(document.getElementById("footer"));
footer.render(<Rodape/>);