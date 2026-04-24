import "./style.css"

function Informativa() {
  return (
    <div className="info-wrapper">
      <div className="info-bg">
        <div className="info-stars"></div>

        <div className="info-content">
          <div className="info-logo-area">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg"
              alt="SpaceX"
              className="spacex-logo"
            />
            <p className="info-subtitle">Desarrollado por De La rue</p>
          </div>

          <div className="info-description-box">
            <p>API con datos reales de todos los lanzamientos, cohetes, cápsulas y tripulantes de SpaceX</p>
          </div>

          <div className="info-stats">
            <div className="info-stat">
              <strong>200+</strong>
              <span>Lanzamientos</span>
            </div>
            <div className="info-stat">
              <strong>4</strong>
              <span>Cohetes</span>
            </div>
            <div className="info-stat">
              <strong>v4</strong>
              <span>API versión</span>
            </div>
          </div>

          <div className="info-footer">
            <span>api.spacexdata.com/v4</span>
            <span>v 1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Informativa