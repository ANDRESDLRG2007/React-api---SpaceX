import { useParams, Link } from "react-router"
import { useEffect, useState } from "react"
import "./style.css"
import checkImg from "../assets/check.png"
import deleteImg from "../assets/boton-eliminar.png"
import noCargaImg from "../assets/nocarga.png"

interface Launch {
  id: string
  name: string
  date_utc: string
  success: boolean | null
  upcoming: boolean
  flight_number: number
  details: string | null
  links: {
    patch: { small: string | null; large: string | null }
    webcast: string | null
    wikipedia: string | null
    article: string | null
  }
}

function LaunchDetail() {
  const { id } = useParams<{ id: string }>()
  const [launch, setLaunch] = useState<Launch | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  // recordar
  // (esta lógica carga los datos del lanzamiento seleccionado usando el id de la URL)
  // (también verifica si este lanzamiento ya está marcado como favorito en localStorage)
  useEffect(() => {
    if (!id) return
    const favs = JSON.parse(localStorage.getItem('spacex-favorites') || '[]')
    setIsFavorite(favs.includes(id))

    fetch(`https://api.spacexdata.com/v4/launches/${id}`)
      .then((r) => r.json())
      .then(setLaunch)
      .catch(console.error)
  }, [id])

  // recordar
  // (esta función agrega o quita el lanzamiento de la lista de favoritos en localStorage)
  const toggleFavorite = () => {
    if (!id) return
    let favs = JSON.parse(localStorage.getItem('spacex-favorites') || '[]')
    if (favs.includes(id)) {
      favs = favs.filter((f: string) => f !== id)
      setIsFavorite(false)
    } else {
      favs.push(id)
      setIsFavorite(true)
    }
    localStorage.setItem('spacex-favorites', JSON.stringify(favs))
  }

  if (!launch) return <div className="loading">Cargando...</div>

  return (
    <div className="detail-container">
      <Link to="/" className="back-btn">← Volver</Link>

      <div className="detail-hero">
        <img
          src={launch.links.patch.large ?? launch.links.patch.small ?? noCargaImg}
          alt={launch.name}
          className="detail-patch"
        />
        <h1>{launch.name}</h1>
        <p className="detail-status">
          {launch.upcoming ? 'Próximo'
            : launch.success ? (
              <span className="status-item">
                <img src={checkImg} alt="Misión exitosa" className="status-icon" />
                <span>Misión exitosa</span>
              </span>
            ) : (
              <span className="status-item">
                <img src={deleteImg} alt="Misión fallida" className="status-icon" />
                <span>Misión fallida</span>
              </span>
            )}
        </p>
        <button onClick={toggleFavorite} className="fav-btn">
          {isFavorite ? '⭐ En favoritos' : '☆ Agregar a favoritos'}
        </button>
      </div>

      <div className="detail-cards">
        <div className="detail-card">
          <h2>Detalles</h2>
          <p><span>Vuelo #</span>{launch.flight_number}</p>
          <p><span>Fecha</span>{new Date(launch.date_utc).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          {launch.details && <p><span>Descripción</span>{launch.details}</p>}
        </div>

        <div className="detail-card">
          <h2>Links</h2>
          {launch.links.webcast && (
            <a href={launch.links.webcast} target="_blank" rel="noreferrer" className="link-btn youtube">
              Ver en YouTube
            </a>
          )}
          {launch.links.wikipedia && (
            <a href={launch.links.wikipedia} target="_blank" rel="noreferrer" className="link-btn wiki">
              Wikipedia
            </a>
          )}
          {launch.links.article && (
            <a href={launch.links.article} target="_blank" rel="noreferrer" className="link-btn article">
              Artículo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default LaunchDetail