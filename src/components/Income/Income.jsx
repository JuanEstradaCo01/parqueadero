import "./income.css";
import Navbarnav from "../Nav/Navbarnav";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { parkingContext } from "../../context/context";

function Income() {
  const [typeVehicle, setTypeVehicle] = useState("");
  const [plate, setPlate] = useState("");
  const { typeVehicles, vehicles, addVehicle } = useContext(parkingContext);

  const incomeVehicle = async (evt) => {
    evt.preventDefault();

    document.getElementById("formIncome").reset();
    setPlate("");

    if (typeVehicle === "" || plate === "") {
      alert("Completa todos los campos");
      return;
    } else {

      const type = typeVehicles.find((item) => item.name === typeVehicle);

      let data = {
        idTypeVehicle: 0,
        typeVehicle: "",
        plate: plate,
        hourlyValue: 0,
        date: new Date().toLocaleString(),
        time: new Date().getTime()
      };

      if (type) {
        if (type.name === "carro") {
          data.idTypeVehicle = type.idTypeVehicle;
          data.typeVehicle = type.name;
          data.hourlyValue = type.hourlyValue;
        } else if (type.name === "moto") {
          data.idTypeVehicle = type.idTypeVehicle;
          data.typeVehicle = type.name;
          data.hourlyValue = type.hourlyValue;
        } else if (type.name === "camioneta") {
          data.idTypeVehicle = type.idTypeVehicle;
          data.typeVehicle = type.name;
          data.hourlyValue = type.hourlyValue;
        }
      } else {
        alert("El tipo de vehiculo no existe");
      }

      addVehicle(data);
    }
  };

  return (
    <>
      <Navbarnav />
      <div className="containerIncome">
        <h1 className="tittleIncome">Ingresar</h1>

        <form id="formIncome">
          <label htmlFor="tipo">Tipo de vehículo:</label>
          <select
            id="tipo"
            required
            onChange={(e) => {
              setTypeVehicle(e.target.value);
            }}
          >
            <option value="">Seleccione una opción</option>
            <option value="carro">Carro</option>
            <option value="camioneta">Camioneta</option>
            <option value="moto">Moto</option>
          </select>

          <br />
          <br />

          <label htmlFor="placa">Placa:</label>
          <input
            type="text"
            id="placa"
            placeholder="Ingresa la placa"
            required
            value={plate}
            onChange={(e) => {
              setPlate(e.target.value.toUpperCase())
            }}
          />

          <br />
          <br />
          <Button onClick={incomeVehicle} variant="success" type="submit">
            Ingresar
          </Button>
        </form>

        <div className="table-container">
          <h2 className="table-title">Vehículos Registrados:</h2>

          {vehicles.length === 0 ? (
            <>
              <h3>¡No hay vehiculos en el parqueadero!</h3>
            </>
          ) : (
            <div>
              <table className="custom-table">
                <thead className="table-head">
                  <tr>
                    <th className="table-header">ID</th>
                    <th className="table-header">Tipo de Vehículo</th>
                    <th className="table-header">Placa</th>
                    <th className="table-header">Valor Hora</th>
                    <th className="table-header">Hora Ingreso</th>
                  </tr>
                </thead>

                <tbody className="table-body">
                  {vehicles.map((item) => (
                    <tr className="table-row" key={item.plate}>
                      <td className="table-cell">{item.idTypeVehicle}</td>
                      <td className="table-cell">{item.typeVehicle}</td>
                      <td className="table-cell">{item.plate}</td>
                      <td className="table-cell">${item.hourlyValue}</td>
                      <td className="table-cell">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Income;
