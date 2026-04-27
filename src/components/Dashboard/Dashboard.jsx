import "./dashboard.css";
import Navbarnav from "../Nav/Navbarnav";

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
