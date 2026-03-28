import { BrowserRouter as Router, Route, Routes, Link} from 'react-router';
import './App.css';
import Home from "./Home";
import Favoritos from "./Favorito";
import Informativa from "./Informativa";
import Usuario from "./Usuario";
import Original from "./Original";

function App() {
  return (
    <Router>
      <nav className='c-menu'>
        <Link to="/"></Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/original">Original</Link>
        <Link to="/informativa">Informativa</Link>
        <Link to="/usuario">Usuario</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/informativa" element={<Informativa />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/original" element={<Original />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App;