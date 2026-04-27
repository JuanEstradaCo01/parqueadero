import "./navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Navbarnav() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand id="tittleNav" as={Link} to="/dashboard">
            Santa Rosa Parking
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/ingreso">
              Ingreso
            </Nav.Link>

            <Nav.Link as={Link} to="/salida">
              Salida
            </Nav.Link>

            <Nav.Link as={Link} to="/bancos">
              Bancos
            </Nav.Link>

            <Nav.Link as={Link} to="/productos">
              Productos
            </Nav.Link>

            <Nav.Link as={Link} to="/servicios">
              Servicios
            </Nav.Link>

            <Nav.Link as={Link} to="/clientes">
              Clientes
            </Nav.Link>

            <Nav.Link as={Link} to="/login">
              <Button variant="danger">Salir</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarnav;
