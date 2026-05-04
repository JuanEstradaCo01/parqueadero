import "./addUser.css";
import Navbarnav from "../../Nav/Navbarnav";
import { useState, useContext } from "react";
import { parkingContext } from "../../../context/context.jsx";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function AddUser() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); 

  let { users, addUser } = useContext(parkingContext);

  const register = async (evt) => {
    evt.preventDefault();

    if (
      username === "" ||
      password === "" ||
      id === "" ||
      phone === "" ||
      email === ""
    ) {
      alert("Completa todos los campos");
      return;
    }

    document.getElementById("registro-form").reset();

    const user = {
      idCajero: users.length + 1,
      identificacion: id,
      username,
      phone,
      idCiudad: 19701,
      email,
      fechaCreacion: new Date().toLocaleString(),
      password,
    }

    addUser(user)

    alert("¡Registro exitoso!")
  };

  return (
    <>
      <Navbarnav />

      <div className="registro-container">
        <h2>Agregar usuario</h2>
        <form id="registro-form">
          <div className="input-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type="text"
              id="usuarioRegistro"
              name="usuario"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="contrasenaRegistro"
              name="contrasena"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="identificacion">Identificación</label>
            <input
              onChange={(e) => {
                setId(e.target.value);
              }}
              type="text"
              id="identificacion"
              name="identificacion"
              placeholder="Ingresa tu identificación"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              type="text"
              id="telefono"
              name="telefono"
              placeholder="Ingresa tu teléfono"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu email"
              required
            />
          </div>

          <button onClick={register} type="submit" className="btn-registro">
            Registrarse
          </button>
        </form>
      </div>
    </>
  );
}

export default AddUser;
