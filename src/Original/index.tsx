import "./style.css"
import { useState, useEffect } from "react"
import noCargaImg from "../assets/nocarga.png"

interface Failure {
  time: number
  altitude: number | null
  reason: string
}

interface Launch {
  id: string
  name: string
  date_utc: string
  failures: Failure[]
  links: {
    patch: { small: string | null }
    webcast: string | null
  }
}

function Original() {
  const [launches, setLaunches] = useState<Launch[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api.spacexdata.com/v4/launches')
      const data = await res.json()
      const fallidas = data.filter(
        (l: Launch & { success: boolean | null }) => l.success === false
      )
      setLaunches(fallidas)
    }
    fetchData()
  }, [])

  return (
    <div className="cementerio-container">
      <div className="cementerio-header">
        <div className="cementerio-icon">💀</div>
        <h1>Cementerio Espacial</h1>
        <p>{launches.length} misiones que no llegaron a su destino</p>
      </div>

      <div className="tumbas">
        {launches.map((launch) => (
          <div key={launch.id} className="tumba">
            <div className="tumba-top">
              <img
                src={launch.links.patch.small ?? noCargaImg}
                alt={launch.name}
                className="tumba-patch"
              />
              <div className="tumba-info">
                <h2>{launch.name}</h2>
                <span className="tumba-fecha">
                  RIP {new Date(launch.date_utc).toLocaleDateString('es-CO', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            {launch.failures.length > 0 && (
              <div className="tumba-razon">
                {launch.failures.map((f, i) => (
                  <div key={i} className="failure-item">
                    <span className="failure-label">Causa de muerte</span>
                    <p>{f.reason}</p>
                    {f.altitude !== null && (
                      <span className="failure-alt">A {f.altitude} km de altitud</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {launch.links.webcast && (
              <a
                href={launch.links.webcast}
                target="_blank"
                rel="noreferrer"
                className="explosion-btn"
              >
                🔥 Ver la explosión
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Original