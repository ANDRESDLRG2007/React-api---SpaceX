import "./style.css"
import imagenUsuario from "../assets/imagen_usuario.png"
import { useState } from 'react'
import { useAuth } from '../AuthContext'
import Login from '../Auth/Login'
import Register from '../Auth/Register'

function Usuario(){
  const { user, logout } = useAuth()
  const [view, setView] = useState<'none'|'login'|'register'>('none')

  const handleLogout = async () => {
    await logout()
  }

  if (user) {
    return (
      <div className="usuario-wrapper">
        <h1>Usuario</h1>
        <div className="usuario-logged">
          <img src={imagenUsuario} alt="Usuario" className="usuario-avatar" />
          <div className="usuario-actions">
            <p className="usuario-email">{user.email}</p>
            <button onClick={handleLogout} className="usuario-logout">Salir</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="usuario-wrapper">
      <h1>Usuario</h1>
      <p>Inicia sesión o regístrate para acceder a funciones como favoritos.</p>
      <div className="usuario-cta">
        <button onClick={() => setView('login')} className="btn">Iniciar sesión</button>
        <button onClick={() => setView('register')} className="btn outline">Registrarse</button>
      </div>

      <div className="usuario-form">
        {view === 'login' && <Login onSuccess={() => setView('none')} />}
        {view === 'register' && <Register onSuccess={() => setView('none')} />}
      </div>
    </div>
  )
}

export default Usuario