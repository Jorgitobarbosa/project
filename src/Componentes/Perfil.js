import "./Perfil.css";
import JorgitoPerfil from "../imagens/JorgitoPerfil.jpg";
import Maylin from "../imagens/Maylin.jpg";

export default function Perfil() {
  return (
    <div className="container-perfil-grupo">
      <h2>Turma 54</h2>
      <div className="container-Info-perfil-grupo">
        <div className="Jorgito">
          <figure>
            <img src={JorgitoPerfil} alt="Foto de Jorgito" />
          </figure>
          <h3>Jorgito</h3>
          <p>
            Sou de nacionalidade Guineense. Cheguei no Brasil, no ano de 2023.
            Agora estou fazendo o curso de Front-End da Toti.
          </p>
        </div>

        <div className="Jose">
          <figure>
            <img src={JorgitoPerfil} alt="Foto de Jose" />
          </figure>
          <h3>José</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sed
            nisi dolor necessitatibus saepe error harum, ipsa, pariatur quae ex
            soluta. Quas assumenda nihil quod minima non? Omnis, iure minus?
          </p>
        </div>

        <div className="Maylin">
          <figure>
            <img src={Maylin} alt="Foto de Maylin" />
          </figure>
          <h3>Maylin</h3>
          <p>
            Meu nome é Maylin Montilla, sou venezuelana, tenho 38 anos,
            Engenharia em Informática, estou no Brasil desde 2018, Moto Em
            Torres, Rs. Casada, Mãe de Duas meninas, e amo fazer crochê no
            meu tempo livre!
          </p>
        </div>

        <div className="Sebastian">
          <figure>
            <img src={JorgitoPerfil} alt="Foto de Sebastian" />
          </figure>
          <h3>Sebastian</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sed
            nisi dolor necessitatibus saepe error harum, ipsa, pariatur quae ex
            soluta. Quas assumenda nihil quod minima non? Omnis, iure minus?
          </p>
        </div>

        <div className="Clarissa">
          <figure>
            <img src={JorgitoPerfil} alt="Foto de Clarissa" />
          </figure>
          <h3>Clarissa</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sed
            nisi dolor necessitatibus saepe error harum, ipsa, pariatur quae ex
            soluta. Quas assumenda nihil quod minima non? Omnis, iure minus?
          </p>
        </div>
      </div>
    </div>
  );
}
