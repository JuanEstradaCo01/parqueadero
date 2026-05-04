import "./editUserId.css";
import { useParams } from "react-router-dom";
import Navbarnav from "../../..//Nav/Navbarnav";
import { useState, useContext } from "react";
import { parkingContext } from "../../../../context/context";
import { useNavigate } from "react-router-dom";

function EditUserId() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { users, editUserId } = useContext(parkingContext);
  const user = users.find((u) => u.idCajero === parseInt(id));

  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const editUser = async (evt) => {
    evt.preventDefault();

    document.getElementById("form-container").reset();

    const updatedUser = {
      idCajero: user.idCajero,
      username: username || user.username,
      phone: phone || user.phone,
      identificacion: identificacion || user.identificacion,
      email: email || user.email,
      password: password || user.password
    }

    editUserId(updatedUser)

    alert("¡Usuario editado exitosamente!");
    navigate("/admin/editar");
  }

  return (
    <>
      <Navbarnav />
      <h1 className="h1">Editar Usuario</h1>

      <form id="form-container">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ingresa el usuario"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Teléfono</label>
            <input
              type="tel"
              className="form-input"
              placeholder="Ingresa teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Identificación</label>
            <input
              type="text"
              className="form-input"
              placeholder="Número de identificación"
              value={identificacion}
              onChange={(e) => setIdentificacion(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="correo@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-input"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button onClick={editUser} type="submit" className="form-button">
          Enviar
        </button>
      </form>
    </>
  );
}

export default EditUserId;
