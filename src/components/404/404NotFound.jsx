import "./404NotFound.css";
import { Link } from "react-router-dom";    

function NotFoundPage() {
  return (
    <>
      <div id="container404">
        <div class="container">
          <div class="content">
            <h1 className="h1404">404</h1>
            <p className="p404">¡Pagina no encontrada!</p>
            <Link to={"/login"} class="back-button">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;