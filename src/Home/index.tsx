import "./style.css"
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import checkImg from "../assets/check.png"
import deleteImg from "../assets/boton-eliminar.png"
import noCargaImg from "../assets/nocarga.png"

interface Launch {
  id: string
  name: string
  date_utc: string
  success: boolean | null
  flight_number: number
  upcoming: boolean
  links: {
    patch: { small: string | null }
  }
}

interface Rocket {
  id: string
  name: string
  type: string
  active: boolean
  first_flight: string
  country: string
  flickr_images: string[]
}

type FiltroTipo = 'todos' | 'proximos' | 'exitosos' | 'cohetes'

function Home() {
  const [launches, setLaunches] = useState<Launch[]>([])
  const [rockets, setRockets] = useState<Rocket[]>([])
  const [filtro, setFiltro] = useState<FiltroTipo>('todos')
  const [busqueda, setBusqueda] = useState('')

  const filtros: FiltroTipo[] = ['todos', 'proximos', 'exitosos', 'cohetes']

  // igual que la guia: el useEffect depende del filtro y cambia el endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filtro === 'cohetes') {
          const res = await fetch('https://api.spacexdata.com/v4/rockets')
          const data = await res.json()
          setRockets(data)
        } else {
          const endpoint =
            filtro === 'proximos' ? 'upcoming'
            : ''  // todos o exitosos
          const url = endpoint
            ? `https://api.spacexdata.com/v4/launches/${endpoint}`
            : 'https://api.spacexdata.com/v4/launches'
          const res = await fetch(url)
          const data = await res.json()
          setLaunches(data)
        }
      } catch (error) {
        console.error('Error cargando datos:', error)
      }
    }
    fetchData()
  }, [filtro])  // igual que con la liga [filtro] hace que se re-ejecute al cambiar

  const lanzamientosFiltrados = launches.filter((l) => {
    if (filtro === 'exitosos') {
      return l.success === true && (busqueda.length < 3 ? true : l.name.toLowerCase().includes(busqueda.toLowerCase()))
    }
    return busqueda.length < 3 ? true : l.name.toLowerCase().includes(busqueda.toLowerCase())
  })

  const cohetesFiltrados = rockets.filter((r) =>
    busqueda.length < 3 ? true : r.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>SpaceX</h1>
        <p>Lanzamientos y Cohetes</p>
      </div>

      <div className="filtros">
        {filtros.map((f) => (
          <button key={f} onClick={() => setFiltro(f)} className={filtro === f ? 'activo' : ''}>
            {f}
          </button>
        ))}
      </div>

      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar misión (mín. 3 letras)..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="launches-lista">

        {/* si el filtro es cohetes muestra tabla, si no muestra cards — igual que en la liga colombiana con posiciones vs estadisticas */}
        {filtro === 'cohetes' ? (
          <table className="tabla-cohetes">
            <thead>
              <tr>
                <th>Cohete</th>
                <th>Tipo</th>
                <th>Activo</th>
                <th>Primer vuelo</th>
              </tr>
            </thead>
            <tbody>
              {cohetesFiltrados.map((rocket) => (
                <tr key={rocket.id}>
                  <td>{rocket.name}</td>
                  <td>{rocket.type}</td>
                  <td>
                    {rocket.active
                      ? <img src={checkImg} alt="Activo" className="status-icon" />
                      : <img src={deleteImg} alt="Inactivo" className="status-icon" />}
                  </td>
                  <td>{rocket.first_flight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          lanzamientosFiltrados.map((launch) => (
            <Link to={`/launch/${launch.id}`} key={launch.id} className="launch-card">
              <div className="launch-patch">
                <img
                  src={launch.links.patch.small ?? noCargaImg}
                  alt={launch.name}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = noCargaImg }}
                />
              </div>
              <div className="launch-info">
                <strong>{launch.name}</strong>
                <span>{launch.date_utc.slice(0, 10)}</span>
              </div>
              <div className="launch-status">
                {launch.upcoming ? 'Próximo'
                  : launch.success ? (
                    <span className="status-item">
                      <img src={checkImg} alt="Exitoso" className="status-icon" />
                      <span>Exitoso</span>
                    </span>
                  ) : (
                    <span className="status-item">
                      <img src={deleteImg} alt="Fallido" className="status-icon" />
                      <span>Fallido</span>
                    </span>
                  )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default Home