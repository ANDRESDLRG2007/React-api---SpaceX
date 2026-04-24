import "./style.css"
import imagenUsuario from "../assets/imagen_usuario.png"

function Usuario(){
    return(
        <div className="usuario-wrapper">
                <h1>Usuario</h1>
            <img src={imagenUsuario} alt="Usuario" />
        </div>
    )
}

export default Usuario