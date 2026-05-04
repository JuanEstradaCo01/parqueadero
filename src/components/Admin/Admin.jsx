import "./admin.css";
import Navbarnav from "../Nav/Navbarnav";
import agregar from "../../assets/agregar.png";
import editar from "../../assets/editar.png";
import eliminar from "../../assets/eliminar.png";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <>
      <Navbarnav />
      <h2>Panel de Administración</h2>
      <div class="cards-container">
        <Link to="/admin/agregar" class="card-link">
          <div class="card">
            <img src={agregar} alt="addUser" />
            <h3>Agregar usuario</h3>
          </div>
        </Link>

        <Link to="/admin/editar" class="card-link">
          <div class="card">
            <img src={editar} alt="editUser" />
            <h3>Editar usuario</h3>
          </div>
        </Link>

        <Link to="/admin/eliminar" class="card-link">
          <div class="card">
            <img src={eliminar} alt="deleteUser" />
            <h3>Eliminar usuario</h3>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Admin;
