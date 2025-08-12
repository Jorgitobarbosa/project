import Cabecalho from "./Componentes/CABECALHO";
import Corpo from "./Componentes/CORPO";
import { createRoot } from "react-dom/client";


createRoot(document.getElementById("header")).render(<Cabecalho/>);

createRoot(document.getElementById("main")).render(<Corpo/>);
//const main = ReactDom.createRoot(document.getElementById("main"));
//main.render(<Corpo/>);
