import React, { useState } from 'react';
import './ClientesCRUD.css';

const API_BASE = 'https://backend-toti.onrender.com/clientes';

function Clientes() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [clienteAutenticado, setClienteAutenticado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Lógica para el modo de "Registro"
    if (!isLogin) {
      try {
        const res = await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email }),
        });

        if (!res.ok) {
          throw new Error('Erro em registrar o usúario.');
        }
        
        const nuevoCliente = await res.json();
        setSuccess('Usúario registrado con éxito. Agora podes iniciar sessão.');
        setNome('');
        setEmail('');
        setIsLogin(true); // Cambia automáticamente a la vista de login
        
      } catch (err) {
        setError(err.message);
      }
    }
    // Lógica para el modo de "Inicio de Sesión"
    else {
      try {
        const res = await fetch(API_BASE);
        if (!res.ok) {
          throw new Error('Erro na busca de usúario');
        }
        const clientes = await res.json();
        const clienteEncontrado = clientes.find(cliente => cliente.email === email);
        
        if (clienteEncontrado) {
          setClienteAutenticado(clienteEncontrado); // Guarda el cliente autenticado en el estado
          setSuccess(`Olá, ${clienteEncontrado.nome}!`);
          setError(null);
        } else {
          throw new Error('Este e-mail não está registrado.');
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // --- NUEVAS FUNCIONES DE GESTIÓN DEL PERFIL ---

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_BASE}/${clienteAutenticado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: clienteAutenticado.nome, email: clienteAutenticado.email }),
      });

      if (!res.ok) {
        throw new Error('Erro em atualizar o usuario.');
      }

      setSuccess('Usúario atualizado con éxito.');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Está seguro de que deseja eliminar a sua conta? Esta assão é irreversível.')) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/${clienteAutenticado.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Erro em eliminar o usuario.');
      }
      
      setSuccess('Usuario eliminado con éxito. Redireccionando...');
      setClienteAutenticado(null); // Borra el estado de autenticación
      setEmail('');
      setNome('');
      setIsLogin(true); // Vuelve a la vista de login
      
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleLogout = () => {
    setClienteAutenticado(null);
    setError(null);
    setSuccess(null);
    setEmail('');
    setNome('');
    setIsLogin(true);
  };

  // --- RENDERIZADO CONDICIONAL ---
  if (clienteAutenticado) {
    return (
      <div className="login-container">
        <div className="profile-form">
          <h1 className="profile-title">Meu Perfil</h1>
          {success && <div className="login-success">{success}</div>}
          {error && <div className="login-error">{error}</div>}
          <div className="profile-info">
            <label>Nome:</label>
            <input
              type="text"
              value={clienteAutenticado.nome}
              onChange={(e) => setClienteAutenticado({ ...clienteAutenticado, nome: e.target.value })}
            />
          </div>
          <div className="profile-info">
            <label>E-mail</label>
            <input
              type="email"
              value={clienteAutenticado.email}
              onChange={(e) => setClienteAutenticado({ ...clienteAutenticado, email: e.target.value })}
            />
          </div>
          <div className="profile-actions">
            <button className="profile-button-update" onClick={handleUpdate}>Atualizar</button>
            <button className="profile-button-delete" onClick={handleDelete}>Eliminar Conta</button>
            <button className="profile-button-logout" onClick={handleLogout}>Encerar Sessão</button>
          </div>
        </div>
      </div>
    );
  }

  // Interfaz de Login/Registro (la misma que ya tenías)
  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">{isLogin ? 'Iniciar sessão' : 'Registrar-se'}</h1>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nome do usúario"
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
            {isLogin ? 'Iniciar sessão' : 'Registrar-se'}
          </button>
        </form>

        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success">{success}</div>}

        <p className="login-toggle">
          {isLogin ? 'Não tens uma Conta?' : 'Já tens uma conta?'}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? ' Registrar-se' : ' Iniciar sessão'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Clientes;
