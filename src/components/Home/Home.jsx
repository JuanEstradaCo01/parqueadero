import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="containerHome">
        <h1>Parqueadero Santa Rosa</h1>
        <Link to="/load">
          <button id="start-btn">Iniciar el Sistema</button>
        </Link>
        <p>Bienvenido al sistema de parqueadero de Santa Rosa</p>
      </div>
    </>
  );
}

export default Home;