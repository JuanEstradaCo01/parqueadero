import "./loadpage.css";
import { useNavigate } from "react-router-dom";

function LoadPage() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/login");
  }, 2000);

  return (
    <>
      <div class="loading-container">
        <div class="loader"></div>
        <h2>Cargando sistema...</h2>
      </div>
    </>
  );
}

export default LoadPage;
