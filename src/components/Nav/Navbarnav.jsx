import "./navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaUserAlt } from "react-icons/fa";
import { useContext } from "react";
import { parkingContext } from "../../context/context";

function Navbarnav() {

    const { session, logOut } = useContext(parkingContext);

    function logOutUser(){
      logOut();
    }

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

            <Nav.Link as={Link} to="/clientes">
              Clientes
            </Nav.Link>

            {session[0].username === "admin" ? <Nav.Link as={Link} to="/admin">
              <FaUserAlt />
            </Nav.Link> : null}

            <Nav.Link as={Link} to="/login">
              <Button variant="danger" onClick={logOutUser}>
                Salir
              </Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarnav;
