import "./Perfil.css";
import Maylin from "../imagens/Maylin.jpg";
import jorgito from "../imagens/jorgito.jpg";
import Jose from "../imagens/Jose.jpg";
import Clarisa from "../imagens/Clarisa.jpg";
import Sebastian from "../imagens/Sebastian.jpg";

export default function Perfil() {
  return (
    <div className="container-perfil-grupo">
      <h2>Turma 54</h2>
      <div className="container-Info-perfil-grupo">
        <div className="Jorgito">
          <figure>
            <img src={jorgito} alt="Foto de Jorgito" />
          </figure>
          <h3>Jorgito</h3>
          <p>
            Sou de nacionalidade Guineense. Cheguei no Brasil, no ano de 2023.
            Agora estou fazendo o curso de Front-End da Toti.
          </p>
        </div>

        <div className="Jose">
          <figure>
            <img src={Jose} alt="Foto de Jose" />
          </figure>
          <h3>José</h3>
          <p>
            Meu nome é José Alberto Guatume Quiroz, sou venezuelano, casado, pai de dois filhos e avô de um lindo neto. Sou grato pela oportunidade proporcionada pela Toti na realização deste curso.
          </p>
        </div>

        <div className="Maylin">
          <figure>
            <img src={Maylin} alt="Foto de Maylin" />
          </figure>
          <h3>Maylin</h3>
          <p>
            Meu nome é Maylin Montilla, sou venezuelana, tenho 38 anos,
            Engenharia em Informática, estou no Brasil desde 2018, Moro Em
            Torres, Rs. Casada, Mãe de Duas meninas, e amo fazer crochê no
            meu tempo livre!
          </p>
        </div>

        <div className="Sebastian">
          <figure>
            <img src={Sebastian} alt="Foto de Sebastian" />
          </figure>
          <h3>Sebastian</h3>
          <p>
           Olá! Sou Sebastian, tenho 21 anos, natural da Venezuela e moro no Brasil há 7 anos. Estou muito agradecido por fazer o curso de Front-End da Toti e estou sempre em busca de aprender e crescer pessoal e profissionalmente.
          </p>
        </div>

        <div className="Clarissa">
          <figure>
            <img src={Clarisa} alt="Foto de Clarissa" />
          </figure>
          <h3>Clarisa</h3>
          <p>
            Meu nome é Rocio Clarisa Méndez Leguizamón, tenho 21 anos e sou de nacionalidade paraguaia. Cheguei ao Brasil em 2021 e desde então tenho me dedicado ao desenvolvimento profissional e à aquisição de novas habilidades.
          </p>
        </div>
      </div>
    </div>
  );
}
