import Cabecalho from "./Componentes/CABECALHO";
import Corpo from "./Componentes/CORPO";
import ReactDom from "react-dom/client";
import Footer from "./Componentes/footer";
import 'bootstrap/dist/css/bootstrap.min.css';




//createRoot(document.getElementById("header")).render(<Cabecalho/>);
//createRoot(document.getElementById("main")).render(<Corpo/>);
const root = ReactDom.createRoot(document.getElementById("header"));
root.render(<Cabecalho/>);

const root1 = ReactDom.createRoot(document.getElementById("main"));
root1.render(<Corpo/>);

const root2 = ReactDom.createRoot(document.getElementById("footer"));
root2.render(<Footer/>)