import "./dashboard.css";
import Navbarnav from "../Nav/Navbarnav";

//Componente que se muestra al iniciar sesion, es el panel principal del parqueadero
function Dashboard() {
  return (
    <>
      <Navbarnav />
      <div className="containerDashboard">
        <h1>¡Bienvenido al Dashboard!</h1>
        <p>Aquí podrás gestionar el parqueadero Santa Rosa</p>
      </div>
    </>
  );
}

export default Dashboard;
