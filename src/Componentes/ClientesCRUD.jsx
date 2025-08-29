import React, { useState } from "react";
import "./ClientesCRUD.css";

const API_BASE = "https://backend-toti.onrender.com/clientes";

function Clientes({ onLogin }) {
  // <<< recebe função do pai
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [clienteAutenticado, setClienteAutenticado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isLogin) {
      try {
        const res = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email }),
        });
        if (!res.ok) throw new Error("Erro em registrar o usúario.");

        await res.json();
        setSuccess("Usuário registrado com sucesso! Agora faça login.");
        setNome("");
        setEmail("");
        setIsLogin(true);
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("Erro na busca de usúario");

        const clientes = await res.json();
        const clienteEncontrado = clientes.find((c) => c.email === email);

        if (clienteEncontrado) {
          setClienteAutenticado(clienteEncontrado);
          setSuccess(`Olá, ${clienteEncontrado.nome}!`);
          setError(null);
          if (onLogin) onLogin(clienteEncontrado); // <<< avisa ao pai
        } else {
          throw new Error("Este e-mail não está registrado.");
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleLogout = () => {
    setClienteAutenticado(null);
    setError(null);
    setSuccess(null);
    setEmail("");
    setNome("");
    setIsLogin(true);
    if (onLogin) onLogin(null); // <<< avisa que saiu
  };

  if (clienteAutenticado) {
    return (
      <div className="login-container">
        <div className="profile-form">
          <h1 className="profile-title">Meu Perfil</h1>
          {success && <div className="login-success">{success}</div>}
          {error && <div className="login-error">{error}</div>}
          <div className="profile-actions">
            <button className="profile-button-logout" onClick={handleLogout}>
              Encerrar Sessão
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>{isLogin ? "Iniciar sessão" : "Registrar-se"}</h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nome do usuário"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Digite o seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            {isLogin ? "Iniciar sessão" : "Registrar-se"}
          </button>
        </form>
        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success">{success}</div>}
        <p className="login-toggle">
          {isLogin ? "Não tens uma Conta?" : "Já tens uma conta?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Registrar-se" : " Iniciar sessão"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Clientes;
