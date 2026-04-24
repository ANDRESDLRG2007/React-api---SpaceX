import "./style.css"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import checkImg from "../assets/check.png"
import deleteImg from "../assets/boton-eliminar.png"
import noCargaImg from "../assets/nocarga.png"

interface LaunchBasic {
  id: string
  name: string
  date_utc: string
  success: boolean | null
  links: { patch: { small: string | null } }
}

function Favoritos() {
  const [favorites, setFavorites] = useState<LaunchBasic[]>([])

  // recordar
  // (esta parte lee los ids favoritos desde localStorage y carga cada lanzamiento favorito)
  useEffect(() => {
    const ids: string[] = JSON.parse(localStorage.getItem('spacex-favorites') || '[]')

    const fetchFavorites = async () => {
      const results = await Promise.all(
        ids.map((id) =>
          fetch(`https://api.spacexdata.com/v4/launches/${id}`).then((r) => r.json())
        )
      )
      setFavorites(results)
    }

    if (ids.length > 0) fetchFavorites()
  }, [])

  // recordar
  // (esta función elimina un lanzamiento de favoritos y actualiza la lista mostrada)
  const removeFromFavorites = (id: string) => {
    const ids: string[] = JSON.parse(localStorage.getItem('spacex-favorites') || '[]')
    const updated = ids.filter((f) => f !== id)
    localStorage.setItem('spacex-favorites', JSON.stringify(updated))
    setFavorites((prev) => prev.filter((l) => l.id !== id))
  }

  return (
    <div className="favoritos-container">
      <h1>Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes lanzamientos favoritos. Agrega desde el detalle de cada misión.</p>
      ) : (
        <div className="favoritos-lista">
          {favorites.map((launch) => (
            <div key={launch.id} className="favorito-card">
              <img src={launch.links.patch.small ?? noCargaImg} alt={launch.name} />
              <div className="favorito-info">
                <Link to={`/launch/${launch.id}`}>{launch.name}</Link>
                <span>{launch.date_utc.slice(0, 10)}</span>
                <span>{launch.success ? (
                  <span className="status-item">
                    <img src={checkImg} alt="Exitoso" className="status-icon" />
                    <span>Exitoso</span>
                  </span>
                ) : (
                  <span className="status-item">
                    <img src={deleteImg} alt="Fallido" className="status-icon" />
                    <span>Fallido</span>
                  </span>
                )}</span>
              </div>
              <button onClick={() => removeFromFavorites(launch.id)} className="delete-btn" aria-label="Eliminar favorito">
                <img src={deleteImg} alt="Eliminar favorito" className="delete-icon" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favoritos