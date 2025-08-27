import "./footer.css";
import facebook from "../imagens/facebook.png";
import linkedin from "../imagens/linkedin.png";
import youtube from "../imagens/youtube.png";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="newsletter">
        <div className="newsletter-topo">
          <h2>Junte-se a nossa newsletter</h2>
          <p>Enviaremos a você novidades uma vez por semana. Sem spam.</p>
        </div>

        <div className="newsletter-form">
          <input type="text" placeholder="Digite o seu primeiro nome" />
          <input type="email" placeholder="Digite seu e-mail" />
          <button>Inscreva-se</button>
        </div>
      </div>

      {/* Links */}
      <div className="footer-links">
        <div>
          <h3>Institucional</h3>
          <ul>
            <li>
              <a href="#">Sobre nós</a>
            </li>
            <li>
              <a href="#">Soluções</a>
            </li>
            <li>
              <a href="#">Fale Conosco</a>
            </li>
            <li>
              <a href="#">Loja Física</a>
            </li>
            <li>
              <a href="#">Perguntas Frequentes</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Políticas</h3>
          <ul>
            <li>
              <a href="#">Política de troca e devolução</a>
            </li>
            <li>
              <a href="#">Política de entrega</a>
            </li>
            <li>
              <a href="#">Política de pagamento</a>
            </li>
            <li>
              <a href="#">Política de garantia</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Privacidade</h3>
          <ul>
            <li>
              <a href="#">Aviso de privacidade</a>
            </li>
            <li>
              <a href="#">Política de Cookies</a>
            </li>
            <li>
              <a href="#">Termos de uso</a>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      {/* Rodapé final */}
      <div className="footer-bottom">
        <div className="Info-final">
          <p>
            AGASUS SEMINOVOS. | CNPJ 18.638.476/0001-18 - (31) 97222 5503 © 2025
            Voke. Todos os direitos reservados.
          </p>
        </div>

        <div className="social-icons">
          <a href="#">
            <img src={linkedin} alt="icone linkedin" />
          </a>
          <a href="#">
            <img src={facebook} alt="icone facebook" />
          </a>
          <a href="#">
            <img src={youtube} alt="icone youtube" />
          </a>
        </div>
      </div>
    </footer>
  );
}
