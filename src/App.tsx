import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from "./Home";
import Favoritos from "./Favorito";
import Informativa from "./Informativa";
import Usuario from "./Usuario";
import Original from "./Original";
import LaunchDetail from "./Launch";
import Login from './Auth/Login'
import Register from './Auth/Register'
import { AuthProvider } from './AuthContext'

function NavBar() {
  return (
    <nav className='c-menu'>
      <Link to="/"><span>Home</span></Link>
      <Link to="/favoritos">⭐<span>Favoritos</span></Link>
      <Link to="/original">💀<span>Cementerio</span></Link>
      <Link to="/informativa">ℹ️<span>Info</span></Link>
      <Link to="/usuario"><span>Usuario</span></Link>
    </nav>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/launch/:id" element={<LaunchDetail />} />
          <Route path="/informativa" element={<Informativa />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/original" element={<Original />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <NavBar />
      </Router>
    </AuthProvider>
  )
}

export default App;