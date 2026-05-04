import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbarnav from "../Nav/Navbarnav";
import "./login.css";
import { parkingContext } from "../../context/context.jsx";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { users, addSession } = useContext(parkingContext);

  const signIn = async (evt) => {
    evt.preventDefault();

    if (username === "" || password === "") {
      alert("Completa todos los campos");
      return;
    }

    document.getElementById("login-form").reset();

    // Buscar el usuario en el contexto
    const user = users.find((u) => u.username === username);

    if (user) {
      if (user.password === password) {
        alert("¡Inicio de sesión exitoso! Bienvenido " + username);
        addSession(user);
        navigate("/dashboard");
      } else {
        alert("Contraseña incorrecta");
      }
    } else {
      alert("El usuario no existe.");
    }
  };

  return (
    <>
      <div className="containerLogin">
        <h1>Iniciar Sesión</h1>
        <form id="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              id="username"
              name="username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <button onClick={signIn} type="submit">
            Iniciar Sesión
          </button>
        </form>

        <hr />

        <h4>
          O crea un usuario <Link to="/register">AQUI</Link>
        </h4>
      </div>
    </>
  );
}

export default Login;