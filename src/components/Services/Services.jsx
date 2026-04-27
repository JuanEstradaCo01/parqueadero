import "./services.css";
import Navbarnav from "../Nav/Navbarnav";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { parkingContext } from "../../context/context";

function Services() {
  const [serviceName, setServiceName] = useState("");
  const [priceService, setPriceService] = useState("");

  const { services, addService } = useContext(parkingContext);

  const serviceAdded = async (evt) => {
    evt.preventDefault();

    if (serviceName === "" || priceService === "") {
      alert("Completa todos los campos");
      return;
    }

    let data = {
      idService: services.length + 1,
      code: 500 + services.length,
      name: serviceName,
      priceService
    };

    addService(data);
    document.getElementById("formService").reset();
  };

  return (
    <>
      <Navbarnav />
      <div className="containerServices">
        <h1 className="tittleServices">Agregar servicio</h1>

        <form id="formService">
          <label htmlFor="nombre">Nombre servicio</label>
          <input
            autoFocus
            onChange={(e) => {
              setServiceName(e.target.value);
            }}
            placeholder="Nombre del servicio"
            name="nombre"
            type="text"
          />
          <label htmlFor="precio">Precio</label>
          <input
            onChange={(e) => {
              setPriceService(e.target.value);
            }}
            placeholder="Precio del servicio"
            name="precio"
            type="number"
          />
          <Button onClick={serviceAdded} variant="outline-warning">
            Agregar
          </Button>
        </form>
      </div>

      <div className="table-container">
          {services.length === 0 ? (
            <>
              <h3>¡No hay servicios registrados!</h3>
            </>
          ) : (
            <div>
              <table className="custom-table">
                <thead className="table-head">
                  <tr>
                    <th className="table-header">ID</th>
                    <th className="table-header">Código</th>
                    <th className="table-header">Nombre</th>
                    <th className="table-header">Precio</th>
                  </tr>
                </thead>

                <tbody className="table-body">
                  {services.map((item) => (
                    <tr className="table-row" key={item.name}>
                      <td className="table-cell">{item.idService}</td>
                      <td className="table-cell">{item.code}</td>
                      <td className="table-cell">{item.name}</td>
                      <td className="table-cell">${item.priceService}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
    </>
  );
}

export default Services;
